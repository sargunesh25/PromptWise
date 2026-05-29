import React, { useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function InputBar({ value, onChange, onSubmit, loading, disabled, limitExceeded, onShowLimit }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (limitExceeded) { onShowLimit?.(); return; }
      if (value.trim() && !loading) onSubmit();
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-3 sm:px-4 pb-4 sm:pb-6 pt-2">
      {limitExceeded && (
        <div className="mb-2 flex items-center justify-between bg-card border border-border rounded-xl px-4 py-2.5 shadow-sm">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Limit reached.</span> Unlock unlimited research runs with{" "}
            <span className="text-foreground font-semibold">Pro</span>
          </p>
          <button
            onClick={onShowLimit}
            className="text-xs font-medium text-foreground border border-border rounded-full px-3 py-1 hover:bg-accent transition-colors ml-3 shrink-0"
          >
            Upgrade
          </button>
        </div>
      )}
      <div
        className={`relative rounded-xl border bg-card shadow-sm overflow-hidden transition-colors ${
          limitExceeded ? "border-border opacity-70" : "border-border focus-within:border-foreground/20"
        }`}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={limitExceeded ? "Daily limit reached - upgrade for unlimited research" : "Ask about papers, patents, trials, filings, or market signals..."}
          rows={1}
          disabled={loading || disabled}
          onClick={() => { if (limitExceeded) onShowLimit?.(); }}
          className="w-full bg-transparent px-4 pt-3.5 pb-12 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none disabled:opacity-60"
        />
        <div className="absolute bottom-3 right-3">
          <button
            onClick={() => {
              if (limitExceeded) { onShowLimit?.(); return; }
              if (value.trim() && !loading) onSubmit();
            }}
            disabled={(!value.trim() || loading) && !limitExceeded}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/85 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowUp className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
