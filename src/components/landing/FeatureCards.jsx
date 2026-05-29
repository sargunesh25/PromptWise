import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Braces, Network, Quote, Rows3, Workflow } from "lucide-react";

const features = [
  { icon: Rows3, title: "Multi-source aggregation", desc: "Pull academic papers, patents, trial records, filings, news, and regulatory data into one evidence set." },
  { icon: Network, title: "Deduplication & linking", desc: "Collapse repeated findings and show which sources corroborate or depend on the same claims." },
  { icon: AlertTriangle, title: "Contradiction detection", desc: "Highlight where studies, filings, or market signals disagree so teams see uncertainty early." },
  { icon: Quote, title: "Claim-level citations", desc: "Keep provenance attached to the answer with source titles, IDs, dates, and direct links." },
  { icon: Workflow, title: "Domain workflows", desc: "Package synthesis into pharma, legal, academic, market, and regulatory research formats." },
  { icon: Braces, title: "Structured outputs", desc: "Export briefs, evidence tables, citation maps, and JSON-ready reports for downstream tools." },
];

export default function FeatureCards() {
  return (
    <section className="py-24 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm text-muted-foreground mb-3 font-medium uppercase tracking-widest">
            Why PromptWise
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            More than search. More than summarization.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-border bg-card p-6 hover:border-muted-foreground/30 transition-colors"
              >
                <Icon className="w-5 h-5 text-primary mb-4" />
                <h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
