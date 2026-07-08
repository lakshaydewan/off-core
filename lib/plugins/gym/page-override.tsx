"use client";

export function GymPageOverride() {
  const src = process.env.NEXT_PUBLIC_GYM_PLUGIN_URL ?? "http://localhost:3002";
  return (
    <iframe
      src={src}
      className="w-full border-0"
      style={{ height: "calc(100vh - 56px)" }}
      title="Gym Planner"
    />
  );
}
