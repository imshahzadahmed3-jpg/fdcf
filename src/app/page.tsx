"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroAddress from "@/components/HeroAddress";
import Sidebar from "@/components/Sidebar";
import EmailViewer from "@/components/EmailViewer";
import EmptyState from "@/components/EmptyState";
import { useEmails } from "@/hooks/useEmails";
import { supabase } from "@/lib/supabase";

function generateRandomString(length: number) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function Home() {
  const [address, setAddress] = useState<string>("");
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user explicitly requested a new email via header button
    const forceNew = sessionStorage.getItem("forceNewQuamifyEmail");
    const storedAddress = localStorage.getItem("quamify_active_email");

    const timer = setTimeout(() => {
      if (forceNew === "true" || !storedAddress) {
        const newAddress = `${generateRandomString(10)}@artradering.com`;
        setAddress(newAddress);
        localStorage.setItem("quamify_active_email", newAddress);
        sessionStorage.removeItem("forceNewQuamifyEmail");
      } else {
        setAddress(storedAddress);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const { emails, isLoading } = useEmails(address);

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || null;

  // DEV ONLY: Simulate incoming email
  const simulateEmail = async () => {
    if (!address) return;
    try {
      await supabase.from("emails").insert({
        sender: "test@future.corp",
        subject: "Holographic Protocol Approved",
        recipient_address: address,
        body_text: "Your temporary email sequence has been successfully initialized. Welcome to the Quamify network.\n\nKeep shifting the paradigm.",
        received_at: new Date().toISOString()
      });
    } catch (e) {
      console.error("Simulation failed:", e);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-6 flex-1 px-4 sm:px-0">
      <HeroAddress emailAddress={address} />

      <div className="flex-1 min-h-[500px] border border-white/10 rounded-2xl overflow-hidden glass-panel flex flex-col shadow-2xl relative">
        <div className="flex flex-col w-full h-full overflow-hidden">
          {isLoading ? (
            <div className="h-full flex items-center justify-center min-h-[400px]">
              <span className="w-6 h-6 border-2 border-[--color-brand-pink] border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : emails.length === 0 ? (
            <EmptyState />
          ) : (
            <Sidebar 
              emails={emails} 
              selectedEmailId={selectedEmailId} 
              onSelectEmail={setSelectedEmailId} 
            />
          )}
        </div>
      </div>

      {/* Floating 3D Modal for Email Reading */}
      <AnimatePresence>
        {selectedEmail && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl h-full max-h-[85vh] relative"
            >
              <div 
                className="absolute -inset-1 bg-gradient-to-r from-[--color-brand-purple] via-[--color-brand-pink] to-[--color-brand-orange] rounded-3xl blur-xl opacity-40 animate-pulse-glow pointer-events-none"
              ></div>
              <div className="w-full h-full bg-[#050505]/80 glass-panel rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">
                <button 
                  onClick={() => setSelectedEmailId(null)}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-white/10 border border-white/10 text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <EmailViewer email={selectedEmail} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEV TOOLS (Only visible down right for testing) */}
      <button 
        onClick={simulateEmail}
        className="fixed bottom-4 right-4 bg-white/10 hover:bg-white/20 text-xs px-3 py-1 text-gray-400 rounded-full border border-white/10 transition-colors z-50"
      >
        [Dev] Simulate Email
      </button>
    </div>
  );
}
