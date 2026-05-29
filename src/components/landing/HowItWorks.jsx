import React from "react";
import { motion } from "framer-motion";
import { GitMerge, MessageSquare, Search, ShieldCheck } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Ask once", desc: "Start with a complex research question, not a pile of tabs." },
  { icon: Search, title: "Search broadly", desc: "Query papers, patents, trials, filings, news, and regulatory sources in parallel." },
  { icon: GitMerge, title: "Synthesize evidence", desc: "Deduplicate repeated findings, connect related sources, and surface contradictions." },
  { icon: ShieldCheck, title: "Act with citations", desc: "Get a structured brief where every important claim links back to source material." },
];

export default function HowItWorks() {
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
            Research pipeline
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            From fragmented search to a defensible answer
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
