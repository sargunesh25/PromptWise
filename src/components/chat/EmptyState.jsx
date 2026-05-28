import React from "react";
import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-6 pb-4"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight text-center">
        What are you shopping for today?
      </h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-sm text-center leading-relaxed">
        The decision engine is being rebuilt. UI only for now.
      </p>
    </motion.div>
  );
}