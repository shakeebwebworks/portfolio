import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code, ExternalLink, ZoomIn } from "lucide-react";
import { getProject } from "../services/api";
import useApi from "../hooks/useApi";
import useGoTo from "../hooks/useGoTo";
import useSeo from "../hooks/useSeo";
import Reveal from "../components/common/Reveal";
import { BrowserFrame, ProjectImage } from "../components/projects/ProjectImage";
import Lightbox from "../components/projects/Lightbox";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: p, loading, error, retry } = useApi(() => getProject(slug), [slug]);
  const goTo = useGoTo();
  const [lb, setLb] = useState(null);
  const closeLb = useCallback(() => setLb(null), []);
  useSeo({ title: p ? p.title + " | Case Study" : undefined, description: p ? p.short_description : undefined, image: p ? p.cover_image : undefined });


  if (loading) return <section className="pd-state"><p>Loading project...</p></section>;
  if (error?.response?.status === 404) return <NotFound />;
  if (error) {
    return (
      <section className="pd-state">
        <p>This project could not be loaded right now.</p>
        <button className="pf-btn pf-btn-ghost pf-btn-sm" onClick={retry}>Try again</button>
      </section>
    );
  }

  const imgs = p.images || [];
  const hasCover = !!p.cover_image;
  const gallery = [...(hasCover ? [{ image: p.cover_image, caption: p.title }] : []), ...imgs];
  const offset = hasCover ? 1 : 0;
  const openImg = (img) => setLb(offset + imgs.indexOf(img));
  const desktopImgs = imgs.filter((i) => i.image_type !== "mobile");
  const mobileImgs = imgs.filter((i) => i.image_type === "mobile");

  const story = [
    ["Project Objective", p.objective],
    ["The Problem", p.problem],
    ["The Solution", p.solution],
  ].filter(([, text]) => text);

  return (
    <>
      <section className="pd-hero">
        <div className="container">
          <Link to="/" state={{ scrollTo: "projects" }} className="pd-back">
            <ArrowLeft size={16} /> All projects
          </Link>
          {p.category && <span className="proj-cat">{p.category.name}</span>}
          <h1 className="pd-title">{p.title}</h1>
          <p className="pd-lead">{p.short_description}</p>

          <div className="d-flex flex-wrap gap-3 my-4">
            {p.live_url && (
              <a className="pf-btn pf-btn-primary" href={p.live_url} target="_blank" rel="noopener noreferrer">
                View Live Website <ExternalLink size={16} />
              </a>
            )}
            {p.github_url && (
              <a className="pf-btn pf-btn-ghost" href={p.github_url} target="_blank" rel="noopener noreferrer">
                <Code size={16} /> View GitHub Code
              </a>
            )}
            {p.case_study_url && (
              <a className="pf-btn pf-btn-ghost" href={p.case_study_url} target="_blank" rel="noopener noreferrer">
                Extended Case Study <ArrowUpRight size={16} />
              </a>
            )}
          </div>

          <Reveal>
            {hasCover ? (
              <button className="pd-hero-img" onClick={() => setLb(0)} aria-label="Open project screenshot">
                <BrowserFrame src={p.cover_image} title={p.title} eager />
              </button>
            ) : (
              <BrowserFrame title={p.title} eager />
            )}
          </Reveal>
        </div>
      </section>

      {p.overview && (
        <section className="pd-block">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-4"><h2 className="pd-h">Overview</h2></div>
              <div className="col-lg-8"><p className="pd-text">{p.overview}</p></div>
            </div>
          </div>
        </section>
      )}

      {story.length > 0 && (
        <section className="pd-block">
          <div className="container">
            <div className="row g-4">
              {story.map(([title, text], i) => (
                <div className="col-lg-4" key={title}>
                  <Reveal delay={i * 0.08} className="h-100">
                    <div className="pd-card">
                      <span className="tl-num">0{i + 1}</span>
                      <h3>{title}</h3>
                      <p className="pd-text">{text}</p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(p.key_features?.length > 0 || p.results?.length > 0) && (
        <section className="pd-block">
          <div className="container">
            <div className="row g-4">
              {p.key_features?.length > 0 && (
                <div className="col-lg-6">
                  <h2 className="pd-h mb-3">Key Features</h2>
                  <ul className="pd-list">
                    {p.key_features.map((f) => <li key={f}><Check size={16} /> {f}</li>)}
                  </ul>
                </div>
              )}
              {p.results?.length > 0 && (
                <div className="col-lg-6">
                  <h2 className="pd-h mb-3">Results</h2>
                  <ul className="pd-list">
                    {p.results.map((r) => <li key={r}><Check size={16} /> {r}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {p.technologies?.length > 0 && (
        <section className="pd-block">
          <div className="container">
            <h2 className="pd-h mb-3">Technologies Used</h2>
            <div className="proj-tech">
              {p.technologies.map((t) => <span key={t.id}>{t.name}</span>)}
            </div>
          </div>
        </section>
      )}

      {imgs.length > 0 && (
        <section className="pd-block">
          <div className="container">
            <h2 className="pd-h mb-4">Screenshots</h2>

            {desktopImgs.length > 0 && (
              <div className="gal-grid">
                {desktopImgs.map((img) => (
                  <button className="gal-item" key={img.id} onClick={() => openImg(img)} aria-label={img.caption || "Open screenshot"}>
                    <ProjectImage src={img.image} title={p.title} />
                    <span className="gal-zoom"><ZoomIn size={20} /></span>
                  </button>
                ))}
              </div>
            )}

            {mobileImgs.length > 0 && (
              <>
                <h3 className="pd-sub">Mobile</h3>
                <div className="phone-row">
                  {mobileImgs.map((img) => (
                    <button className="phone" key={img.id} onClick={() => openImg(img)} aria-label={img.caption || "Open mobile screenshot"}>
                      <ProjectImage src={img.image} title={p.title} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <section className="pd-block">
        <div className="container">
          <div className="pd-nav">
            {p.previous_project ? (
              <Link to={`/projects/${p.previous_project.slug}`} className="pd-nav-link">
                <small><ArrowLeft size={14} /> Previous project</small>
                <span>{p.previous_project.title}</span>
              </Link>
            ) : <span />}
            {p.next_project && (
              <Link to={`/projects/${p.next_project.slug}`} className="pd-nav-link end">
                <small>Next project <ArrowRight size={14} /></small>
                <span>{p.next_project.title}</span>
              </Link>
            )}
          </div>

          <div className="pd-cta">
            <h2>Want a website like this?</h2>
            <p className="sec-sub mx-auto mb-4" style={{ maxWidth: 480 }}>
              Tell me about your project and let's build it together.
            </p>
            <button className="pf-btn pf-btn-primary" onClick={() => goTo("contact")}>
              Contact Me <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <Lightbox images={gallery} index={lb} onClose={closeLb} onChange={setLb} />
    </>
  );
}

