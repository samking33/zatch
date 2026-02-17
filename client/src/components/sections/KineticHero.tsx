import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Play } from "lucide-react";

// Import generated assets (using duplicated array to fill grid)
import streamFashion from "@/assets/kinetic/stream-fashion.png";
import streamTech from "@/assets/kinetic/stream-tech.png";
import streamSneaker from "@/assets/kinetic/stream-sneaker.png";
import streamBeauty from "@/assets/kinetic/stream-beauty.png";

export function KineticHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  // Generate a grid of 50 items by repeating the base assets
  const gridItems = useMemo(() => {
    const baseImages = [streamFashion, streamTech, streamSneaker, streamBeauty];
    return Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      image: baseImages[i % baseImages.length],
      // Random "float" parameters for the scroll animation
      randomX: (Math.random() - 0.5) * 200, 
      randomY: -100 - Math.random() * 300, 
      randomRotate: (Math.random() - 0.5) * 30,
      scale: 0.8 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="h-[200vh] relative bg-black cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* The Grid */}
        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 p-1">
          {gridItems.map((item) => (
            <GridItem 
              key={item.id} 
              item={item} 
              scrollYProgress={scrollYProgress} 
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
        </div>

        {/* The Text Overlay */}
        <motion.div 
           style={{ 
              opacity: useTransform(smoothProgress, [0.1, 0.2], [1, 0]),
              scale: useTransform(smoothProgress, [0, 0.2], [1, 1.2]),
              filter: useTransform(smoothProgress, [0, 0.1], ["brightness(1) contrast(1)", "brightness(1.5) contrast(1.2)"]),
           }}
           className="absolute z-20 pointer-events-none text-center mix-blend-difference"
        >
           <h1 className="text-[12vw] font-bold font-display leading-[0.8] tracking-tighter text-white">
              CATCH IT<br/>
              MATCH IT<br/>
              <span className="relative inline-block text-primary italic pr-4">
                <span className="relative z-10">ZATCH</span>
                {/* Speed Lines Effect */}
                <span className="absolute top-1/2 -left-20 w-full h-[2px] bg-primary/50 -translate-y-1/2 blur-[1px]" />
                <span className="absolute top-[30%] -left-32 w-3/4 h-[1px] bg-primary/30 blur-[0.5px]" />
                <span className="absolute top-[70%] -left-24 w-4/5 h-[1.5px] bg-primary/40 blur-[0.5px]" />
                <span className="absolute inset-0 translate-x-1 translate-y-0 opacity-50 mix-blend-screen blur-[1px] skew-x-12 scale-x-110 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10"></span>
              </span> IT
           </h1>
        </motion.div>
        
        {/* Scroll CTA */}
        <motion.div 
           style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm uppercase tracking-widest animate-pulse pointer-events-none z-30"
        >
           Scroll to Explore
        </motion.div>

      </div>
    </section>
  );
}

function GridItem({ item, scrollYProgress, mouseX, mouseY }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

  // Floating / Shattering Animation - Adjusted for smoother feel
  const y = useTransform(smoothProgress, [0, 1], [0, item.randomY + "%"]);
  const x = useTransform(smoothProgress, [0, 1], [0, item.randomX + "%"]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, item.randomRotate]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  // Flashlight Effect Logic
  useEffect(() => {
     const checkHover = () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mX = mouseX.get();
        const mY = mouseY.get();
        
        // Check if mouse is near this item (within 100px radius)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(mX - centerX, 2) + Math.pow(mY - centerY, 2));
        
        setIsHovered(distance < 150);
     };

     // Subscribe to motion value changes
     const unsubscribeX = mouseX.on("change", checkHover);
     const unsubscribeY = mouseY.on("change", checkHover);

     return () => {
        unsubscribeX();
        unsubscribeY();
     };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ y, x, rotate, scale, opacity }}
      className={`relative w-full h-full overflow-hidden transition-all duration-300 ${isHovered ? 'z-10 scale-125 rounded-lg shadow-xl ring-2 ring-primary' : 'grayscale brightness-50 blur-[0.5px]'}`}
    >
       <img 
         src={item.image} 
         alt="Stream" 
         className="w-full h-full object-cover aspect-[9/16]"
       />
       
       {/* Live Indicator (Only on Hover) */}
       <div className={`absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase">Live</span>
       </div>
       
       {/* Play Icon Overlay */}
       {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
             <Play className="w-8 h-8 text-white fill-white opacity-80" />
          </div>
       )}
    </motion.div>
  )
}
