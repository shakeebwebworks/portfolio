import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const isNum = typeof value === "number";
  const [n, setN] = useState(isNum && !reduced ? 0 : value);

  useEffect(() => {
    if (!isNum || !inView || reduced) return;
    const c = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, isNum, value, reduced]);

  return <span ref={ref}>{n}{isNum ? suffix : ""}</span>;
}
