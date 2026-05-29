import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileSearch, FlaskConical, Newspaper } from "lucide-react";

const sources = [
  { label: "Papers", icon: BookOpen },
  { label: "Patents", icon: FileSearch },
  { label: "Trials", icon: FlaskConical },
  { label: "News", icon: Newspaper },
];

const examples = [
  "Compare GLP-1 patent activity with recent clinical trial outcomes",
  "Find contradictions in the literature on mRNA vaccine safety in pregnancy",
  "Summarize competitive filings and news around a biotech acquisition",
];

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-6 pb-4"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight text-center">
        What are you researching today?
      </h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-xl text-center leading-relaxed">
        Ask one question and prepare a synthesis across papers, patents, clinical trials, filings, news, and regulatory sources.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {sources.map((source) => {
          const Icon = source.icon;
          return (
            <div
              key={source.label}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
            >
              <Icon className="w-3.5 h-3.5 text-primary" />
              {source.label}
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid w-full max-w-2xl gap-2">
        {examples.map((example) => (
          <div
            key={example}
            className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground shadow-sm"
          >
            {example}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
