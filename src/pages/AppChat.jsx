import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/chat/Sidebar";
import EmptyState from "../components/chat/EmptyState";
import MessageList from "../components/chat/MessageList";
import InputBar from "../components/chat/InputBar";
import { AnimatePresence, motion } from "framer-motion";

export default function AppChat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chats = [];
  const activeChatId = null;

  const handleNewChat = () => {
    setInput("");
    setMessages([]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");

    const userMsg = { role: "user", content: userMessage, type: "text" };
    const assistantMsg = {
      role: "assistant",
      content:
        "Research synthesis is not connected yet. Soon this workspace will search papers, patents, trials, filings, news, and regulatory sources, then return a cited brief with contradictions and confidence signals.",
      type: "text",
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
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
                onSelectChat={() => {}}
                onNewChat={handleNewChat}
                onRefresh={() => {}}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          {messages.length === 0 ? (
            <>
              <EmptyState />
              <InputBar
                value={input}
                onChange={setInput}
                onSubmit={handleSend}
                loading={false}
                limitExceeded={false}
                onShowLimit={() => {}}
              />
            </>
          ) : (
            <>
              <MessageList
                messages={messages}
                loading={false}
                onQuizComplete={null}
              />
              <InputBar
                value={input}
                onChange={setInput}
                onSubmit={handleSend}
                loading={false}
                limitExceeded={false}
                onShowLimit={() => {}}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
