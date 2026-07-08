"use client";

import { useState } from "react";
import { usePluginContext } from "@/lib/plugin-context";
import { SettingsModal } from "@/components/settings-modal";

function GearIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function SettingsButton() {
  const [open, setOpen] = useState(false);
  const { pluginId } = usePluginContext();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open settings"
        className={`relative flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-150 ${
          pluginId
            ? "border-zinc-300 bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
        }`}
      >
        <GearIcon />
        {pluginId && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#FFA551] border-2 border-white" />
        )}
      </button>

      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
