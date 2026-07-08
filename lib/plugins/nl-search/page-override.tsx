"use client";

export function NLSearchPageOverride() {
  return (
    <iframe
      src="http://localhost:3001"
      className="w-full border-0"
      style={{ height: "calc(100vh - 56px)" }}
      title="Natural Language Search"
    />
  );
}
