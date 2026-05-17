import React from "react";
import Navbar from "../components/layout/Navbar";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    cta: "Get Started Free",
    highlight: false,
    features: [
      "3 prompts per day",
      "Basic AI guidance",
      "Community templates",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    cta: "Upgrade to Pro",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited prompts",
      "Multi-step workflow builder",
      "Priority model recommendations",
      "Favourites & history",
    ],
  },
  {
    name: "Team",
    price: "$39",
    period: "/mo",
    cta: "Contact Us",
    highlight: false,
    features: [
      "Everything in Pro",
      "5 seats included",
      "API access",
      "Custom templates",
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-14 px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pricing</h1>
          <p className="text-muted-foreground text-sm">Simple pricing for every stage.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border p-6 flex flex-col ${
                tier.highlight
                  ? "border-foreground bg-card shadow-md"
                  : "border-border bg-card"
              }`}
            >
              {tier.badge && (
                <span className="self-start text-[10px] font-medium bg-foreground text-background px-2.5 py-1 rounded-full mb-4">
                  {tier.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-lg text-sm h-10 ${
                  tier.highlight
                    ? "bg-foreground text-background hover:bg-foreground/85"
                    : "bg-accent text-foreground hover:bg-accent/80 border border-border"
                }`}
                onClick={() => navigate(tier.name === "Free" ? "/app" : "/payment")}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}