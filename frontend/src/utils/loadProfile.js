import { site } from "./siteConfig";
import { getProfile } from "../services/api";

// Replaces the defaults in siteConfig.js with what you saved in Django Admin
// (Personal information). Empty fields in admin keep the default value.
export default async function loadProfile() {
  try {
    const timeout = new Promise((_, reject) => setTimeout(reject, 4000));
    const { data: p } = await Promise.race([getProfile(), timeout]);

    if (p.full_name) {
      site.name = p.full_name;
      site.brand =
        p.full_name.trim().split(/\s+/).slice(0, 2).map((w) => w[0].toUpperCase()).join("") + ".";
    }
    if (p.role) site.role = p.role;
    if (p.email) site.email = p.email;
    if (p.whatsapp) site.whatsapp = p.whatsapp;
    if (p.github_url) site.github = p.github_url;
    if (p.linkedin_url) site.linkedin = p.linkedin_url;
    if (p.cv_file) site.cvUrl = p.cv_file;
    if (p.availability_text) site.availabilityText = p.availability_text;
    site.available = !!p.available;
    if (p.about_text) site.about = p.about_text;
  } catch {
    // Backend off or no profile yet: keep the defaults from siteConfig.js
  }
}
