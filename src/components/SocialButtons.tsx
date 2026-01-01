import { motion } from "framer-motion";
import { MessageCircle, Users } from "lucide-react";

const SocialButtons = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="py-12"
    >
      <div className="text-center mb-8">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground mb-2">
          JOIN THE <span className="gradient-text">COMMUNITY</span>
        </h2>
        <p className="text-muted-foreground font-exo">
          Connect with fellow explorers
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Discord Button */}
        <motion.a
          href="https://discord.gg/astromelons"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl
            bg-[#5865F2] text-foreground font-orbitron font-semibold tracking-wider
            overflow-hidden transition-all duration-300
            hover:shadow-[0_0_40px_rgba(88,101,242,0.5)]"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#7289da] to-[#5865F2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <MessageCircle className="w-6 h-6 relative z-10" />
          <span className="relative z-10">JOIN DISCORD</span>
          <div className="absolute -inset-1 bg-[#5865F2] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
        </motion.a>

        {/* Member count badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass-card px-6 py-3 flex items-center gap-3"
        >
          <Users className="w-5 h-5 text-accent" />
          <div className="text-left">
            <p className="font-orbitron text-lg font-bold text-foreground">1,247</p>
            <p className="text-xs text-muted-foreground font-exo">Members Online</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SocialButtons;
