"use client";

export function NLSearchPageOverride() {
  return (
    <iframe
      src="https://nl-search-prototype.vercel.app/"
      className="w-full border-0"
      style={{ height: "calc(100vh - 56px)" }}
      title="Natural Language Search"
    />
  );
}
