import { motion } from "framer-motion";
import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const StarfieldBackground = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 20,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  const staticStars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      twinkleDuration: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsla(210, 100%, 20%, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsla(186, 100%, 30%, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsla(270, 80%, 20%, 0.1) 0%, transparent 70%),
            hsl(220, 60%, 4%)
          `
        }}
      />

      {/* Static twinkling stars */}
      {staticStars.map((star) => (
        <motion.div
          key={`static-${star.id}`}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, star.size > 1.5 ? 1 : 0.7, 0.2],
          }}
          transition={{
            duration: star.twinkleDuration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Falling stars */}
      {stars.map((star) => (
        <motion.div
          key={`fall-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            width: star.size,
            height: star.size,
            background: `linear-gradient(180deg, hsl(186, 100%, 80%), hsl(210, 100%, 60%))`,
            boxShadow: `0 0 ${star.size * 2}px hsla(186, 100%, 50%, 0.6)`,
          }}
          initial={{ y: "-10vh", opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, star.opacity, star.opacity, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Nebula overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 30% 70%, hsla(270, 80%, 40%, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 70% 30%, hsla(186, 100%, 40%, 0.08) 0%, transparent 40%)
          `
        }}
      />
    </div>
  );
};

export default StarfieldBackground;
