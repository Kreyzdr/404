import { useEffect, useState } from "react";
import useInViewOnce from "./useInViewOnce";

/**
 * Shared pricing "case benefits" reveal used by both the mobile and desktop
 * pricing layouts. The first three benefits are always visible; the final
 * three are revealed once, the first time the section is ~35% in view:
 * benefit 4 after 5s, then 5 and 6 at ~700ms staggers. Never replays.
 *
 * Returns a `ref` to attach to the section and `revealed` — the number of the
 * final three benefits currently shown (0..3).
 */
export default function usePricingReveal<T extends HTMLElement>() {
  const { ref, inView } = useInViewOnce<T>(0.35);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      window.setTimeout(() => setRevealed(1), 5000),
      window.setTimeout(() => setRevealed(2), 5700),
      window.setTimeout(() => setRevealed(3), 6400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return { ref, revealed };
}

// Shared reveal transition: subtle opacity + small translateY, no bounce/scale;
// reduced-motion users get the opacity change only.
export function revealClass(shown: boolean) {
  return (
    "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-opacity " +
    (shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 motion-reduce:translate-y-0")
  );
}
