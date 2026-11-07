import { useEffect, useRef } from "react";
import gsap from "gsap";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function CursorGlow() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const move = (e) => {
      el.style.opacity = "1";
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduced]);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
