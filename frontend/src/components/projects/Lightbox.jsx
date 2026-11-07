import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ images, index, onClose, onChange }) {
  const open = index !== null && images[index] !== undefined;
  const total = images.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onChange((index + 1) % total);
      else if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, index, total, onClose, onChange]);

  const current = open ? images[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label="Project image gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <button className="lb-btn lb-close" onClick={onClose} aria-label="Close gallery">
            <X size={22} />
          </button>

          {total > 1 && (
            <button
              className="lb-btn lb-prev"
              onClick={(e) => { e.stopPropagation(); onChange((index - 1 + total) % total); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          <motion.figure
            className="lb-fig"
            key={index}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={current.image} alt={current.caption || "Project screenshot"} />
            <figcaption>
              {current.caption && <span>{current.caption}</span>}
              <small>{index + 1} / {total}</small>
            </figcaption>
          </motion.figure>

          {total > 1 && (
            <button
              className="lb-btn lb-next"
              onClick={(e) => { e.stopPropagation(); onChange((index + 1) % total); }}
              aria-label="Next image"
            >
              <ChevronRight size={26} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
