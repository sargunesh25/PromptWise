import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { motion } from "framer-motion";

export default function MessageList({ messages, loading, onQuizComplete }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-4 pt-6 sm:pt-8 pb-4 sm:pb-6 min-h-0">
      <div className="max-w-[720px] mx-auto space-y-4 sm:space-y-6">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg}
            onQuizComplete={
              msg.type === "quiz" && i === messages.length - 1
                ? onQuizComplete
                : null
            }
          />
        ))}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 py-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.4s" }} />
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}