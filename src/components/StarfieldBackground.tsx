import { motion } from "framer-motion";
import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  trailLength: number;
}

const StarfieldBackground = () => {
  // Diagonal falling stars (top-right to bottom-left)
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 + 20, // Start more to the right
      size: Math.random() * 2 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.8 + 0.2,
      trailLength: Math.random() * 40 + 20, // Trail length
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

      {/* Diagonal falling stars with trails (top-right to bottom-left) */}
      {stars.map((star) => (
        <motion.div
          key={`fall-${star.id}`}
          className="absolute"
          style={{
            left: `${star.x}%`,
            width: star.size,
            height: star.trailLength,
            transformOrigin: 'top center',
            transform: 'rotate(-45deg)', // Diagonal angle
          }}
          initial={{ 
            x: "20vw",
            y: "-15vh", 
            opacity: 0 
          }}
          animate={{
            x: "-120vw",
            y: "120vh",
            opacity: [0, star.opacity, star.opacity, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear",
          }}
        >
          {/* Star head (bright point) */}
          <div 
            className="absolute top-0 left-0 rounded-full"
            style={{
              width: star.size,
              height: star.size,
              background: `radial-gradient(circle, hsl(186, 100%, 90%) 0%, hsl(186, 100%, 70%) 50%, transparent 100%)`,
              boxShadow: `0 0 ${star.size * 4}px hsla(186, 100%, 70%, 0.9), 0 0 ${star.size * 8}px hsla(186, 100%, 50%, 0.5)`,
            }}
          />
          {/* Trail effect */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: star.size * 0.5,
              height: star.trailLength,
              background: `linear-gradient(180deg, 
                hsla(186, 100%, 80%, 0.8) 0%, 
                hsla(210, 100%, 60%, 0.4) 30%,
                hsla(210, 100%, 50%, 0.1) 70%,
                transparent 100%
              )`,
              filter: `blur(${star.size * 0.3}px)`,
            }}
          />
        </motion.div>
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
