import { processSteps } from "../../utils/content";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";

export default function Process() {
  return (
    <section id="process" className="pf-section">
      <div className="container">
        <SectionHeading
          center
          eyebrow="My Process"
          title="A simple, clear way of working"
          subtitle="Six steps from your idea to a live website."
        />
        <div className="timeline">
          {processSteps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} className={`tl-item ${i % 2 ? "right" : "left"}`}>
                <div className="tl-dot"><Icon size={18} /></div>
                <div className="tl-card">
                  <span className="tl-num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
