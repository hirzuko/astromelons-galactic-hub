import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingWindowProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

const FloatingWindow = ({ title, children, delay = 0 }: FloatingWindowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="floating-window"
    >
      {/* Window header */}
      <div className="window-header">
        <div className="window-dot bg-red-500" />
        <div className="window-dot bg-yellow-500" />
        <div className="window-dot bg-green-500" />
        <span className="ml-4 text-sm font-orbitron text-muted-foreground tracking-wider">
          {title}
        </span>
      </div>

      {/* Window content */}
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};

export default FloatingWindow;
