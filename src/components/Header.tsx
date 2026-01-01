import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 py-8 px-6"
    >
      <div className="container mx-auto flex items-center justify-center gap-4">
        {/* Logo placeholder */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-border">
            <Rocket className="w-8 h-8 text-foreground" />
          </div>
          <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent rounded-2xl blur-lg opacity-50 -z-10" />
        </motion.div>

        {/* Title */}
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-orbitron font-bold tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="gradient-text">ASTRO</span>
            <span className="text-foreground neon-text">MELONS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground font-exo text-lg tracking-widest mt-2"
          >
            EXPLORE • SURVIVE • THRIVE
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
