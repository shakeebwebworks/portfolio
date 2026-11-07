import { ArrowUp } from "lucide-react";
import { navLinks, site } from "../../utils/siteConfig";
import useGoTo from "../../hooks/useGoTo";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const goTo = useGoTo();
  return (
    <footer className="pf-footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="pf-logo mb-3">
              <span className="pf-logo-mark">{site.brand}</span>
              <span className="pf-logo-name">{site.name}</span>
            </div>
            <p className="footer-text">
              {site.role} building modern, responsive websites and web applications for businesses.
            </p>
            <SocialLinks />
          </div>

          <div className="col-6 col-lg-3">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button onClick={() => goTo(l.id)}>{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-4">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-list">
              {site.email && <li><a href={`mailto:${site.email}`}>{site.email}</a></li>}
              {site.whatsapp && (
                <li>
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp me
                  </a>
                </li>
              )}
              {!site.email && !site.whatsapp && (
                <li><button onClick={() => goTo("contact")}>Use the contact form</button></li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

