import { Helmet, HelmetProvider } from "react-helmet-async";
import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import ServerCard from "@/components/ServerCard";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import VideoGallery from "@/components/VideoGallery";
import SocialButtons from "@/components/SocialButtons";
import { Pickaxe, Rocket } from "lucide-react";

const Index = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Astromelons | Minecraft & Astroneer Gaming Community</title>
        <meta
          name="description"
          content="Join Astromelons, an immersive gaming community for Minecraft and Astroneer. Explore, survive, and thrive with fellow space explorers."
        />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <StarfieldBackground />

        <div className="relative z-10">
          <Header />

          <main className="container mx-auto px-4 py-8 space-y-12">
            {/* Server Cards Section */}
            <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <ServerCard
                title="Minecraft Server"
                icon={Pickaxe}
                status="online"
                ip="play.astromelons.com"
                description="Explore our custom survival world with unique plugins, events, and an amazing community. Build, mine, and create together!"
                playerCount={47}
                maxPlayers={100}
                delay={0.2}
              />
              <ServerCard
                title="Astroneer Server"
                icon={Rocket}
                status="online"
                ip="astro.astromelons.com:8766"
                description="Join our dedicated Astroneer server for co-op space exploration. Discover new planets and build bases with friends!"
                playerCount={12}
                maxPlayers={24}
                delay={0.3}
              />
            </section>

            {/* Media Section */}
            <section className="max-w-5xl mx-auto space-y-8">
              <ScreenshotGallery />
              <VideoGallery />
            </section>

            {/* Social Section */}
            <SocialButtons />

            {/* Footer */}
            <footer className="text-center py-8 border-t border-border/30">
              <p className="text-muted-foreground font-exo text-sm">
                © 2024 Astromelons Community. All rights reserved.
              </p>
              <p className="text-muted-foreground/60 font-exo text-xs mt-2">
                Made with 💜 for the cosmos
              </p>
            </footer>
          </main>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Index;
