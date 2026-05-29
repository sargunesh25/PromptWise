import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  FileSearch,
  FlaskConical,
  Newspaper,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const sources = [
  { label: "Papers", icon: BookOpen, count: "142" },
  { label: "Patents", icon: FileSearch, count: "38" },
  { label: "Trials", icon: FlaskConical, count: "19" },
  { label: "News", icon: Newspaper, count: "27" },
];

export default function HeroSection() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <section className="min-h-[88vh] flex items-center px-4 pt-28 md:pt-32 pb-12">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Multi-source research synthesis
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
            One cited answer from every research source that matters.
          </h1>
          <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            PromptWise searches papers, patents, clinical trials, filings, news, and regulatory data, then turns scattered evidence into a single synthesis your team can act on.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl mx-auto lg:mx-0">
            <label htmlFor="research-question" className="sr-only">
              Research question
            </label>
            <div className="relative rounded-xl border border-border bg-card shadow-sm overflow-hidden group focus-within:border-foreground/30 transition-colors">
              <textarea
                id="research-question"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a drug, patent landscape, market signal, or literature gap..."
                rows={3}
                className="w-full bg-transparent px-4 pt-4 pb-14 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4" />
                  Sources stay attached to every claim
                </div>
                <button
                  type="submit"
                  aria-label="Start research"
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/85 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ArrowRight className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
          aria-label="Research synthesis preview"
        >
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Synthesis run</p>
              <p className="text-[11px] text-muted-foreground">mRNA vaccines in pregnancy</p>
            </div>
            <span className="text-[11px] text-muted-foreground border border-border rounded-full px-2.5 py-1">
              2 min
            </span>
          </div>

          <div className="p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sources.map((source) => {
                const Icon = source.icon;
                return (
                  <div key={source.label} className="rounded-lg border border-border bg-background p-3">
                    <Icon className="w-4 h-4 text-primary mb-2" />
                    <p className="text-lg font-bold text-foreground">{source.count}</p>
                    <p className="text-[11px] text-muted-foreground">{source.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-sm font-semibold text-foreground">Evidence synthesis</p>
                <span className="text-[11px] text-muted-foreground">High confidence</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Across clinical trials and cohort studies, current evidence supports no elevated severe adverse-event signal, while reporting gaps remain for trimester-specific outcomes.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["PubMed: 18", "ClinicalTrials.gov: 4", "FDA: 3", "News: 7"].map((item) => (
                  <span key={item} className="text-[11px] text-muted-foreground bg-accent rounded-full px-2.5 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold text-foreground mb-2">Contradiction flagged</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  One preprint reports a weak signal not reproduced in two larger peer-reviewed cohorts.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold text-foreground mb-2">Next workflow</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Export literature table, trial tracker, and source-linked briefing.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
