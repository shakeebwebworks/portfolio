import { Mail } from "lucide-react";
import { site } from "../../utils/siteConfig";

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function SocialLinks({ className = "" }) {
  const items = [
    site.github && { label: "GitHub", href: site.github, icon: <GitHubIcon />, external: true },
    site.linkedin && { label: "LinkedIn", href: site.linkedin, icon: <LinkedInIcon />, external: true },
    site.whatsapp && { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}`, icon: <WhatsAppIcon />, external: true },
    site.email && { label: "Email", href: `mailto:${site.email}`, icon: <Mail size={18} />, external: false },
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <div className={`d-flex gap-2 ${className}`}>
      {items.map((s) => (
        <a
          key={s.label}
          className="pf-social"
          href={s.href}
          aria-label={s.label}
          {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
