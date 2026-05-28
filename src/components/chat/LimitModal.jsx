import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Shared plans — kept in sync with Pricing page
export const plans = [
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited recommendations",
      "Multi-step decision flow",
      "Priority comparison insights",
      "Favourites & history",
    ],
  },
  {
    name: "Team",
    price: "$39",
    period: "/mo",
    highlight: false,
    features: [
      "Everything in Pro",
      "5 seats included",
      "API access",
      "Custom decision guides",
    ],
  },
];

export default function LimitModal({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-accent transition-colors z-10"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="px-6 pt-8 pb-6 text-center border-b border-border">
              <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-4">
                <Zap className="w-5 h-5 text-background" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Upgrade to PromptWise Pro</h2>
              <p className="text-sm text-muted-foreground mt-2">
                You've used your 3 free recommendations for today. Upgrade for unlimited access.
              </p>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl border p-4 flex flex-col ${
                    plan.highlight ? "border-foreground bg-foreground/5" : "border-border"
                  }`}
                >
                  {plan.badge && (
                    <span className="self-start text-[10px] font-semibold bg-foreground text-background px-2 py-0.5 rounded-full mb-3">
                      {plan.badge}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                  <div className="mt-1 mb-4">
                    <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 flex-1 mb-4">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-foreground shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { onClose(); navigate("/payment"); }}
                    className={`w-full text-xs font-medium rounded-lg py-2 transition-colors ${
                      plan.highlight
                        ? "bg-foreground text-background hover:bg-foreground/85"
                        : "border border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    Upgrade — {plan.price}/mo
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}