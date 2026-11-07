import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

export const sendContact = (data) => api.post("/contact/", data);
export const getProjects = () => api.get("/projects/");
export const getProject = (slug) => api.get(`/projects/${slug}/`);
export const getCategories = () => api.get("/categories/");
export const getProfile = () => api.get("/profile/");
export const getSkills = () => api.get("/skills/");
export const getServices = () => api.get("/services/");
export const getTestimonials = () => api.get("/testimonials/");
export const getExperience = () => api.get("/experience/");

export default api;
