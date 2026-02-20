import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { KineticHero } from "@/components/sections/KineticHero";
import { FullScreenScroll } from "@/components/sections/FullScreenScroll";
import { ThreeWays } from "@/components/sections/ThreeWays";
import { ForBuyers } from "@/components/sections/ForBuyers";
import { ForSellers } from "@/components/sections/ForSellers";
import { StickmanCTA } from "@/components/sections/StickmanCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Trust } from "@/components/sections/Trust";
import { WaitlistModal } from "@/components/WaitlistModal";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistRole, setWaitlistRole] = useState<"buyer" | "seller">("buyer");

  const openWaitlist = (role: "buyer" | "seller" = "buyer") => {
    setWaitlistRole(role);
    setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main>
        <KineticHero />
        <FullScreenScroll />
        <ThreeWays />
        <ForBuyers onJoinWaitlist={() => openWaitlist("buyer")} />
        <ForSellers onJoinWaitlist={() => openWaitlist("seller")} />
        <StickmanCTA />
        <FAQ />
        <Trust />
      </main>

      <Footer />

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        defaultRole={waitlistRole}
      />
    </div>
  );
}
