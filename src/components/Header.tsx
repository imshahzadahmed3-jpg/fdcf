"use client";

import { RefreshCw } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl p-4 flex items-center justify-between border-[rgba(255,255,255,0.05)] shadow-xl">
        {/* Logo Text */}
        <div className="flex items-center">
          <span className="text-2xl sm:text-3xl font-black tracking-widest bg-gradient-to-r from-[#7d12ff] via-[#ff12b1] to-[#ff8a12] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,18,177,0.4)] uppercase">
            Quamify
          </span>
        </div>

        {/* Generate New Button */}
        <button 
          className="relative px-6 py-2.5 rounded-full font-medium text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          onClick={() => window.location.reload()}
        >
          <div className="absolute inset-0 bg-transparent rounded-full border border-transparent holo-border z-0"></div>
          <div className="relative z-10 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#ff12b1]" />
            <span>Generate New</span>
          </div>
        </button>
      </div>
    </header>
  );
}
