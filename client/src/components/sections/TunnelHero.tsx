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
  
  // Phase 1: "THE FUTURE..." (0 - 0.2)
  const text1Scale = useTransform(smoothProgress, [0, 0.2], [1, 25]);
  const text1Opacity = useTransform(smoothProgress, [0, 0.15, 0.2], [1, 1, 0]);

  // Phase 2: Scattered Objects (0.15 - 0.7)
  // Products fly past from 0.15 to 0.7
  const scatterScale = useTransform(smoothProgress, [0.15, 0.7], [0.1, 8]); 
  const scatterOpacity = useTransform(smoothProgress, [0.15, 0.3, 0.65, 0.7], [0, 1, 1, 0]);
  
  const text2Scale = useTransform(smoothProgress, [0.2, 0.6], [0.5, 12]);
  const text2Opacity = useTransform(smoothProgress, [0.2, 0.45, 0.6], [0, 1, 0]);

  // Phase 3: Zatch App Interface (0.75 - 1.0)
  // Appears AFTER products are gone
  const appScale = useTransform(smoothProgress, [0.75, 1], [0.5, 1]);
  const appOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);
  const bgOpacity = useTransform(smoothProgress, [0.9, 1], [0, 1]);

  // Warp Speed Effect
  const warpOpacity = useTransform(smoothProgress, [0, 0.8], [0.4, 0]);
  const warpScale = useTransform(smoothProgress, [0, 0.8], [1, 4]);

  // Generate scattered products
  const products = useMemo(() => {
    const baseProducts = [sneaker, headphones, watch, controller];
    // Create 20 items for a denser field
    return Array.from({ length: 20 }).map((_, i) => {
      const img = baseProducts[i % baseProducts.length];
      // Random scattering logic
      const angle = Math.random() * 360;
      const radius = 200 + Math.random() * 400; // Random distance from center
      const zDelay = Math.random() * 0.5; // Random depth offset
      
      return {
        img,
        x: Math.cos(angle * (Math.PI / 180)) * radius,
        y: Math.sin(angle * (Math.PI / 180)) * radius,
        rotate: Math.random() * 360,
        scaleOffset: 0.5 + Math.random() * 1, // Varying sizes
      };
    });
  }, []);

  return (
    // Increased height to 600vh to slow down the scroll speed
    <section ref={containerRef} className="h-[600vh] relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[100px] will-change-transform">
        
        {/* Optimized Background */}
        <motion.div 
          style={{ opacity: warpOpacity, scale: warpScale }}
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-10" />
          <div className="w-full h-full bg-[url('https://assets.codepen.io/1462889/star-field.png')] bg-repeat opacity-20" />
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

        {/* Phase 2: Scattered Objects */}
        <motion.div 
          style={{ scale: scatterScale, opacity: scatterOpacity }}
          className="absolute z-20 w-full h-full flex items-center justify-center pointer-events-none will-change-transform"
        >
           {products.map((item, i) => (
             <motion.div
               key={i}
               className="absolute w-[15vw] h-[15vw] flex items-center justify-center"
               style={{
                 x: item.x,
                 y: item.y,
                 rotate: item.rotate,
                 scale: item.scaleOffset
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

        {/* Phase 3: The App Interface - Appears independently at end */}
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
