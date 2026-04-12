import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
