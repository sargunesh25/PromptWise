import React from "react";
import { motion } from "framer-motion";

const platforms = [
  {
    name: "ChatGPT",
    bg: "#10A37F",
    textColor: "white",
  },
  {
    name: "Claude",
    bg: "#D97757",
    textColor: "white",
  },
  {
    name: "Gemini",
    bg: "#fff",
    border: true,
    textColor: "#1a1a1a",
  },
  {
    name: "Midjourney",
    bg: "#1a1a1a",
    textColor: "white",
  },
  {
    name: "Perplexity",
    bg: "#20808D",
    textColor: "white",
  },
  {
    name: "DALL·E",
    bg: "#10A37F",
    textColor: "white",
  },
  {
    name: "Grok",
    bg: "#1d1d1d",
    textColor: "white",
  },
  {
    name: "Cursor",
    bg: "#1c1c1c",
    textColor: "white",
  },
  {
    name: "Stable Diffusion",
    bg: "#6C5CE7",
    textColor: "white",
  },
  {
    name: "v0",
    bg: "#0a0a0a",
    textColor: "white",
  },
];

// SVG logo icons for each platform using their real colors/shapes
const PlatformIcon = ({ name, bg }) => {
  const style = { width: 20, height: 20 };

  if (name === "ChatGPT") {
    return (
      <svg viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path fill="white" d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.235-2.818 10.078 10.078 0 0 0-9.46 6.975 9.967 9.967 0 0 0-6.695 4.81 10.079 10.079 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.234 2.818 10.078 10.078 0 0 0 9.46-6.975 9.967 9.967 0 0 0 6.696-4.81 10.079 10.079 0 0 0-1.24-11.818zm-14.6 20.233a7.474 7.474 0 0 1-4.8-1.735l.237-.134 7.964-4.6a1.333 1.333 0 0 0 .666-1.148v-11.23l3.368 1.944a.123.123 0 0 1 .066.092v9.3a7.512 7.512 0 0 1-7.501 7.511zm-16.136-6.893a7.473 7.473 0 0 1-.895-5.03l.238.143 7.963 4.6a1.333 1.333 0 0 0 1.334 0l9.72-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.511 7.511 0 0 1-10.26-2.74zm-2.094-17.44a7.47 7.47 0 0 1 3.904-3.285l-.001.27v9.199a1.334 1.334 0 0 0 .666 1.148l9.72 5.614-3.368 1.944a.12.12 0 0 1-.114.012L8.054 23.19a7.512 7.512 0 0 1-3.352-10.42zm27.658 6.437l-9.72-5.614 3.367-1.944a.12.12 0 0 1 .114-.012l7.951 4.591a7.51 7.51 0 0 1-1.163 13.549v-9.47a1.334 1.334 0 0 0-.549-1.1zm3.35-5.043l-.237-.144-7.964-4.6a1.334 1.334 0 0 0-1.333 0l-9.72 5.614v-3.888a.12.12 0 0 1 .047-.103l8.052-4.648a7.51 7.51 0 0 1 11.155 7.769zm-21.063 6.929l-3.368-1.944a.12.12 0 0 1-.066-.092v-9.3a7.51 7.51 0 0 1 12.315-5.763l-.236.134-7.965 4.6a1.334 1.334 0 0 0-.666 1.148zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5z"/>
      </svg>
    );
  }

  if (name === "Claude") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M4 6h16v12H4z" fill="white" opacity="0.9"/>
        <path d="M8 10h8v4H8z" fill="none" stroke="#D97757" strokeWidth="1.5"/>
      </svg>
    );
  }

  if (name === "Gemini") {
    return (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.16333 15.8433 5.46 15.12C3.75667 14.3733 1.93667 14 0 14C1.93667 14 3.75667 13.6383 5.46 12.915C7.16333 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.16333 12.88 5.46C13.6267 3.75667 14 1.93667 14 0C14 1.93667 14.3617 3.75667 15.085 5.46C15.8317 7.16333 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z" fill="url(#gemini-gradient)"/>
        <defs>
          <linearGradient id="gemini-gradient" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4285F4"/>
            <stop offset="0.5" stopColor="#9B72CB"/>
            <stop offset="1" stopColor="#D96570"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (name === "Midjourney") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M3 7.5L12 2l9 5.5V17L12 22l-9-5.5V7.5z" stroke="white" strokeWidth="1.5" fill="none"/>
        <path d="M12 6l5 3v6l-5 3-5-3V9l5-3z" fill="white"/>
      </svg>
    );
  }

  if (name === "Perplexity") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M12 2v20M2 7l10 5 10-5" stroke="white" strokeWidth="1.5"/>
      </svg>
    );
  }

  if (name === "DALL·E") {
    return (
      <svg viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <circle cx="20.5" cy="20.5" r="18" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M12 20.5c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5S12 25.2 12 20.5z" fill="white" opacity="0.8"/>
      </svg>
    );
  }

  if (name === "Grok") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
      </svg>
    );
  }

  if (name === "Cursor") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M12 2L2 22h8l2-5 2 5h8L12 2z" fill="white" opacity="0.9"/>
        <path d="M12 8l-4 10h3l1-3 1 3h3L12 8z" fill="#1c1c1c"/>
      </svg>
    );
  }

  if (name === "Stable Diffusion") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="6" fill="white" opacity="0.6"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
      </svg>
    );
  }

  if (name === "v0") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <text x="3" y="18" fill="white" fontSize="14" fontWeight="bold" fontFamily="monospace">v0</text>
      </svg>
    );
  }

  // Fallback: first letter
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
          Works with any AI platform
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-foreground mb-12"
        >
          One prompt engineer for every AI
        </motion.h3>
        <div className="flex flex-wrap justify-center gap-4">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className="flex items-center gap-2.5 bg-card border border-border rounded-xl px-4 py-2.5 cursor-default shadow-sm hover:shadow-md transition-all"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: p.bg, border: p.border ? "1px solid #e5e7eb" : "none" }}
              >
                <PlatformIcon name={p.name} bg={p.bg} />
              </div>
              <span className="text-sm font-medium text-foreground">{p.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}