import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/common/Loader";
import PageTransition from "./components/common/PageTransition";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import useReducedMotion from "./hooks/useReducedMotion";
import loadProfile from "./utils/loadProfile";

const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const reduced = useReducedMotion();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const minimum = new Promise((r) => setTimeout(r, reduced ? 300 : 1800));
    Promise.all([minimum, loadProfile()]).then(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [reduced]);

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Loader key="loader" />}</AnimatePresence>
      {!loading && (
        <MainLayout>
          <Suspense fallback={<div className="pd-state"><p>Loading...</p></div>}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </MainLayout>
      )}
    </>
  );
}
