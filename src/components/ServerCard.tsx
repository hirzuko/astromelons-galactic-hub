import { motion } from "framer-motion";
import { Copy, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface ServerCardProps {
  title: string;
  icon: LucideIcon;
  status: "online" | "offline" | "maintenance";
  ip?: string;
  description: string;
  playerCount?: number;
  maxPlayers?: number;
  delay?: number;
}

const ServerCard = ({
  title,
  icon: Icon,
  status,
  ip,
  description,
  playerCount,
  maxPlayers,
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

  const statusConfig = {
    online: {
      color: "bg-green-500",
      text: "Online",
      glow: "shadow-[0_0_10px_rgba(34,197,94,0.5)]",
    },
    offline: {
      color: "bg-red-500",
      text: "Offline",
      glow: "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    },
    maintenance: {
      color: "bg-yellow-500",
      text: "Maintenance",
      glow: "shadow-[0_0_10px_rgba(234,179,8,0.5)]",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card-hover p-6 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-border/50">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-orbitron font-semibold text-xl text-foreground">
              {title}
            </h3>
            {playerCount !== undefined && maxPlayers !== undefined && (
              <p className="text-sm text-muted-foreground font-exo">
                {playerCount}/{maxPlayers} Players
              </p>
            )}
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-3 h-3 rounded-full ${statusConfig[status].color} ${statusConfig[status].glow}`}
          />
          <span className="text-sm font-exo text-muted-foreground">
            {statusConfig[status].text}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground font-exo text-sm leading-relaxed">
        {description}
      </p>

      {/* IP Address */}
      {ip && (
        <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-4 py-3 border border-border/30">
          <code className="flex-1 text-accent font-mono text-sm">{ip}</code>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
          >
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </motion.button>
        </div>
      )}

      {/* Connect Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-auto w-full py-3 px-6 rounded-xl font-orbitron font-semibold text-sm tracking-wider
          bg-gradient-to-r from-primary to-accent text-accent-foreground
          hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-shadow duration-300
          relative overflow-hidden group"
      >
        <span className="relative z-10">CONNECT</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </motion.button>
    </motion.div>
  );
};

export default ServerCard;
