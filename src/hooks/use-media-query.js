import { useState, useEffect } from "react";

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQueryList = window.matchMedia(query);

    // Set initial match
    setMatches(mediaQueryList.matches);

    // Event listener callback
    const listener = (e) => setMatches(e.matches);

    // Add listener
    mediaQueryList.addEventListener("change", listener);

    // Cleanup
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
