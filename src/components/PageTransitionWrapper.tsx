import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useVisited } from "../contexts/VisitedContext";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const location = useLocation();
  const { visitedPages, setVisitedPages } = useVisited();

  const hasVisited = visitedPages.includes(location.pathname);

  // Mark this page as visited once it mounts
  useEffect(() => {
    if (!hasVisited) {
      setVisitedPages(prevPages => 
        prevPages.includes(location.pathname) 
          ? prevPages 
          : [...prevPages, location.pathname]
      );
    }
  }, [location.pathname, hasVisited, setVisitedPages]);

  return (
    <AnimatePresence mode="wait">
      {!hasVisited ? (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      ) : (
        <div key={location.pathname}>{children}</div>
      )}
    </AnimatePresence>
  );
}
