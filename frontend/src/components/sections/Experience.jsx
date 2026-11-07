import { getExperience } from "../../services/api";
import useApi from "../../hooks/useApi";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";

const labels = {
  learning: "Learning",
  technical: "Technical",
  project: "Project",
  certification: "Certification",
  achievement: "Achievement",
};

export default function Experience() {
  const { data } = useApi(getExperience);
  if (!data || data.length === 0) return null; // hidden until you add real entries

  return (
    <section id="experience" className="pf-section pf-section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="Journey"
          title="My learning and development journey"
          subtitle="The steps that shaped how I build."
        />
        <div className="xp-list">
          {data.map((x, i) => (
            <Reveal key={x.id} delay={(i % 3) * 0.06}>
              <div className="xp-item">
                <div className="xp-meta">
                  <span className="xp-kind">{labels[x.kind] || x.kind}</span>
                  {x.period && <span className="xp-period">{x.period}</span>}
                </div>
                <div>
                  <h3>{x.title}</h3>
                  {x.organisation && <p className="xp-org">{x.organisation}</p>}
                  {x.description && <p className="xp-desc">{x.description}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
