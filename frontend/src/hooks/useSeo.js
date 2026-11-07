import { useEffect } from "react";

function setMeta(attr, key, value) {
  if (!value) return () => {};
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  const created = !el;
  if (created) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("content");
  el.setAttribute("content", value);
  return () => {
    if (created) el.remove();
    else if (prev !== null) el.setAttribute("content", prev);
  };
}

export default function useSeo({ title, description, image }) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;
    const undo = [
      setMeta("name", "description", description),
      setMeta("property", "og:title", title),
      setMeta("property", "og:description", description),
      setMeta("property", "og:image", image),
    ];
    return () => {
      document.title = prevTitle;
      undo.forEach((fn) => fn());
    };
  }, [title, description, image]);
}
