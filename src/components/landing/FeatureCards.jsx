import React from "react";
import { motion } from "framer-motion";
import { Wand2, Target, BarChart3 } from "lucide-react";

const features = [
  { icon: Wand2, title: "AI-Powered Engineering", desc: "Our system understands prompt architecture deeply and crafts prompts that get the best results from any AI model." },
  { icon: Target, title: "Platform-Specific Optimization", desc: "Prompts are tailored to each AI's strengths — ChatGPT, Claude, Midjourney, and more. One goal, optimized delivery." },
  { icon: BarChart3, title: "Model Recommendations", desc: "Get ranked suggestions for which AI model will perform best for your specific task, with clear reasoning." },
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
          Why Proack
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