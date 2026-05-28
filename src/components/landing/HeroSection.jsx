import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 pt-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground border border-border rounded-full px-4 py-1.5 mb-8">
          AI Shopping Decision Engine
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
          Find the right product for you, fast.
        </h1>
        <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          Tell us your need, budget, and preferences. We compare options and explain the best pick in plain language.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="mt-12 w-full max-w-2xl"
      >
        <div className="relative rounded-xl border border-border bg-card shadow-sm overflow-hidden group focus-within:border-foreground/20 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to buy and why..."
            rows={3}
            className="w-full bg-transparent px-4 pt-4 pb-12 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button type="button" className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                <Plus className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/85 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-background" />
            </button>
          </div>
        </div>
      </motion.form>
    </section>
  );
}