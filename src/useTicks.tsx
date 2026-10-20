import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

// Tick boxes (materials, setup, questions) are saved in each viewer's own browser.
const KEY = "sleighdown-ticks-v1";

type Ticks = Record<string, boolean>;
type Ctx = { ticks: Ticks; toggle: (id: string) => void; clear: (prefix: string) => void };

const TicksContext = createContext<Ctx | null>(null);

function load(): Ticks {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") || {};
  } catch {
    return {};
  }
}

export function TicksProvider({ children }: { children: ReactNode }) {
  const [ticks, setTicks] = useState<Ticks>(load);
  const save = (next: Ticks) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: ticks just won't persist */
    }
  };
  const toggle = useCallback((id: string) => {
    setTicks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      save(next);
      return next;
    });
  }, []);
  const clear = useCallback((prefix: string) => {
    setTicks((prev) => {
      const next = Object.fromEntries(Object.entries(prev).filter(([k]) => !k.startsWith(prefix)));
      save(next);
      return next;
    });
  }, []);
  return <TicksContext.Provider value={{ ticks, toggle, clear }}>{children}</TicksContext.Provider>;
}

export function useTicks(): Ctx {
  const ctx = useContext(TicksContext);
  if (!ctx) throw new Error("useTicks must be used inside TicksProvider");
  return ctx;
}
