import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/api/supabaseClient";
import { invokePromptPilot } from "@/api/llmClient";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/chat/Sidebar";
import EmptyState from "../components/chat/EmptyState";
import MessageList from "../components/chat/MessageList";
import InputBar from "../components/chat/InputBar";
import LimitModal from "../components/chat/LimitModal";
import { SYSTEM_PROMPT } from "../lib/promptPilotSystem";
import { AnimatePresence, motion } from "framer-motion";

const DAILY_LIMIT = 3;
const LIMIT_KEY = "promptwise_daily_prompts";

function getDailyUsage() {
  if (typeof window === "undefined") return 0;
  const today = new Date().toDateString();
  try {
    const stored = JSON.parse(localStorage.getItem(LIMIT_KEY) || "{}");
    if (stored.date !== today) return 0;
    return stored.count || 0;
  } catch {
    return 0;
  }
}

function incrementDailyUsage() {
  if (typeof window === "undefined") return 0;
  const today = new Date().toDateString();
  const count = getDailyUsage() + 1;
  try {
    localStorage.setItem(LIMIT_KEY, JSON.stringify({ date: today, count }));
  } catch {
    return count;
  }
  return count;
}

// Parse all QUESTION_BLOCK entries from AI text
function parseAllQuestions(text) {
  const regex = /QUESTION_BLOCK:(\{[\s\S]*?\})/g;
  const results = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    try {
      results.push(JSON.parse(match[1]));
    } catch {
      // skip malformed
    }
  }
  return results;
}

export default function AppChat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [dailyCount, setDailyCount] = useState(getDailyUsage());
  const { user } = useAuth();

  const limitExceeded = dailyCount >= DAILY_LIMIT;

  const { data: chats = [], refetch: refetchChats } = useQuery({
    queryKey: ["chats", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      if (!supabase || !user?.id) return [];
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data || [];
    },
  });

  const loadMessages = useCallback(async (chatId) => {
    if (!chatId || !user?.id || !supabase) {
      setMessages([]);
      return;
    }

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .limit(200);

    if (error) {
      setMessages([]);
      return;
    }

    setMessages(
      (data || []).map((m) => ({
        role: m.role,
        content: m.content,
        type: m.type || "text",
        questions: m.questions || undefined,
        summary: m.summary || undefined,
      }))
    );
  }, [user?.id]);

  useEffect(() => {
    loadMessages(activeChatId);
  }, [activeChatId, loadMessages]);

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setInput("");
  };

  // Create/ensure a chat exists
  const ensureChatId = useCallback(async (userMessage, currentChatId) => {
    if (currentChatId) return currentChatId;
    if (!user?.id) return null;
    const title = userMessage.substring(0, 60);
    const { data, error } = await supabase
      .from("chats")
      .insert({ title, is_favourite: false, user_id: user.id })
      .select("id")
      .single();

    if (error) throw error;
    setActiveChatId(data.id);
    refetchChats();
    return data.id;
  }, [refetchChats, user?.id]);

  // Step 1: User sends initial message → fetch all questions at once (no limit counted)
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    if (!supabase) return;
    if (limitExceeded) { setShowLimitModal(true); return; }

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    const userMsg = { role: "user", content: userMessage, type: "text" };
    setMessages((prev) => [...prev, userMsg]);

    const chatId = await ensureChatId(userMessage, activeChatId);
    if (!chatId || !user?.id) {
      setLoading(false);
      return;
    }
    await supabase.from("messages").insert({
      chat_id: chatId,
      user_id: user.id,
      role: "user",
      content: userMessage,
      type: "text",
    });

    // Ask AI for ALL clarifying questions upfront
    const questionPrompt = `${SYSTEM_PROMPT}

---
The user says: "${userMessage}"

Your task: Generate ALL the clarifying questions you need (up to 4) to craft the perfect prompt.
Output ONLY QUESTION_BLOCK lines, one per question, in order. No other text.
Each question must have 4 distinct, concise choices.
Format strictly:
QUESTION_BLOCK:{"question":"...","choices":["...","...","...","..."]}
QUESTION_BLOCK:{"question":"...","choices":["...","...","...","..."]}
...`;

    let response;
    try {
      response = await invokePromptPilot({
        prompt: questionPrompt,
        model: "gemini-3.1-flash-lite",
      });
    } catch (error) {
      const errorMsg = "Failed to generate questions. Try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg, type: "text" }]);
      setLoading(false);
      return;
    }

    const rawText = typeof response === "string" ? response : String(response);
    const questions = parseAllQuestions(rawText);

    if (questions.length === 0) {
      // AI didn't need questions — generate prompt directly (counts as 1 usage)
      const newCount = incrementDailyUsage();
      setDailyCount(newCount);
      await generateFinalPrompt(userMessage, [], {}, chatId, [userMsg]);
    } else {
      // Show quiz block
      const quizMsg = {
        role: "assistant",
        content: rawText,
        type: "quiz",
        questions,
      };
      setMessages((prev) => [...prev, quizMsg]);
      await supabase.from("messages").insert({
        chat_id: chatId,
        user_id: user.id,
        role: "assistant",
        content: rawText,
        type: "quiz",
        questions,
      });
    }

    setLoading(false);
  };

  // Step 2: User completes quiz → generate final prompt (THIS counts as 1 usage)
  const handleQuizComplete = useCallback(async (questions, answers) => {
    if (loading) return;
    if (limitExceeded) { setShowLimitModal(true); return; }
    if (!supabase) return;

    setLoading(true);

    // Build summary
    const summary = questions.map((q, i) => ({ q: q.question, a: answers[i] || "" }));

    // Replace quiz message with quiz_done summary
    setMessages((prev) => {
      const updated = [...prev];
      const lastIdx = updated.length - 1;
      if (updated[lastIdx]?.type === "quiz") {
        updated[lastIdx] = { ...updated[lastIdx], type: "quiz_done", summary };
      }
      return updated;
    });

    // Count the usage (this is the real prompt generation)
    const newCount = incrementDailyUsage();
    setDailyCount(newCount);

    // Build the prompt for final generation
    const qaText = summary.map((s, i) => `Q${i + 1}: ${s.q}\nA: ${s.a}`).join("\n\n");

    // Find user's original message
    const userOriginal = messages.find((m) => m.role === "user")?.content || "";

    await generateFinalPrompt(userOriginal, questions, answers, activeChatId, messages, summary);

    setLoading(false);
  }, [loading, limitExceeded, activeChatId, messages, user?.id]);

  const generateFinalPrompt = async (originalRequest, questions, answers, chatId, currentMessages, summary = []) => {
    const qaText = summary.map((s, i) => `Q${i + 1}: ${s.q}\nA: ${s.a}`).join("\n\n");

    const finalPrompt = `${SYSTEM_PROMPT}

---
User's original request: "${originalRequest}"

${summary.length > 0 ? `User's clarifications:
${qaText}` : ""}

---
Now generate the final optimized prompt following your exact response format.`;

    let response;
    try {
      response = await invokePromptPilot({
        prompt: finalPrompt,
        model: "gemini-3.1-flash-lite",
      });
    } catch (error) {
      const errorMsg = "Failed to generate a prompt. Try again.";
      const finalMsg = { role: "assistant", content: errorMsg, type: "text" };
      setMessages((prev) => [...prev, finalMsg]);
      return;
    }

    const aiContent = typeof response === "string" ? response : String(response);
    const finalMsg = { role: "assistant", content: aiContent, type: "text" };
    setMessages((prev) => [...prev, finalMsg]);

    if (chatId && user?.id) {
      await supabase.from("messages").insert({
        chat_id: chatId,
        user_id: user.id,
        role: "assistant",
        content: aiContent,
        type: "text",
        summary: summary.length ? summary : null,
      });
    }
  };

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        showSidebar={sidebarOpen}
      />

      <LimitModal open={showLimitModal} onClose={() => setShowLimitModal(false)} />

      <div className="flex flex-1 pt-14 overflow-hidden">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isMobile ? "100%" : 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`overflow-hidden shrink-0 ${isMobile ? "absolute inset-0 top-14 z-40" : ""}`}
            >
              <Sidebar
                chats={chats}
                activeChat={activeChatId}
                onSelectChat={(id) => {
                  setActiveChatId(id);
                  if (isMobile) setSidebarOpen(false);
                }}
                onNewChat={handleNewChat}
                onRefresh={refetchChats}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          {messages.length === 0 && !loading ? (
            <>
              <EmptyState />
              <InputBar
                value={input}
                onChange={setInput}
                onSubmit={handleSend}
                loading={loading}
                limitExceeded={limitExceeded}
                onShowLimit={() => setShowLimitModal(true)}
              />
            </>
          ) : (
            <>
              <MessageList
                messages={messages}
                loading={loading}
                onQuizComplete={handleQuizComplete}
              />
              <InputBar
                value={input}
                onChange={setInput}
                onSubmit={handleSend}
                loading={loading}
                limitExceeded={limitExceeded}
                onShowLimit={() => setShowLimitModal(true)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
