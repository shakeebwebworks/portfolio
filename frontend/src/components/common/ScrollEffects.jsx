import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEffects() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const base = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-grid-bg", { yPercent: 18, ease: "none", scrollTrigger: base });
      gsap.to(".hero-visual", { yPercent: -8, ease: "none", scrollTrigger: base });
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [reduced]);

  return null;
}
