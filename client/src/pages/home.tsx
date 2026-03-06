import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { KineticHero } from "@/components/sections/KineticHero";
import { FullScreenScroll } from "@/components/sections/FullScreenScroll";
import { ThreeWays } from "@/components/sections/ThreeWays";
import { JoinSection } from "@/components/sections/JoinSection";
import { ForBuyers } from "@/components/sections/ForBuyers";
import { DealEngine } from "@/components/sections/DealEngine";
import { StickmanCTA } from "@/components/sections/StickmanCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Trust } from "@/components/sections/Trust";
import { BuyerDownloadModal } from "@/components/BuyerDownloadModal";

export default function Home() {
  const [, setLocation] = useLocation();
  const [buyerDownloadOpen, setBuyerDownloadOpen] = useState(false);

  const openBuyerDownload = () => {
    setBuyerDownloadOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main>
        <KineticHero />
        <FullScreenScroll />
        <ThreeWays />
        <JoinSection onJoinBuyer={openBuyerDownload} />
        <ForBuyers onJoinBuyer={openBuyerDownload} />
        <DealEngine onStartSelling={() => setLocation("/join/seller")} />
        <StickmanCTA />
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
