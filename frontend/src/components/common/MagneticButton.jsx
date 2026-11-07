import { motion, useMotionValue, useSpring } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.25,
  ...rest
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const handleMove = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? motion.a : motion.button;
  const extra = href ? { href } : { type: "button" };

  return (
    <Tag
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      {...extra}
      {...rest}
    >
      {children}
    </Tag>
  );
}
