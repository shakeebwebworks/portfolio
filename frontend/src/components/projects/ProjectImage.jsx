export function ProjectImage({ src, title, eager = false }) {
  if (src) {
    return (
      <img
        className="proj-img"
        src={src}
        alt={`${title} website screenshot`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }
  return (
    <div className="proj-ph" role="img" aria-label={`${title} screenshot placeholder`}>
      <div className="proj-ph-lines"><i /><i /><i /></div>
      <strong>{title}</strong>
      <small>Screenshot placeholder</small>
    </div>
  );
}

export function BrowserFrame({ src, title, eager = false }) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <span /><span /><span />
        <i className="browser-url" />
      </div>
      <div className="browser-view">
        <ProjectImage src={src} title={title} eager={eager} />
      </div>
    </div>
  );
}
