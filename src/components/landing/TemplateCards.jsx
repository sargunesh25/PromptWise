import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  FileText,
  FlaskConical,
  GraduationCap,
} from "lucide-react";

const workflows = [
  { category: "Pharma R&D", icon: FlaskConical, preview: "Literature, trial, patent, FDA, and news synthesis for drug programs." },
  { category: "Patent & Legal", icon: BadgeCheck, preview: "Prior art, patent families, filings, and market activity in one brief." },
  { category: "Academic Teams", icon: GraduationCap, preview: "Evidence tables, field mapping, citation trails, and research gaps." },
  { category: "Market Research", icon: Building2, preview: "SEC filings, news, competitor moves, and analyst-ready summaries." },
  { category: "Regulatory", icon: FileText, preview: "Clinical, government, safety, and compliance signals with provenance." },
  { category: "Strategy Teams", icon: BriefcaseBusiness, preview: "Cross-source briefs for decisions that need more than web search." },
];

export default function TemplateCards() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm text-muted-foreground mb-3 font-medium uppercase tracking-widest">
            Vertical workflows
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Built for research teams with real source complexity
          </h2>
        </motion.div>

        <div className="relative flex flex-wrap justify-center gap-4">
          {workflows.map((workflow, i) => {
            const Icon = workflow.icon;
            return (
              <motion.div
                key={workflow.category}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] rounded-xl border border-border bg-card p-5 cursor-default group hover:border-muted-foreground/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-medium text-muted-foreground bg-accent px-2.5 py-1 rounded-full">
                    {workflow.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{workflow.preview}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
