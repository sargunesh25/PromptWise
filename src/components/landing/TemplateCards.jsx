import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Pen, Code2, Briefcase, Image, Search, Megaphone } from "lucide-react";

const templates = [
  { category: "Content Writing", icon: Pen, preview: "Generate blog posts, ad copy, social media captions that convert..." },
  { category: "Code Review", icon: Code2, preview: "Get detailed code reviews, refactoring suggestions, and best practices..." },
  { category: "Business Strategy", icon: Briefcase, preview: "Create business plans, market analysis, competitive strategies..." },
  { category: "Image Generation", icon: Image, preview: "Craft detailed prompts for Midjourney, DALL·E, Stable Diffusion..." },
  { category: "Research", icon: Search, preview: "Deep-dive research prompts for academic papers, market reports..." },
  { category: "Marketing", icon: Megaphone, preview: "Email campaigns, funnel copy, brand positioning, growth tactics..." },
];

export default function TemplateCards() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-foreground text-center mb-16"
        >
          Popular prompt templates
        </motion.h2>

        <div className="relative flex flex-wrap justify-center gap-4">
          {templates.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] rounded-xl border border-border bg-card p-5 cursor-pointer group hover:border-muted-foreground/30 transition-all"
                style={{ zIndex: templates.length - i }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-medium text-muted-foreground bg-accent px-2.5 py-1 rounded-full">
                    {t.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {t.preview}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}