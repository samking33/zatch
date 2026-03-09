import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LazySection } from "@/components/LazySection";
import { KineticHero } from "@/components/sections/KineticHero";
import { FullScreenScroll } from "@/components/sections/FullScreenScroll";
import { JoinSection } from "@/components/sections/JoinSection";
import { ForBuyers } from "@/components/sections/ForBuyers";
import { FAQ } from "@/components/sections/FAQ";
import { Trust } from "@/components/sections/Trust";
import { BuyerDownloadModal } from "@/components/BuyerDownloadModal";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { scrollToSection } from "@/lib/section-navigation";

type BuyerFeatureId = "live" | "discover" | "bargain";

export default function Home() {
  const [, setLocation] = useLocation();
  const [buyerDownloadOpen, setBuyerDownloadOpen] = useState(false);
  const [buyerFeatureRequest, setBuyerFeatureRequest] = useState<{ id: BuyerFeatureId; token: number } | null>(null);
  const { isMobileViewport } = useDeviceCapabilities();
  const useMobileSections = isMobileViewport;

  const openBuyerDownload = () => {
    setBuyerDownloadOpen(true);
  };

  const handleLearnMore = (featureId: BuyerFeatureId) => {
    setBuyerFeatureRequest({ id: featureId, token: Date.now() });
    scrollToSection("buyers");
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main>
        <KineticHero />
        <FullScreenScroll />
        <LazySection
          loader={() => import("@/components/sections/ThreeWays").then((mod) => mod.ThreeWays)}
          componentProps={{ onLearnMore: handleLearnMore }}
          rootMargin="400px 0px"
          fallback={<SectionFallback />}
        />
        <JoinSection onJoinBuyer={openBuyerDownload} />
        <ForBuyers onJoinBuyer={openBuyerDownload} requestedFeature={buyerFeatureRequest} />
        <LazySection
          loader={() =>
            useMobileSections
              ? import("@/components/sections/DealEngineMobile").then((mod) => mod.DealEngineMobile)
              : import("@/components/sections/DealEngine").then((mod) => mod.DealEngine)
          }
          componentProps={{ onStartSelling: () => setLocation("/join/seller") }}
          rootMargin="500px 0px"
          fallback={<SectionFallback />}
        />
        <LazySection
          loader={() =>
            useMobileSections
              ? import("@/components/sections/StickmanCTAStatic").then((mod) => mod.StickmanCTAStatic)
              : import("@/components/sections/StickmanCTA").then((mod) => mod.StickmanCTA)
          }
          rootMargin="500px 0px"
          fallback={<SectionFallback />}
        />
        <FAQ />
        <Trust onStartSelling={() => setLocation("/join/seller")} />
      </main>

      <Footer />

      <BuyerDownloadModal
        isOpen={buyerDownloadOpen}
        onClose={() => setBuyerDownloadOpen(false)}
      />
    </div>
  );
}

function SectionFallback() {
  return (
    <section className="py-20 md:py-28 bg-[#030303] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="h-28 rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse" />
      </div>
    </section>
  );
}
