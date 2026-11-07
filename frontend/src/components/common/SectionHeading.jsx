import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <Reveal className={`sec-head ${center ? "text-center mx-auto" : ""}`}>
      <span className="sec-eyebrow">{eyebrow}</span>
      <h2 className="sec-title">{title}</h2>
      {subtitle && <p className="sec-sub">{subtitle}</p>}
    </Reveal>
  );
}
