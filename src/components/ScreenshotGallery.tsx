import { motion } from "framer-motion";
import FloatingWindow from "./FloatingWindow";
import { Image as ImageIcon, ExternalLink } from "lucide-react";
import { useState } from "react";

// Dynamic screenshot data - add new entries here and they automatically appear
const screenshots = [
  {
    id: 1,
    title: "Base Construction",
    thumbnail: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&q=80",
    fullsize: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1200&q=80",
  },
  {
    id: 2,
    title: "Space Exploration",
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    fullsize: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80",
  },
  {
    id: 3,
    title: "Mining Operations",
    thumbnail: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400&q=80",
    fullsize: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1200&q=80",
  },
  {
    id: 4,
    title: "Team Adventures",
    thumbnail: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&q=80",
    fullsize: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1200&q=80",
  },
  {
    id: 5,
    title: "Planet Discovery",
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    fullsize: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80",
  },
  {
    id: 6,
    title: "Night Sky",
    thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=80",
    fullsize: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
  },
];

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
                <img
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
            <img
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
