import { Star } from "lucide-react";
import { getTestimonials } from "../../services/api";
import useApi from "../../hooks/useApi";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";

export default function Testimonials() {
  const { data } = useApi(getTestimonials);
  if (!data || data.length === 0) return null; // hidden until you publish real feedback

  return (
    <section id="testimonials" className="pf-section">
      <div className="container">
        <SectionHeading
          center
          eyebrow="Testimonials"
          title="What clients say"
        />
        <div className="row g-4">
          {data.map((t, i) => {
            const rating = Math.max(1, Math.min(5, t.rating || 5));
            return (
              <div className="col-md-6 col-xl-4" key={t.id}>
                <Reveal delay={(i % 3) * 0.08} className="h-100">
                  <figure className="tst-card">
                    {t.is_sample && <span className="tst-sample">Sample text, not a real review</span>}
                    <div className="tst-stars" aria-label={`${rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} size={16} fill={n <= rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <blockquote>{t.feedback}</blockquote>
                    <figcaption>
                      {t.client_image && <img src={t.client_image} alt="" loading="lazy" />}
                      <span>
                        <strong>{t.client_name}</strong>
                        <small>{[t.client_role, t.project_name].filter(Boolean).join(" - ")}</small>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
