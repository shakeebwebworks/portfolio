import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import Process from "../components/sections/Process";
import Experience from "../components/sections/Experience";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import ScrollEffects from "../components/common/ScrollEffects";
import useSeo from "../hooks/useSeo";
import { site } from "../utils/siteConfig";
import { scrollToId } from "../utils/scroll";

export default function Home() {
  const { state } = useLocation();

  useSeo({
    title: `${site.name} | ${site.role}`,
    description: `${site.role} building modern, responsive, high-performance websites and web applications for businesses.`,
  });

  useEffect(() => {
    if (!state?.scrollTo) return;
    const t = setTimeout(() => scrollToId(state.scrollTo), 400);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <>
      <ScrollEffects />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Process />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}
