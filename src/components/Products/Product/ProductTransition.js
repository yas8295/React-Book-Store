import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductTransition({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        className="h-full"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
