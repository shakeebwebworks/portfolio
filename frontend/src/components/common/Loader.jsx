import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="pf-loader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pf-loader-inner">
        <motion.div
          className="pf-loader-brand"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Loading portfolio
        </motion.div>
        <div className="pf-loader-track">
          <motion.div
            className="pf-loader-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
