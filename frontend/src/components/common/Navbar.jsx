import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, site } from "../../utils/siteConfig";
import useGoTo from "../../hooks/useGoTo";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const goTo = useGoTo();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) {
      setActive(pathname.startsWith("/projects") ? "projects" : "");
      return;
    }
    let io;
    const t = setTimeout(() => {
      const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
        { rootMargin: "-45% 0px -50% 0px" }
      );
      els.forEach((el) => io.observe(el));
    }, 500);
    return () => {
      clearTimeout(t);
      if (io) io.disconnect();
    };
  }, [pathname, onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => goTo(id), open ? 150 : 0);
  };

  return (
    <>
      <header className={`pf-nav ${scrolled || open ? "scrolled" : ""}`}>
        <div className="container d-flex align-items-center justify-content-between">
          <button className="pf-logo" onClick={() => go("home")} aria-label="Go to top">
            <span className="pf-logo-mark">{site.brand}</span>
            <span className="pf-logo-name d-none d-sm-inline">{site.name}</span>
          </button>

          <nav className="d-none d-lg-flex align-items-center gap-1" aria-label="Main navigation">
            {navLinks.map((l) => (
              <button
                key={l.id}
                className={`pf-link ${active === l.id ? "active" : ""}`}
                onClick={() => go(l.id)}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="pf-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="pf-link-text">{l.label}</span>
              </button>
            ))}
          </nav>

          <div className="d-none d-lg-flex align-items-center gap-2">
            {site.cvUrl && (
              <a className="pf-btn pf-btn-ghost pf-btn-sm" href={site.cvUrl} download>
                <Download size={16} /> Download CV
              </a>
            )}
            <MagneticButton className="pf-btn pf-btn-primary pf-btn-sm" onClick={() => go("contact")}>
              Hire Me
            </MagneticButton>
          </div>

          <button
            className="pf-burger d-lg-none"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="pf-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="container d-flex flex-column" aria-label="Mobile navigation">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.id}
                  className={`pf-mobile-link ${active === l.id ? "active" : ""}`}
                  onClick={() => go(l.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  {l.label}
                </motion.button>
              ))}
              <div className="d-flex flex-column gap-2 mt-4">
                {site.cvUrl && (
                  <a className="pf-btn pf-btn-ghost justify-content-center" href={site.cvUrl} download>
                    <Download size={16} /> Download CV
                  </a>
                )}
                <button className="pf-btn pf-btn-primary justify-content-center" onClick={() => go("contact")}>
                  Hire Me
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
