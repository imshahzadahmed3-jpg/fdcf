"use client";

import { useEffect, useState } from "react";
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
    // Generate an address on first load if one doesn't exist in local storage.
    // For simplicity here, we just generate a fresh one every reload as per "Generate New" requirement.
    const timer = setTimeout(() => {
      const newAddress = `${generateRandomString(10)}@quamifymail.link`;
      setAddress(newAddress);
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
      });
    } catch (e) {
      console.error("Simulation failed:", e);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto space-y-6 flex-1 px-4 sm:px-0">
      <HeroAddress emailAddress={address} />

      <div className="flex-1 min-h-[500px] border border-white/10 rounded-2xl overflow-hidden glass-panel flex flex-col md:flex-row shadow-2xl relative">
        
        {/* Mobile View handles showing Sidebar OR Viewer */}
        <div className="md:w-1/3 flex flex-col border-r border-white/10 w-full h-1/2 md:h-auto overflow-hidden">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <span className="w-6 h-6 border-2 border-[--color-brand-pink] border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : (
            <Sidebar 
              emails={emails} 
              selectedEmailId={selectedEmailId} 
              onSelectEmail={setSelectedEmailId} 
            />
          )}
        </div>

        <div className="md:w-2/3 w-full h-1/2 md:h-auto overflow-hidden">
          {emails.length === 0 ? (
            <EmptyState />
          ) : (
            <EmailViewer email={selectedEmail} />
          )}
        </div>
      </div>

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
