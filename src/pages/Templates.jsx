import React from "react";
import Navbar from "../components/layout/Navbar";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Templates() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-14 flex flex-col items-center justify-center min-h-[80vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-6">
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Templates</h1>
          <p className="text-muted-foreground text-sm max-w-md">
            Templates are coming soon. Stay tuned for curated prompt packs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}