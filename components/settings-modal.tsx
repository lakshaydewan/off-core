"use client";

import { useEffect, useState, useRef } from "react";
import { usePluginContext } from "@/lib/plugin-context";
import { ALL_PLUGINS } from "@/lib/plugin-registry";
import type { Plugin } from "@/lib/plugin-types";

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

interface PluginOptionProps {
  id: string | null;
  name: string;
  description: string;
  avatar: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

function PluginOption({ name, description, avatar, selected, onSelect }: PluginOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 rounded-xl border transition-all duration-150 ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:border-border hover:bg-accent/50"
      }`}
    >
      <div className="shrink-0">{avatar}</div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-none mb-1 ${selected ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>
          {name}
        </p>
        <p className="text-[12px] text-muted-foreground leading-snug">{description}</p>
      </div>

      <div
        className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border"
        }`}
      >
        {selected && <CheckIcon />}
      </div>
    </button>
  );
}

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { pluginId, setPluginId } = usePluginContext();
  const [selected, setSelected] = useState<string | null>(pluginId);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setSelected(pluginId);
  }, [open, pluginId]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function save() {
    setPluginId(selected);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal
        aria-label="Settings"
        className="relative w-full max-w-sm bg-card rounded-2xl shadow-2xl shadow-black/[0.12] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-foreground leading-none">Settings</h2>
            <p className="text-[12px] text-muted-foreground mt-1">Customise your browsing experience</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Close"
          >
            <XIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-2 overflow-y-auto max-h-[60vh]">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Active Lens
          </p>

          {/* None option */}
          <PluginOption
            id={null}
            name="No Plugin"
            description="Standard browsing with scores and search."
            avatar={
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-[13px] font-semibold">
                —
              </div>
            }
            selected={selected === null}
            onSelect={() => setSelected(null)}
          />

          {ALL_PLUGINS.length > 0 && (
            <div className="h-px bg-border my-1" />
          )}

          {/* Plugin options */}
          {ALL_PLUGINS.map((plugin: Plugin) => (
            <PluginOption
              key={plugin.id}
              id={plugin.id}
              name={plugin.name}
              description={plugin.description ?? ""}
              avatar={
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-[13px] font-bold">
                  {plugin.name[0].toUpperCase()}
                </div>
              }
              selected={selected === plugin.id}
              onSelect={() => setSelected(plugin.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="h-9 px-4 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
