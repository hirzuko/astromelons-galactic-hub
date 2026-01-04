import { motion } from "framer-motion";
import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface ServerCardProps {
  title: string;
  icon: LucideIcon;
  ip?: string;
  description: string;
  delay?: number;
}

const ServerCard = ({
  title,
  icon: Icon,
  ip,
  description,
  delay = 0,
}: ServerCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (ip) {
      navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card-hover p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 w-full max-w-full overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-border/50">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
        </div>
        <h3 className="font-orbitron font-semibold text-lg sm:text-xl text-foreground break-words">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-muted-foreground font-exo text-sm leading-relaxed break-words">
        {description}
      </p>

      {/* IP Address */}
      {ip && (
        <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 border border-border/30 w-full min-w-0">
          <code className="flex-1 text-accent font-mono text-xs sm:text-sm break-all overflow-wrap-anywhere min-w-0">{ip}</code>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors flex-shrink-0"
          >
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default ServerCard;
