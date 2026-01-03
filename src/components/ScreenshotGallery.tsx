import { motion } from "framer-motion";
import FloatingWindow from "./FloatingWindow";
import { Image as ImageIcon, ExternalLink, ImageOff } from "lucide-react";
import { useState } from "react";

// Dynamic screenshot data - add new entries here and they automatically appear
const screenshots = [
  {
    id: 1,
    title: "Base Construction",
    thumbnail: "/photos/base-construction-thumb.jpg",
    fullsize: "/photos/base-construction.jpg",
  },
  {
    id: 2,
    title: "Space Exploration",
    thumbnail: "/photos/space-exploration-thumb.jpg",
    fullsize: "/photos/space-exploration.jpg",
  },
  {
    id: 3,
    title: "Mining Operations",
    thumbnail: "/photos/mining-operations-thumb.jpg",
    fullsize: "/photos/mining-operations.jpg",
  },
  {
    id: 4,
    title: "Team Adventures",
    thumbnail: "/photos/team-adventures-thumb.jpg",
    fullsize: "/photos/team-adventures.jpg",
  },
  {
    id: 5,
    title: "Planet Discovery",
    thumbnail: "/photos/planet-discovery-thumb.jpg",
    fullsize: "/photos/planet-discovery.jpg",
  },
  {
    id: 6,
    title: "Night Sky",
    thumbnail: "/photos/night-sky-thumb.jpg",
    fullsize: "/photos/night-sky.jpg",
  },
];

const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className={`${className} bg-card/50 flex items-center justify-center`}>
        <div className="text-center text-muted-foreground p-2">
          <ImageOff className="w-6 h-6 mx-auto mb-1" />
          <span className="text-[10px] leading-tight block">Add to public{src}</span>
        </div>
      </div>
    );
  }
  
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

const ScreenshotGallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof screenshots[0] | null>(null);
  return (
    <>
      <FloatingWindow title="screenshots.gallery" delay={0.4}>
        {screenshots.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
            <p className="font-exo">No screenshots available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                onClick={() => setSelectedImage(screenshot)}
                className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group border border-border/30"
              >
                <ImageWithFallback
                  src={screenshot.thumbnail}
                  alt={screenshot.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-exo text-foreground truncate">
                    {screenshot.title}
                  </p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-4 h-4 text-accent" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </FloatingWindow>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden border border-border/50 neon-border"
          >
            <ImageWithFallback
              src={selectedImage.fullsize}
              alt={selectedImage.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
              <p className="font-orbitron text-foreground">{selectedImage.title}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ScreenshotGallery;
