import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative w-24 h-24 mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M30,80 C30,80 20,40 50,20 C80,40 70,80 70,80 C70,80 75,85 80,80 C85,75 80,60 80,60 C80,60 90,40 50,10 C10,40 20,60 20,60 C20,60 15,75 20,80 C25,85 30,80 30,80 Z"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                className="animate-draw"
              />
            </svg>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="font-display text-2xl tracking-widest text-primary uppercase"
          >
            БУЛАТ
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
