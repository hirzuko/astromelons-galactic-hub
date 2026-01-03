import { motion } from "framer-motion";
import FloatingWindow from "./FloatingWindow";
import { Image as ImageIcon, ExternalLink, ImageOff, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Screenshot {
  id: string;
  filename: string;
  title: string;
  description: string;
}

// Cache busting helper - appends timestamp to bypass browser cache
const getCacheBustedUrl = (path: string) => {
  return `${path}?v=${Date.now()}`;
};

const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className={`${className} bg-card/50 flex items-center justify-center`}>
        <div className="text-center text-muted-foreground p-2">
          <ImageOff className="w-6 h-6 mx-auto mb-1" />
          <span className="text-[10px] leading-tight block">Image not found</span>
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
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        setLoading(true);
        // Fetch manifest with cache busting
        const response = await fetch(getCacheBustedUrl('./manifest.json'));
        if (!response.ok) {
          throw new Error('Failed to load manifest');
        }
        const data = await response.json();
        setScreenshots(data.screenshots || []);
        setError(null);
      } catch (err) {
        console.error('Error loading manifest:', err);
        setError('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchManifest();
  }, []);

  const getImageUrl = (filename: string) => {
    return getCacheBustedUrl(`./photos/${filename}`);
  };

  return (
    <>
      <FloatingWindow title="screenshots.gallery" delay={0.4}>
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground font-mono">
            gallery.render() — {screenshots.length} items
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <span className="ml-2 text-muted-foreground">Loading gallery...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-muted-foreground">
            <ImageOff className="w-8 h-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        ) : screenshots.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
            <p className="font-exo">No screenshots available</p>
            <p className="text-xs mt-1">Add entries to manifest.json</p>
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
                  src={getImageUrl(screenshot.filename)}
                  alt={screenshot.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-exo text-foreground truncate">
                    {screenshot.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {screenshot.description}
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
              src={getImageUrl(selectedImage.filename)}
              alt={selectedImage.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
              <p className="font-orbitron text-foreground">{selectedImage.title}</p>
              <p className="text-sm text-muted-foreground">{selectedImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ScreenshotGallery;
