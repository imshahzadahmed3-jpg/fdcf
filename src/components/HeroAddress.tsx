"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface HeroAddressProps {
  emailAddress: string;
}

export default function HeroAddress({ emailAddress }: HeroAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!emailAddress) return;
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex justify-center py-6 sm:py-10 animate-[float_6s_ease-in-out_infinite]"
    >
      <div className="relative group w-full max-w-2xl">
        {/* Animated Glow Behind Card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[--color-brand-purple] via-[--color-brand-pink] to-[--color-brand-orange] rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
        
        {/* Holographic Card */}
        <div className="relative glass-card rounded-2xl p-6 sm:p-10 flex flex-col items-center text-center overflow-hidden">
          {/* subtle mesh overlay inside card */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>
          
          <h2 className="text-sm sm:text-base font-medium text-gray-400 mb-3 tracking-widest uppercase relative z-10">Your Temporary Inbox</h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full relative z-10">
            <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-4 sm:px-6 w-full flex items-center justify-between overflow-hidden relative">
              <span className="text-xl sm:text-2xl font-mono text-white truncate max-w-[200px] sm:max-w-[400px]">
                {emailAddress || "Generating..."}
              </span>
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/80 to-transparent pointer-events-none sm:hidden"></div>
            </div>
            
            <button
              onClick={handleCopy}
              disabled={!emailAddress}
              className={`relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-300 w-full sm:w-auto ${
                copied 
                  ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:shadow-[0_0_20px_rgba(255,18,177,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
