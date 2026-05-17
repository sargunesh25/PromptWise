import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import QuizFlow from "./QuizFlow";

export default function MessageBubble({ message, onQuizComplete }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] sm:max-w-[80%] rounded-2xl bg-foreground px-4 py-3">
          <p className="text-sm text-background whitespace-pre-wrap">{message.content}</p>
        </div>
      </motion.div>
    );
  }

  // Quiz block — questions array pre-fetched
  if (message.type === "quiz" && message.questions) {
    return (
      <QuizFlow
        questions={message.questions}
        onComplete={onQuizComplete}
      />
    );
  }

  // Completed quiz summary (locked)
  if (message.type === "quiz_done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[85%] space-y-2"
      >
        {message.summary?.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-foreground font-medium shrink-0">{i + 1}.</span>
            <span><span className="text-foreground/70">{item.q}</span> → <span className="text-foreground font-medium">{item.a}</span></span>
          </div>
        ))}
      </motion.div>
    );
  }

  // Regular assistant message
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative max-w-[85%] break-words min-w-0"
    >
      <div className="text-sm text-foreground/90 leading-relaxed">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-3 last:mb-0 break-words whitespace-normal">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
            h1: ({ children }) => <h1 className="text-lg font-bold text-foreground mt-4 mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base font-bold text-foreground mt-4 mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm font-bold text-foreground mt-3 mb-1">{children}</h3>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="text-foreground/90">{children}</li>,
            hr: () => <hr className="border-border my-4" />,
            code: ({ inline, children }) => {
              if (inline) {
                return <code className="bg-accent px-1.5 py-0.5 rounded text-xs font-mono text-foreground">{children}</code>;
              }
              return (
                <pre className="bg-foreground/5 border border-border rounded-lg p-4 my-3 whitespace-pre-wrap break-words overflow-hidden">
                  <code className="text-xs font-mono text-foreground/80 whitespace-pre-wrap break-words">{children}</code>
                </pre>
              );
            },
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-muted-foreground/30 pl-4 my-3 text-muted-foreground italic">
                {children}
              </blockquote>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-0 right-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-accent transition-all"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>
    </motion.div>
  );
}