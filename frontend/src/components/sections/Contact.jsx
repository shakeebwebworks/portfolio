import { useState } from "react";
import { Send, Mail, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { site } from "../../utils/siteConfig";
import { projectTypes, budgetRanges } from "../../utils/content";
import { sendContact } from "../../services/api";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import SocialLinks from "../common/SocialLinks";

const empty = {
  full_name: "",
  email: "",
  phone: "",
  project_type: "",
  budget: "",
  message: "",
  website: "", // honeypot: real visitors never see or fill this
};

function validate(v) {
  const e = {};
  if (v.full_name.trim().length < 2) e.full_name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";
  if (v.phone && !/^[0-9+\-\s()]{7,18}$/.test(v.phone)) e.phone = "Please enter a valid phone number.";
  if (!v.project_type) e.project_type = "Please choose a project type.";
  if (v.message.trim().length < 10) e.message = "Please describe your project (at least 10 characters).";
  return e;
}

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return; // bot caught
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      await sendContact(values);
      setStatus("success");
      setValues(empty);
    } catch (err) {
      if (err.response?.status === 400 && err.response.data) {
        const server = {};
        Object.entries(err.response.data).forEach(([k, v]) => {
          server[k] = Array.isArray(v) ? v[0] : String(v);
        });
        setErrors(server);
      }
      setStatus("error");
    }
  };

  const field = (name) => ({
    name,
    value: values[name],
    onChange,
    className: `pf-input ${errors[name] ? "invalid" : ""}`,
    "aria-invalid": !!errors[name],
  });

  return (
    <section id="contact" className="pf-section pf-section-alt">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <SectionHeading
              eyebrow="Contact"
              title="Have a Project in Mind? Let's Build Something Amazing."
              subtitle="Tell me about your idea and I'll get back to you with the next steps."
            />

            <Reveal className="d-grid gap-3">
              {site.email && (
                <a className="contact-card" href={`mailto:${site.email}`}>
                  <span className="contact-ico"><Mail size={20} /></span>
                  <span><small>Email</small>{site.email}</span>
                </a>
              )}
              {site.whatsapp && (
                <a className="contact-card" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <span className="contact-ico"><MessageCircle size={20} /></span>
                  <span><small>WhatsApp</small>Chat with me directly</span>
                </a>
              )}
              <SocialLinks />
            </Reveal>
          </div>

          <div className="col-lg-7">
            <Reveal>
              <form className="contact-form" onSubmit={onSubmit} noValidate>
                {status === "success" && (
                  <div className="form-alert ok" role="status">
                    <CheckCircle2 size={20} />
                    Thank you! Your message was sent. I'll reply soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="form-alert bad" role="alert">
                    <AlertCircle size={20} />
                    Sorry, the message could not be sent right now. Please try again, or contact me by email or WhatsApp.
                  </div>
                )}

                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="full_name">Full Name *</label>
                    <input id="full_name" type="text" autoComplete="name" {...field("full_name")} />
                    {errors.full_name && <span className="pf-err">{errors.full_name}</span>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email">Email Address *</label>
                    <input id="email" type="email" autoComplete="email" {...field("email")} />
                    {errors.email && <span className="pf-err">{errors.email}</span>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone">Phone Number (optional)</label>
                    <input id="phone" type="tel" autoComplete="tel" {...field("phone")} />
                    {errors.phone && <span className="pf-err">{errors.phone}</span>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="project_type">Project Type *</label>
                    <select id="project_type" {...field("project_type")}>
                      <option value="">Select a type</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.project_type && <span className="pf-err">{errors.project_type}</span>}
                  </div>
                  <div className="col-12">
                    <label htmlFor="budget">Budget Range</label>
                    <select id="budget" {...field("budget")}>
                      <option value="">Select a range</option>
                      {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="message">Project Description *</label>
                    <textarea id="message" rows="5" {...field("message")} />
                    {errors.message && <span className="pf-err">{errors.message}</span>}
                  </div>

                  <div className="pf-honeypot" aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input id="website" type="text" tabIndex="-1" autoComplete="off" name="website" value={values.website} onChange={onChange} />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="pf-btn pf-btn-primary w-100 justify-content-center" disabled={status === "sending"}>
                      {status === "sending" ? "Sending..." : <>Send Message <Send size={17} /></>}
                    </button>
                  </div>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
