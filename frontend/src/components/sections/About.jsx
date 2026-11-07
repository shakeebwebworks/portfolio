import { about, stats, skillGroups } from "../../utils/content";
import { site } from "../../utils/siteConfig";
import { getSkills } from "../../services/api";
import useApi from "../../hooks/useApi";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import Counter from "../common/Counter";

export default function About() {
  const { data: skills } = useApi(getSkills);

  const paragraphs = site.about
    ? site.about.split(/\n\s*\n/).filter(Boolean)
    : about.paragraphs;

  const groups =
    skills && skills.length
      ? skillGroups
          .map((g) => ({
            ...g,
            items: skills.filter((s) => s.category === g.title.toLowerCase()).map((s) => s.name),
          }))
          .filter((g) => g.items.length)
      : skillGroups;

  return (
    <section id="about" className="pf-section">
      <div className="container">
        <SectionHeading eyebrow="About Me" title={about.title} />

        <div className="row g-5 align-items-start">
          <div className="col-lg-6">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="about-text">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="col-lg-6">
            <div className="row g-3">
              {stats.map((s, i) => (
                <div className="col-6" key={s.label}>
                  <Reveal delay={i * 0.08}>
                    <div className="stat-card">
                      <div className="stat-value">
                        <Counter value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-5 pt-3">
          <h3 className="skills-title">Technical Skills</h3>
        </Reveal>
        <div className="row g-3">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <div className="col-md-6 col-xl-3" key={g.title}>
                <Reveal delay={i * 0.08} className="h-100">
                  <div className="skill-card">
                    <div className="skill-icon"><Icon size={22} /></div>
                    <h4>{g.title}</h4>
                    <div className="skill-chips">
                      {g.items.map((it) => <span key={it}>{it}</span>)}
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
