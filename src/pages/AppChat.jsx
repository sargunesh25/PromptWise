import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/chat/Sidebar";
import EmptyState from "../components/chat/EmptyState";
import InputBar from "../components/chat/InputBar";
import { AnimatePresence, motion } from "framer-motion";

export default function AppChat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const chats = [];
  const activeChatId = null;

  const handleNewChat = () => {
    setInput("");
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
          <EmptyState />
          <InputBar
            value={input}
            onChange={setInput}
            onSubmit={() => {}}
            loading={false}
            disabled
            limitExceeded={false}
            onShowLimit={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
