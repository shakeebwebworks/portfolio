import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getProjects } from "../../services/api";
import useApi from "../../hooks/useApi";
import SectionHeading from "../common/SectionHeading";
import ProjectCard from "../projects/ProjectCard";

export default function Projects() {
  const { data, loading, error, retry } = useApi(getProjects);
  const [active, setActive] = useState("all");
  const projects = data || [];

  const categories = useMemo(() => {
    const map = new Map();
    (data || []).forEach((p) => {
      if (!p.category) return;
      const c = map.get(p.category.slug) || { ...p.category, count: 0 };
      c.count += 1;
      map.set(c.slug, c);
    });
    return [...map.values()];
  }, [data]);

  const list = active === "all" ? projects : projects.filter((p) => p.category?.slug === active);

  return (
    <section id="projects" className="pf-section">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Websites and web apps I've built"
          subtitle="A selection of my work. Open any project for the full case study."
        />

        {loading && (
          <div className="d-grid gap-5">
            {[0, 1].map((i) => <div className="proj-skel" key={i} />)}
          </div>
        )}

        {!loading && error && (
          <div className="proj-empty">
            <p>Projects could not be loaded right now.</p>
            <button className="pf-btn pf-btn-ghost pf-btn-sm" onClick={retry}>Try again</button>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="proj-empty"><p>Projects are being added. Please check back soon.</p></div>
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            {categories.length > 1 && (
              <div className="proj-filters" role="tablist" aria-label="Filter projects by category">
                {[{ slug: "all", name: "All Projects", count: projects.length }, ...categories].map((c) => (
                  <button
                    key={c.slug}
                    role="tab"
                    aria-selected={active === c.slug}
                    className={`proj-filter ${active === c.slug ? "active" : ""}`}
                    onClick={() => setActive(c.slug)}
                  >
                    {active === c.slug && (
                      <motion.span
                        layoutId="filter-pill"
                        className="proj-filter-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="proj-filter-text">{c.name} <em>{c.count}</em></span>
                  </button>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {list.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}
