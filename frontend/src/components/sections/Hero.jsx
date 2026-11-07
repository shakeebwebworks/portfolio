import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { site } from "../../utils/siteConfig";
import { scrollToId } from "../../utils/scroll";
import useReducedMotion from "../../hooks/useReducedMotion";
import MagneticButton from "../common/MagneticButton";
import SocialLinks from "../common/SocialLinks";

const headline = ["I", "Build", "Digital", "Experiences", "That", "Turn", "Ideas", "Into", "Reality."];
const highlight = [2, 3];

export default function Hero() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.7 })
        .from(".hero-word-inner", { yPercent: 110, duration: 1, stagger: 0.07 }, "-=0.4")
        .from(".hero-fade", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
        .from(".hero-card", { y: 40, opacity: 0, duration: 1 }, "-=0.9");

      gsap.to(".glow-1", { x: 60, y: -40, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".glow-2", { x: -50, y: 50, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, root);

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      gsap.to(".hero-card", { rotateY: nx * 8, rotateX: -ny * 8, duration: 0.6, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section id="home" className="hero" ref={root}>
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="glow glow-1" aria-hidden="true" />
      <div className="glow glow-2" aria-hidden="true" />

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            {site.available && (
              <div className="hero-badge">
                <span className="pulse-dot" /> {site.availabilityText}
              </div>
            )}

            <p className="hero-fade hero-role">
              {site.name} <span>/</span> {site.role}
            </p>

            <h1 className="hero-title">
              {headline.map((w, i) => (
                <span className="hero-word" key={i}>
                  <span className={`hero-word-inner ${highlight.includes(i) ? "grad" : ""}`}>{w}</span>
                  {" "}
                </span>
              ))}
            </h1>

            <p className="hero-fade hero-intro">
              I'm a Full-Stack Web Developer specializing in building modern, responsive,
              high-performance websites and web applications that help businesses grow.
            </p>

            <div className="hero-fade d-flex flex-wrap gap-3 mt-4">
              <MagneticButton className="pf-btn pf-btn-primary" onClick={() => scrollToId("projects")}>
                View My Projects <ArrowRight size={18} />
              </MagneticButton>
              <MagneticButton className="pf-btn pf-btn-ghost" onClick={() => scrollToId("contact")}>
                Hire Me
              </MagneticButton>
            </div>

            <SocialLinks className="hero-fade mt-4" />
          </div>

          <div className="col-lg-5 d-none d-lg-block hero-visual">
            <div className="hero-card">
              <div className="code-top">
                <span /><span /><span />
                <small>developer.js</small>
              </div>
              <pre className="code-body">
{`const developer = {
  role: "Full-Stack Developer",
  stack: ["React", "Django",
          "PostgreSQL"],
  focus: "Business websites
          & web apps",
  available: true,
};`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
