import React from "react";
import { motion } from "framer-motion";
import { Wand2, Target, BarChart3 } from "lucide-react";

const features = [
  { icon: Wand2, title: "Need-First Recommendations", desc: "We capture your use case, budget, and preferences before comparing products." },
  { icon: Target, title: "Smarter Comparisons", desc: "Specs, reviews, and value are weighed to rank the best fit, not just the popular ones." },
  { icon: BarChart3, title: "Clear Trade-Offs", desc: "Every pick comes with simple reasons, alternatives, and what you gain or give up." },
];

export default function FeatureCards() {
  return (
    <section className="py-24 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-foreground text-center mb-16"
        >
          Why PromptWise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 hover:border-muted-foreground/30 transition-colors"
              >
                <Icon className="w-5 h-5 text-foreground mb-4" />
                <h3 className="text-sm font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}