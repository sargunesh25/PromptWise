import React from "react";
import { motion } from "framer-motion";

const LABELS = ["A", "B", "C", "D", "E"];

export default function QuestionBlock({ question, choices, onSelect, selected }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[85%]"
    >
      <p className="text-sm text-foreground leading-relaxed mb-4 font-medium">{question}</p>
      <div className="space-y-2.5">
        {choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => !selected && onSelect(choice)}
            disabled={!!selected}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm text-left transition-all
              ${selected === choice
                ? "border-foreground bg-foreground/8 font-medium text-foreground"
                : selected
                  ? "border-border bg-card text-muted-foreground opacity-60 cursor-not-allowed"
                  : "border-border bg-card text-foreground hover:border-foreground/30 hover:bg-accent cursor-pointer"
              }`}
          >
            <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0
              ${selected === choice ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground"}`}>
              {LABELS[i]}
            </span>
            <span>{choice}</span>
          </button>
        ))}
      </div>
      {!selected && (
        <p className="text-xs text-muted-foreground mt-3">Tap your answer!</p>
      )}
    </motion.div>
  );
}