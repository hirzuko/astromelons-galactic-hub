import { motion } from "framer-motion";
import FloatingWindow from "./FloatingWindow";
import { Play, Video as VideoIcon, ImageOff, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Video {
  id: string;
  filename: string;
  thumbnail: string;
  title: string;
  duration: string;
}

// Cache busting helper - appends timestamp to bypass browser cache
const getCacheBustedUrl = (path: string) => {
  return `${path}?v=${Date.now()}`;
};

const ThumbnailWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className={`${className} bg-card/50 flex items-center justify-center`}>
        <div className="text-center text-muted-foreground p-2">
          <ImageOff className="w-6 h-6 mx-auto mb-1" />
          <span className="text-[10px] leading-tight block">Thumbnail not found</span>
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

const VideoGallery = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
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
        setVideos(data.videos || []);
        setError(null);
      } catch (err) {
        console.error('Error loading manifest:', err);
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchManifest();
  }, []);

  const getThumbnailUrl = (thumbnail: string) => {
    return getCacheBustedUrl(`./videos/${thumbnail}`);
  };

  const getVideoUrl = (filename: string) => {
    return getCacheBustedUrl(`./videos/${filename}`);
  };

  return (
    <>
      <FloatingWindow title="media.player" delay={0.6}>
        <div className="flex items-center gap-2 mb-4">
          <VideoIcon className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground font-mono">
            videos.stream() — {videos.length} items
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <span className="ml-2 text-muted-foreground">Loading videos...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-muted-foreground">
            <VideoIcon className="w-8 h-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <VideoIcon className="w-12 h-12 mb-4 opacity-50" />
            <p className="font-exo">No videos available</p>
            <p className="text-xs mt-1">Add entries to manifest.json</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.15, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setPlayingVideo(video)}
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-border/30"
              >
                <ThumbnailWithFallback
                  src={getThumbnailUrl(video.thumbnail)}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300" />
                
                {/* Play button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.5)]">
                    <Play className="w-7 h-7 text-accent-foreground ml-1" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent">
                  <div className="flex items-center justify-between">
                    <p className="font-exo text-sm text-foreground truncate">
                      {video.title}
                    </p>
                    <span className="text-xs font-mono text-muted-foreground bg-secondary/80 px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </FloatingWindow>

      {/* Video Player Modal */}
      {playingVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPlayingVideo(null)}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-border/50 neon-border"
          >
            <video
              src={getVideoUrl(playingVideo.filename)}
              controls
              autoPlay
              className="w-full aspect-video bg-background"
            />
            <div className="p-4 bg-card border-t border-border/30">
              <h3 className="font-orbitron text-foreground">{playingVideo.title}</h3>
              <p className="text-sm text-muted-foreground">Duration: {playingVideo.duration}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default VideoGallery;
