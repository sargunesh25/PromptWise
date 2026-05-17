import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RotateCcw } from "lucide-react";

const LABELS = ["A", "B", "C", "D", "E"];

export default function QuizFlow({ questions, onComplete }) {
  // questions: [{question, choices}]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionIndex: answer }
  const [customInput, setCustomInput] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const current = questions[currentIndex];
  const selected = answers[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (choice) => {
    if (selected) return;
    if (choice === "__other__") {
      setShowCustom(true);
      return;
    }
    const newAnswers = { ...answers, [currentIndex]: choice };
    setAnswers(newAnswers);
    setShowCustom(false);

    if (isLast) {
      onComplete(questions, newAnswers);
    } else {
      // Auto-advance after short delay
      setTimeout(() => setCurrentIndex((i) => i + 1), 350);
    }
  };

  const handleCustomSubmit = () => {
    if (!customInput.trim()) return;
    const newAnswers = { ...answers, [currentIndex]: customInput.trim() };
    setAnswers(newAnswers);
    setShowCustom(false);
    setCustomInput("");

    if (isLast) {
      onComplete(questions, newAnswers);
    } else {
      setTimeout(() => setCurrentIndex((i) => i + 1), 350);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[85%]"
    >
      {/* Progress dots */}
      <div className="flex items-center gap-1.5 mb-4">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i < currentIndex
                ? "w-4 bg-foreground"
                : i === currentIndex
                ? "w-6 bg-foreground"
                : "w-4 bg-muted"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-sm text-foreground leading-relaxed mb-3 sm:mb-4 font-medium">
            {current.question}
          </p>

          <div className="space-y-2">
            {current.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleSelect(choice)}
                disabled={!!selected}
                className={`w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border text-sm text-left transition-all
                  ${selected === choice
                    ? "border-foreground bg-foreground/8 font-medium text-foreground"
                    : selected
                      ? "border-border bg-card text-muted-foreground opacity-50 cursor-not-allowed"
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

            {/* "Other" option */}
            {!selected && (
              <button
                onClick={() => handleSelect("__other__")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-dashed border-border bg-transparent text-sm text-muted-foreground text-left hover:border-foreground/30 hover:text-foreground transition-all cursor-pointer"
              >
                <span className="w-7 h-7 rounded-full border border-dashed border-border flex items-center justify-center text-xs font-semibold shrink-0">
                  {LABELS[current.choices.length]}
                </span>
                <span>Other — type my own</span>
              </button>
            )}
          </div>

          {/* Custom input */}
          <AnimatePresence>
            {showCustom && !selected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="flex gap-2">
                  <input
                    autoFocus
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
                    placeholder="Type your answer..."
                    className="flex-1 text-sm border border-border rounded-xl px-4 py-2.5 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30"
                  />
                  <button
                    onClick={handleCustomSubmit}
                    disabled={!customInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium disabled:opacity-40 hover:bg-foreground/85 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Answered state — show what was selected + next hint */}
          {selected && !isLast && (
            <p className="text-xs text-muted-foreground mt-3">
              ✓ Moving to next question...
            </p>
          )}
          {selected && isLast && (
            <p className="text-xs text-muted-foreground mt-3">
              ✓ All done! Generating your optimized prompt...
            </p>
          )}

          {!selected && !showCustom && (
            <p className="text-xs text-muted-foreground mt-3">
              Question {currentIndex + 1} of {questions.length} — tap your answer
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}