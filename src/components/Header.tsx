import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 py-8 px-4 w-full overflow-hidden"
    >
      <div className="w-full max-w-full mx-auto">
        {/* Title - Perfectly Centered */}
        <div className="w-full text-center mx-auto">
          <motion.h1
            className="text-[clamp(1.75rem,8vw,4.5rem)] font-orbitron font-bold tracking-wider w-full break-words overflow-wrap-anywhere"
            style={{ textWrap: 'balance' }}
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
            className="text-muted-foreground font-exo text-sm sm:text-base md:text-lg tracking-widest mt-2 break-words"
          >
            EXPLORE • SURVIVE • THRIVE
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
