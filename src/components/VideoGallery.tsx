import { motion } from "framer-motion";
import FloatingWindow from "./FloatingWindow";
import { Play, Video as VideoIcon } from "lucide-react";
import { useState } from "react";

// Dynamic video data - add new entries here and they automatically appear
const videos = [
  {
    id: 1,
    title: "Server Launch Trailer",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "2:34",
  },
  {
    id: 2,
    title: "Community Highlights",
    thumbnail: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=400&q=80",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    duration: "5:12",
  },
];

const VideoGallery = () => {
  const [playingVideo, setPlayingVideo] = useState<typeof videos[0] | null>(null);

  return (
    <>
      <FloatingWindow title="media.player" delay={0.6}>
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <VideoIcon className="w-12 h-12 mb-4 opacity-50" />
            <p className="font-exo">No videos available</p>
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
                <img
                  src={video.thumbnail}
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
              src={playingVideo.videoUrl}
              controls
              autoPlay
              className="w-full aspect-video bg-background"
            />
            <div className="p-4 bg-card border-t border-border/30">
              <h3 className="font-orbitron text-foreground">{playingVideo.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default VideoGallery;
