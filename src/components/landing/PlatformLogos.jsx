import React from "react";
import { motion } from "framer-motion";

const sources = [
  "PubMed",
  "Semantic Scholar",
  "ClinicalTrials.gov",
  "PatentsView",
  "SEC EDGAR",
  "openFDA",
  "arXiv",
  "Crossref",
  "OpenAlex",
  "News APIs",
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function PlatformLogos() {
  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground mb-3 font-medium uppercase tracking-widest"
        >
          Source coverage
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-foreground mb-4"
        >
          Connect the evidence scattered across specialist databases
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Designed for public and licensed research sources, with citations preserved from ingestion through synthesis.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {sources.map((source) => (
            <motion.div
              key={source}
              variants={itemVariants}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2.5 bg-card border border-border rounded-xl px-4 py-2.5 cursor-default shadow-sm hover:shadow-md transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">{source}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
