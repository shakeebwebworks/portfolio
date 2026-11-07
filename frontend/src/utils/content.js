import {
  Layers, Server, Database, Wrench, Store, ShoppingCart, UtensilsCrossed,
  Building2, Palette, Stethoscope, LayoutDashboard, Code, Search, Rocket, FlaskConical,
} from "lucide-react";

export const about = {
  title: "Developer who builds for real businesses",
  paragraphs: [
    "I'm a Full-Stack Web Developer who turns business needs into clean, fast and easy-to-use websites and web applications. I work across the whole stack, with React on the front end and Django with PostgreSQL on the back end.",
    "My approach is simple: understand the business first, design for the customer who will use the site, then build it with reusable components and clean APIs so it is easy to maintain and grow.",
    "I enjoy building digital products for restaurants, clinics, shops, real estate and design studios, and my goal is to keep growing as a full-stack engineer by building real products that help businesses grow.",
  ],
};

// value can be a number (animated counter) or text. Edit freely, only put true facts.
export const stats = [
  { value: 6, suffix: "+", label: "Projects Built" },
  { value: 13, suffix: "", label: "Technologies Used" },
  { value: 3, suffix: "", label: "Layers: Frontend, Backend, Database" },
  { value: "Daily", suffix: "", label: "Continuous Learning" },
];

export const skillGroups = [
  { title: "Frontend", icon: Layers, items: ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap 5"] },
  { title: "Backend", icon: Server, items: ["Python", "Django", "Django REST Framework"] },
  { title: "Database", icon: Database, items: ["PostgreSQL", "MySQL"] },
  { title: "Tools", icon: Wrench, items: ["Git", "GitHub", "VS Code", "Postman"] },
];

export const services = [
  {
    icon: Store, title: "Business Website Development",
    desc: "Professional websites that present your business clearly and bring in enquiries.",
    benefits: ["Mobile-friendly design", "Fast loading", "Contact and lead forms"],
  },
  {
    icon: ShoppingCart, title: "E-commerce Website Development",
    desc: "Online stores with product catalogues, carts and order management.",
    benefits: ["Easy product management", "Smooth checkout flow", "Admin dashboard"],
  },
  {
    icon: UtensilsCrossed, title: "Restaurant and Cafe Websites",
    desc: "Appealing websites and food order management systems for restaurants and cafes.",
    benefits: ["Menu you can edit", "Online order handling", "Photo-rich layouts"],
  },
  {
    icon: Building2, title: "Real Estate Websites",
    desc: "Property listing websites that help buyers find and enquire about properties.",
    benefits: ["Property listings", "Image galleries", "Enquiry forms"],
  },
  {
    icon: Palette, title: "Interior Design Websites",
    desc: "Visual portfolio websites that show your design work beautifully.",
    benefits: ["Project galleries", "Elegant layouts", "Client enquiries"],
  },
  {
    icon: Stethoscope, title: "Dental and Clinic Websites",
    desc: "Trustworthy websites for clinics with services, doctors and appointment enquiries.",
    benefits: ["Service pages", "Appointment requests", "Clear contact details"],
  },
  {
    icon: LayoutDashboard, title: "Full-Stack Web Applications",
    desc: "Custom web apps with a React frontend, Django backend and PostgreSQL database.",
    benefits: ["Secure login and roles", "Admin panel", "Scalable structure"],
  },
  {
    icon: Code, title: "Backend API Development",
    desc: "Clean REST APIs built with Django REST Framework, plus redesign and optimization of existing sites.",
    benefits: ["Well-documented endpoints", "Validation and security", "Faster performance"],
  },
];

export const processSteps = [
  { icon: Search, title: "Discovery and Planning", desc: "We talk about your business, goals and customers, then plan pages, features and timeline." },
  { icon: Palette, title: "UI/UX Design", desc: "I design clean layouts and user flows that look good and are easy to use on every screen." },
  { icon: Code, title: "Frontend Development", desc: "I build the interface with React and Bootstrap, responsive and accessible." },
  { icon: Server, title: "Backend Development", desc: "I build the Django and PostgreSQL backend, APIs and the admin panel to manage content." },
  { icon: FlaskConical, title: "Testing and Optimization", desc: "I test on different devices and browsers and improve speed and quality." },
  { icon: Rocket, title: "Deployment and Support", desc: "I launch the site online and help with fixes and updates after going live." },
];

export const projectTypes = [
  "Business Website",
  "E-commerce Website",
  "Restaurant / Cafe Website",
  "Real Estate Website",
  "Interior Design Website",
  "Dental / Clinic Website",
  "Full-Stack Web Application",
  "Backend API",
  "Website Redesign",
  "Other",
];

// Edit these ranges to match your pricing
export const budgetRanges = [
  "Not sure yet",
  "Under Rs 25,000",
  "Rs 25,000 - 50,000",
  "Rs 50,000 - 1,00,000",
  "Above Rs 1,00,000",
];
