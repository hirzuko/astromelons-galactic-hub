import { motion, AnimatePresence } from "framer-motion";
import FloatingWindow from "./FloatingWindow";
import { Image as ImageIcon, ExternalLink, ImageOff, Loader2, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Screenshot {
  id: string;
  filename: string;
  title: string;
  description: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

// Cache busting helper - appends timestamp to bypass browser cache
const getCacheBustedUrl = (path: string) => {
  return `${path}?v=${Date.now()}`;
};

const ImageWithFallback = ({ src, alt, className, onLoad }: { src: string; alt: string; className?: string; onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void }) => {
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
      onLoad={onLoad}
    />
  );
};

const ScreenshotGallery = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);
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

  const handleImageSelect = useCallback((screenshot: Screenshot) => {
    setImageDimensions(null);
    setSelectedImage(screenshot);
  }, []);

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
    setImageDimensions(null);
  }, []);

  // Calculate modal dimensions based on image aspect ratio
  const getModalStyle = () => {
    if (!imageDimensions) {
      return { maxWidth: '90vw', maxHeight: '90vh' };
    }
    
    const aspectRatio = imageDimensions.width / imageDimensions.height;
    const maxW = window.innerWidth * 0.9;
    const maxH = window.innerHeight * 0.9;
    
    let width, height;
    
    if (aspectRatio > maxW / maxH) {
      // Image is wider than viewport ratio
      width = Math.min(imageDimensions.width, maxW);
      height = width / aspectRatio;
    } else {
      // Image is taller than viewport ratio
      height = Math.min(imageDimensions.height, maxH);
      width = height * aspectRatio;
    }
    
    return {
      width: `${width}px`,
      height: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh'
    };
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
                onClick={() => handleImageSelect(screenshot)}
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

      {/* Adaptive Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                ...getModalStyle()
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-xl shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.15)' }}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background/80 hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Image */}
              <ImageWithFallback
                src={getImageUrl(selectedImage.filename)}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
                onLoad={handleImageLoad}
              />

              {/* Info overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 via-background/60 to-transparent"
              >
                <p className="font-orbitron text-foreground">{selectedImage.title}</p>
                <p className="text-sm text-muted-foreground">{selectedImage.description}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenshotGallery;
