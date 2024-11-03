import React from "react";
import { motion } from "framer-motion";

const transitions = (OgComponent) => {
  return () => (
    <>
      <OgComponent />
      {/* Slide-in background with centered text */}
      <motion.div
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="transition-text">I wanna be yours forever...</div>
      </motion.div>

      {/* Slide-out background with centered text */}
      <motion.div
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default transitions;
