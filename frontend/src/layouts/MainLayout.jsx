import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollProgress from "../components/common/ScrollProgress";
import CursorGlow from "../components/common/CursorGlow";
import ScrollToTop from "../components/common/ScrollToTop";

export default function MainLayout({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <CursorGlow />
      <ScrollToTop />
      <Navbar />
      <main id="main-content" tabIndex="-1">{children}</main>
      <Footer />
    </>
  );
}
