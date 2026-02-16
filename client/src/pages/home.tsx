import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { KineticHero } from "@/components/sections/KineticHero";
import { FullScreenScroll } from "@/components/sections/FullScreenScroll";
import { ThreeWays } from "@/components/sections/ThreeWays";
import { ForBuyers } from "@/components/sections/ForBuyers";
import { ForSellers } from "@/components/sections/ForSellers";
import { FAQ } from "@/components/sections/FAQ";
import { Trust } from "@/components/sections/Trust";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main>
        <KineticHero />
        <FullScreenScroll />
        <ThreeWays />
        <ForBuyers />
        <ForSellers />
        <FAQ />
        <Trust />
      </main>

      <Footer />
    </div>
  );
}
