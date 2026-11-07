import { motion } from "framer-motion";
import { Check, ArrowUpRight, Code } from "lucide-react";
import { services as fallback } from "../../utils/content";
import { iconMap } from "../../utils/icons";
import { getServices } from "../../services/api";
import useApi from "../../hooks/useApi";
import useGoTo from "../../hooks/useGoTo";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";

export default function Services() {
  const { data } = useApi(getServices);
  const goTo = useGoTo();

  const list =
    data && data.length
      ? data.map((s) => ({
          title: s.title,
          desc: s.description,
          benefits: s.benefits,
          icon: iconMap[s.icon] || Code,
        }))
      : fallback;

  return (
    <section id="services" className="pf-section pf-section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="Websites and web apps built to grow your business"
          subtitle="From a simple business website to a full custom web application, here is what I can build for you."
        />
        <div className="row g-4">
          {list.map((s, i) => {
            const Icon = s.icon;
            return (
              <div className="col-md-6 col-xl-3" key={s.title}>
                <Reveal delay={(i % 4) * 0.08} className="h-100">
                  <motion.article className="service-card" whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <div className="service-icon"><Icon size={24} /></div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <ul>
                      {s.benefits.map((b) => (
                        <li key={b}><Check size={15} /> {b}</li>
                      ))}
                    </ul>
                    <button className="service-cta" onClick={() => goTo("contact")}>
                      Get a quote <ArrowUpRight size={16} />
                    </button>
                  </motion.article>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
