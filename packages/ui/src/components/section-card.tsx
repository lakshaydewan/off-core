import type { ReactNode } from "react";

export interface SectionCardProps {
  label: string;
  children: ReactNode;
}

export function SectionCard({ label, children }: SectionCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-5">{label}</p>
      {children}
    </div>
  );
}
