import React from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-foreground flex items-center justify-center">
            <Zap className="w-3 h-3 text-background" />
          </div>
          <span className="text-sm font-bold text-foreground">PromptWise</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/templates" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Templates</Link>
          <Link to="/pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <span className="text-xs text-muted-foreground">© 2025 PromptWise</span>
        </div>
      </div>
    </footer>
  );
}