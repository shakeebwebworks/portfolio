import { Link } from "react-router-dom";
import { ArrowUpRight, Code, ExternalLink } from "lucide-react";
import Reveal from "../common/Reveal";
import { BrowserFrame } from "./ProjectImage";

export default function ProjectCard({ project: p, index }) {
  const techs = p.technologies || [];
  const shown = techs.slice(0, 5);
  const extra = techs.length - shown.length;

  return (
    <Reveal>
      <article className={`proj-card ${index % 2 ? "flip" : ""}`}>
        <Link to={`/projects/${p.slug}`} className="proj-media" aria-label={`View ${p.title} case study`}>
          <BrowserFrame src={p.cover_image} title={p.title} />
        </Link>

        <div className="proj-body">
          <span className="proj-num">{String(index + 1).padStart(2, "0")}</span>
          {p.category && <span className="proj-cat">{p.category.name}</span>}
          <h3>{p.title}</h3>
          <p>{p.short_description}</p>

          {shown.length > 0 && (
            <div className="proj-tech">
              {shown.map((t) => <span key={t.id}>{t.name}</span>)}
              {extra > 0 && <span>+{extra}</span>}
            </div>
          )}

          <div className="proj-actions">
            {p.live_url && (
              <a className="pf-btn pf-btn-primary pf-btn-sm" href={p.live_url} target="_blank" rel="noopener noreferrer">
                View Live Website <ExternalLink size={15} />
              </a>
            )}
            {p.github_url && (
              <a className="pf-btn pf-btn-ghost pf-btn-sm" href={p.github_url} target="_blank" rel="noopener noreferrer">
                <Code size={15} /> View GitHub Code
              </a>
            )}
            <Link className="pf-btn pf-btn-ghost pf-btn-sm" to={`/projects/${p.slug}`}>
              View Case Study <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
