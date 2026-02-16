import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import generated assets
import sneaker from "@/assets/tunnel/sneaker.png";
import headphones from "@/assets/tunnel/headphones.png";
import watch from "@/assets/tunnel/watch.png";
import controller from "@/assets/tunnel/controller.png";

export function TunnelHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });
  
  // Phase 1: "THE FUTURE..."
  const text1Scale = useTransform(smoothProgress, [0, 0.25], [1, 15]);
  const text1Opacity = useTransform(smoothProgress, [0, 0.2, 0.25], [1, 1, 0]);
  // Removed heavy blur filter for performance
  // const text1Blur = useTransform(smoothProgress, [0.15, 0.25], [0, 20]); 

  // Phase 2: Ring of Phones/Products & "...IS LIVE"
  // Extended range for more fly-by time
  const ringScale = useTransform(smoothProgress, [0.15, 0.65], [0.2, 8]); 
  const ringOpacity = useTransform(smoothProgress, [0.15, 0.3, 0.6], [0, 1, 0]);
  
  const text2Scale = useTransform(smoothProgress, [0.25, 0.6], [0.5, 12]);
  const text2Opacity = useTransform(smoothProgress, [0.25, 0.5, 0.6], [0, 1, 0]);

  // Phase 3: Zatch App Interface
  const appScale = useTransform(smoothProgress, [0.6, 1], [0.2, 1]);
  const appOpacity = useTransform(smoothProgress, [0.6, 0.7, 1], [0, 1, 1]);
  const bgOpacity = useTransform(smoothProgress, [0.8, 1], [0, 1]);

  // Warp Speed Effect - Optimized
  const warpOpacity = useTransform(smoothProgress, [0, 0.8], [0.3, 0]);
  const warpScale = useTransform(smoothProgress, [0, 0.8], [1, 3]);

  // Generate more products for the spiral
  const products = useMemo(() => {
    const baseProducts = [sneaker, headphones, watch, controller];
    // Create 12 items
    return [...baseProducts, ...baseProducts, ...baseProducts].map((img, i) => ({
      img,
      // Spiral distribution
      angle: i * (360 / 12), 
      radius: 350 + (i * 20), // Varying radius for depth perception
      zOffset: i * 50, // Slight z-offset (simulated by scale delay in standard CSS/Framer transform)
    }));
  }, []);

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[100px] will-change-transform">
        
        {/* Optimized Background */}
        <motion.div 
          style={{ opacity: warpOpacity, scale: warpScale }}
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-10" />
          {/* Static star field is faster than animated one */}
          <div className="w-full h-full bg-[url('https://assets.codepen.io/1462889/star-field.png')] bg-repeat opacity-20" />
          {/* Hardware accelerated spin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(199,240,79,0.05)_180deg,transparent_360deg)] animate-[spin_4s_linear_infinite]" />
        </motion.div>

        {/* Phase 1: THE FUTURE */}
        <motion.div 
          style={{ scale: text1Scale, opacity: text1Opacity }}
          className="absolute z-10 text-center pointer-events-none will-change-transform"
        >
          <h1 className="text-[12vw] font-bold font-display tracking-tighter text-white leading-none">
            THE FUTURE
          </h1>
        </motion.div>

        {/* Phase 2: Spiral of Objects */}
        <motion.div 
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="absolute z-20 w-full h-full flex items-center justify-center pointer-events-none will-change-transform"
        >
           {products.map((item, i) => (
             <motion.div
               key={i}
               className="absolute w-[15vw] h-[15vw] flex items-center justify-center"
               style={{
                 rotate: item.angle,
                 x: Math.cos(item.angle * (Math.PI / 180)) * item.radius,
                 y: Math.sin(item.angle * (Math.PI / 180)) * item.radius,
               }}
             >
               <img 
                 src={item.img} 
                 alt="Product" 
                 className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(199,240,79,0.2)]"
               />
             </motion.div>
           ))}
           
           <motion.h2 
             style={{ scale: text2Scale, opacity: text2Opacity }}
             className="text-[15vw] font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary tracking-tighter absolute will-change-transform"
           >
             IS LIVE
           </motion.h2>
        </motion.div>

        {/* Phase 3: The App Interface */}
        <motion.div 
          style={{ scale: appScale, opacity: appOpacity }}
          className="relative z-30 w-full max-w-sm aspect-[9/19] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/20 will-change-transform"
        >
            {/* Screen Content */}
            <div className="absolute inset-0 bg-zinc-900">
                <div className="relative h-full w-full">
                    {/* Live Stream */}
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-black">
                        <div className="w-full h-full opacity-60 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
                    
                    {/* UI Overlay */}
                    <div className="absolute top-14 left-6 right-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-2 border-primary p-0.5">
                            <div className="w-full h-full rounded-full bg-zinc-700 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop')] bg-cover" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">SneakerHead</p>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-white/80 text-xs">Live</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-white text-xs font-bold">1.2k</span>
                    </div>
                    </div>

                    {/* Action Area */}
                    <div className="absolute bottom-8 left-6 right-6">
                       <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex items-center justify-between gap-4">
                          <div>
                             <p className="text-white/50 text-xs uppercase font-bold">Current Ask</p>
                             <p className="text-primary text-xl font-bold">₹2,499</p>
                          </div>
                          <Button className="flex-1 bg-primary text-black font-bold h-12 rounded-xl">
                             ZATCH DEAL
                          </Button>
                       </div>
                    </div>
                </div>
            </div>
            
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
        </motion.div>

        {/* Final CTA Overlay (Fades in at the end) */}
        <motion.div 
           style={{ opacity: bgOpacity }}
           className="absolute bottom-12 left-0 right-0 z-40 text-center pointer-events-auto"
        >
           <h3 className="text-2xl font-display font-bold text-white mb-6">Ready to warp speed?</h3>
           <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-primary text-black font-bold px-8 rounded-full hover:scale-105 transition-transform">
                 Download App
              </Button>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
