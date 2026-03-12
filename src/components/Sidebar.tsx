"use client";

import { Email } from "@/types";

interface SidebarProps {
  emails: Email[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
}

// Helper to format "time ago" safely avoiding NaN
function getTimeAgo(dateStr: string | undefined): string {
  if (!dateStr) return 'Just now';
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Just now'; // Fallback if still invalid
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export default function Sidebar({ emails, selectedEmailId, onSelectEmail }: SidebarProps) {
  if (emails.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center p-6 text-gray-500 border-r border-white/5">
        <p className="text-sm">Inbox is empty</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto w-full custom-scrollbar border-r border-white/5 bg-black/20">
      <div className="p-4 pb-0 opacity-70">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Inbox ({emails.length})</h3>
      </div>
      <div className="flex flex-col p-2 space-y-2">
        {emails.map((email) => {
          const isSelected = selectedEmailId === email.id;
          
          return (
            <button
              key={email.id}
              onClick={() => onSelectEmail(email.id)}
              className={`text-left w-full p-4 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col gap-1 oil-slick ${
                isSelected 
                  ? "bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[--color-brand-purple] before:to-transparent before:opacity-10 before:pointer-events-none" 
                  : "bg-transparent hover:bg-white/5"
              }`}
            >
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[--color-brand-pink] shadow-[0_0_10px_var(--color-brand-pink)]"></div>
              )}
              
              <div className="flex justify-between items-center w-full">
                <span className="font-semibold text-white truncate max-w-[70%]">{email.sender || "Unknown Sender"}</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">{getTimeAgo(email.received_at)}</span>
              </div>
              
              <span className="text-sm text-gray-300 truncate w-full">
                {email.subject || "(No Subject)"}
              </span>
              
              <span className="text-xs text-gray-500 truncate w-full mt-1">
                {email.body_text?.substring(0, 50) || "No content"}...
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
