import React from "react";
import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";
import Navbar from "../components/layout/Navbar";

export default function Payment() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-6">
            <Clock className="w-6 h-6 text-background" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Payments coming soon</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We're setting up secure payments. Check back soon — Pro and Team plans will be available shortly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}