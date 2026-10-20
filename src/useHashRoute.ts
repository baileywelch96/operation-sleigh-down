import { useEffect, useState } from "react";

// A tiny hash router. Hash URLs (#/briefing) work on GitHub Pages
// without any server config, and every page can be linked directly.
function read(): string {
  return window.location.hash.replace(/^#\/?/, "");
}

export function useHashRoute(): [string, (to: string) => void] {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const go = (to: string) => {
    window.location.hash = to ? `/${to}` : "";
  };
  return [route, go];
}
