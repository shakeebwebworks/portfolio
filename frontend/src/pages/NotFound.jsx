import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container text-center">
        <p className="hero-role">error / 404</p>
        <h1 className="notfound-code">404</h1>
        <h2 className="mb-3">This page could not be found</h2>
        <p className="sec-sub mx-auto mb-4" style={{ maxWidth: 460 }}>
          The page you are looking for may have moved or doesn't exist.
        </p>
        <Link to="/" className="pf-btn pf-btn-primary">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    </section>
  );
}
