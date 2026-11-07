export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top, behavior: "smooth" });
}
