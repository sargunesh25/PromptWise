import React from "react";
import { motion } from "framer-motion";

const platforms = [
  { name: "Apple", bg: "#111111", textColor: "white" },
  { name: "Samsung", bg: "#1428A0", textColor: "white" },
  { name: "HP", bg: "#0096D6", textColor: "white" },
  { name: "Dell", bg: "#007DB8", textColor: "white" },
  { name: "Sony", bg: "#000000", textColor: "white" },
  { name: "Bose", bg: "#D52B1E", textColor: "white" },
  { name: "Nike", bg: "#111111", textColor: "white" },
  { name: "Adidas", bg: "#000000", textColor: "white" },
  { name: "Amazon", bg: "#FF9900", textColor: "#1a1a1a" },
  { name: "Flipkart", bg: "#2874F0", textColor: "white" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const PlatformIcon = ({ name }) => {
  const style = { width: 22, height: 22 };

  if (name === "Apple") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M15.2 2.2c.3 1.4-.4 2.8-1.3 3.7-.9.9-2.2 1.6-3.5 1.5-.2-1.3.5-2.7 1.4-3.6.9-.9 2.2-1.6 3.4-1.6z" fill="white"/>
        <path d="M20.1 18.1c-.8 1.8-2.6 3.9-4.6 3.9-1.2 0-1.9-.4-3.1-.4-1.2 0-2 .4-3.1.4-2 0-3.6-2-4.4-3.8-1.2-2.6-1.3-5.7.5-7.6.9-1 2.4-1.7 3.7-1.7 1.2 0 2.2.5 3.2.5 1 0 2.2-.6 3.7-.5 1.1 0 2.6.5 3.6 1.7-2.8 1.7-2.4 5.7.5 7.5z" fill="white"/>
      </svg>
    );
  }

  if (name === "Samsung") {
    return (
      <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 18 }}>
        <rect x="1" y="2" width="46" height="20" rx="10" fill="white" opacity="0.15"/>
        <text x="10" y="16" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">SAMSUNG</text>
      </svg>
    );
  }

  if (name === "HP") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
        <path d="M8.8 7.8h1.6l-1.4 8.4H7.4l1.4-8.4zm4.8 0h1.6l-1.4 8.4h-1.6l.5-3H9.9l.3-1.8h2.7l.4-2.6z" fill="white"/>
      </svg>
    );
  }

  if (name === "Dell") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
        <text x="6" y="15" fill="white" fontSize="7" fontWeight="700" fontFamily="Arial, sans-serif">DELL</text>
      </svg>
    );
  }

  if (name === "Sony") {
    return (
      <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 18 }}>
        <text x="2" y="16" fill="white" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">SONY</text>
      </svg>
    );
  }

  if (name === "Bose") {
    return (
      <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 34, height: 18 }}>
        <text x="2" y="16" fill="white" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">BOSE</text>
      </svg>
    );
  }

  if (name === "Nike") {
    return (
      <svg viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 26, height: 16 }}>
        <path d="M2 12c4.4-2.7 9.2-4.3 15.8-6.6 3-1.1 5.2-1.8 8.2-2.6-2.1 2.8-4.6 5.1-8 7.5-3.7 2.7-7.6 4.6-12.5 5.8-2.4.6-3.6.3-3.5-1.1z" fill="white"/>
      </svg>
    );
  }

  if (name === "Adidas") {
    return (
      <svg viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 24, height: 18 }}>
        <path d="M3 18l4-2.2 2.2 3.7-4 2.2L3 18zm7.2-4.1l4-2.2 2.2 3.7-4 2.2-2.2-3.7zm7.2-4.1l4-2.2 2.2 3.7-4 2.2-2.2-3.7z" fill="white"/>
      </svg>
    );
  }

  if (name === "Amazon") {
    return (
      <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 18 }}>
        <text x="1" y="15" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">amazon</text>
        <path d="M6 18c6 3 16 3 26-.2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }

  if (name === "Flipkart") {
    return (
      <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 18 }}>
        <rect x="2" y="5" width="12" height="14" rx="3" fill="white"/>
        <text x="7" y="16" fill="#2874F0" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">f</text>
        <text x="18" y="16" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">Flipkart</text>
      </svg>
    );
  }

  return (
    <span style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>
      {name.charAt(0)}
    </span>
  );
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
          Works across brands and marketplaces
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-foreground mb-12"
        >
          One decision engine for every category
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              variants={itemVariants}
              transition={{ duration: 0.45, delay: i * 0.02 }}
              whileHover={{ y: -4, scale: 1.04 }}
              className="flex items-center gap-2.5 bg-card border border-border rounded-xl px-4 py-2.5 cursor-default shadow-sm hover:shadow-md transition-all"
            >
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: p.bg }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.4, delay: i * 0.08 }}
              >
                <PlatformIcon name={p.name} />
              </motion.div>
              <span className="text-sm font-medium text-foreground">{p.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}