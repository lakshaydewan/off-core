"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface PluginContextValue {
  pluginId: string | null;
  setPluginId: (id: string | null) => void;
  hydrated: boolean;
}

const PluginContext = createContext<PluginContextValue>({
  pluginId: null,
  setPluginId: () => {},
  hydrated: false,
});

export function PluginProvider({ children }: { children: React.ReactNode }) {
  const [pluginId, setPluginIdState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("activePlugin");
    setPluginIdState(saved ?? null);
    setHydrated(true);
  }, []);

  function setPluginId(id: string | null) {
    setPluginIdState(id);
    if (id) localStorage.setItem("activePlugin", id);
    else localStorage.removeItem("activePlugin");
  }

  return (
    <PluginContext.Provider value={{ pluginId, setPluginId, hydrated }}>
      {children}
    </PluginContext.Provider>
  );
}

export function usePluginContext() {
  return useContext(PluginContext);
}
