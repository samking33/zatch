import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, DollarSign, MessageCircle, X, Check, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

// Import generated textures
import shatteredGlass from "@/assets/textures/shattered-glass.png";
import circuitPattern from "@/assets/textures/circuit-pattern.png";

type Bubble = {
  id: number;
  x: number;
  y: number;
  text: string;
};

const ANXIETY_TEXTS = ["Price??", "Available?", "Last price??", "Pls reply fast"];

export function ForSellers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // --- Left Card (Anxiety) State ---
  const leftCardRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const bubbleIdCounter = useRef(0);

  const handleLeftMouseMove = useCallback((e: React.MouseEvent) => {
    // Disable on mobile
    if (window.innerWidth < 768) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const currentTime = Date.now();

    const dx = currentX - lastMousePos.current.x;
    const dy = currentY - lastMousePos.current.y;
    const dt = currentTime - lastMousePos.current.time;

    if (dt > 0) {
      const velocity = Math.sqrt(dx * dx + dy * dy) / dt;
      
      // Threshold for "fast" movement
      if (velocity > 1.2) {
        setBubbles((prev) => {
          if (prev.length >= 15) return prev; // Limit max bubbles
          
          const rect = leftCardRef.current?.getBoundingClientRect();
          if (!rect) return prev;

          // Spawn near cursor relative to card
          const spawnX = currentX - rect.left + (Math.random() - 0.5) * 60;
          const spawnY = currentY - rect.top + (Math.random() - 0.5) * 60;

          const newBubble: Bubble = {
            id: bubbleIdCounter.current++,
            x: spawnX,
            y: spawnY,
            text: ANXIETY_TEXTS[Math.floor(Math.random() * ANXIETY_TEXTS.length)],
          };

          return [...prev, newBubble];
        });
      }
    }

    lastMousePos.current = { x: currentX, y: currentY, time: currentTime };
  }, []);

  // Cleanup bubbles after they fade out
  useEffect(() => {
    if (bubbles.length === 0) return;
    const interval = setInterval(() => {
        setBubbles(prev => prev.slice(1));
    }, 400); // Stagger removal
    return () => clearInterval(interval);
  }, [bubbles]);

  // --- Right Card (Flow) State ---
  const rightCardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleRightMouseMove = (e: React.MouseEvent) => {
    const rect = rightCardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const [isHoveringLive, setIsHoveringLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(124);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHoveringLive) {
      setViewerCount(124);
      interval = setInterval(() => {
        setViewerCount(prev => {
          if (prev >= 890) {
            clearInterval(interval);
            return 890;
          }
          return prev + Math.floor(Math.random() * 40) + 15;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isHoveringLive]);

  const [isHoveringPayment, setIsHoveringPayment] = useState(false);

  // Background spotlight for right card
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(57, 255, 20, 0.08), transparent 80%)`
  );

  return (
    <section id="sellers" ref={ref} className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 relative z-10">
              <span className="block text-white drop-shadow-[0_0_15px_rgba(57,255,20,0.8)] [text-shadow:0_0_20px_#39FF14]">Your DMs Are Not</span>
              <span className="block text-white drop-shadow-[0_0_15px_rgba(57,255,20,0.8)] [text-shadow:0_0_20px_#39FF14]">a Sales System.</span>
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
              Stop managing conversations. Start closing deals.
            </p>
          </motion.div>
        </div>

        {/* Comparison Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-24 max-w-6xl mx-auto relative items-stretch z-10">
          
          {/* Minimalist Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[calc(50%-2rem)] -translate-y-1/2 z-0 w-16 h-[1px]">
             <div className="w-full h-full bg-gradient-to-r from-red-500/40 via-yellow-500/40 to-[#39FF14]/40" />
          </div>

          {/* LEFT CARD: The Old Way */}
          <motion.div
            ref={leftCardRef}
            onMouseMove={handleLeftMouseMove}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative p-10 md:p-14 rounded-[2rem] bg-[#0A0505] border border-white/[0.03] overflow-hidden transition-all duration-700 group/left"
          >
            {/* Extremely subtle red corner glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/[0.02] blur-[100px] pointer-events-none rounded-full" />
            
            {/* Elegant Shattered Glass Texture */}
            <div className="absolute inset-[-10%] opacity-[0.15] mix-blend-screen pointer-events-none z-0 transition-opacity duration-700 group-hover/left:opacity-[0.25]">
               <img src={shatteredGlass} alt="" className="w-full h-full object-cover grayscale brightness-200" />
            </div>

            {/* Anxiety Bubbles - Kept but made more elegant */}
            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  initial={{ opacity: 0, scale: 0.8, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -40 }}
                  exit={{ opacity: 0, scale: 0.9, y: -60 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute pointer-events-none px-3 py-1.5 rounded-md bg-[#110505] border border-red-900/30 text-red-400/80 text-[11px] uppercase tracking-wider font-mono shadow-xl z-50 whitespace-nowrap"
                  style={{ left: bubble.x, top: bubble.y }}
                >
                  {bubble.text}
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="relative z-30">
               {/* Minimalist Icon */}
               <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20 shadow-[inset_0_0_15px_rgba(239,68,68,0.05)] transition-transform duration-500 group-hover/left:scale-105">
                  <X className="w-4 h-4 text-red-500" strokeWidth={2.5} />
               </div>
               
               {/* Elegant Typography */}
               <h4 className="text-[2rem] font-medium text-[#f87171] mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(248,113,113,0.3)]">The Old Way</h4>
               <p className="text-red-900/80 font-medium mb-12 text-sm tracking-wide">Chaos & Manual Work</p>
               
               <ul className="space-y-6">
                 {[
                   "Closing one sale takes 15+ mins",
                   { text: "Endless DM back & forth", glitch: true },
                   "Chasing payments manually",
                   "Ghosted by buyers constantly"
                 ].map((item, i) => {
                   const isGlitch = typeof item === 'object' && item.glitch;
                   const text = typeof item === 'object' ? item.text : item;
                   
                   return (
                     <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                        className="flex items-center gap-4 text-[#888] font-normal group transition-colors duration-300"
                     >
                       <div className="w-6 h-6 rounded-full bg-red-500/5 flex items-center justify-center shrink-0 border border-red-500/10 transition-colors duration-300 group-hover:border-red-500/30">
                         <X className="w-3 h-3 text-red-500/50 group-hover:text-red-500" strokeWidth={2} />
                       </div>
                       <span className={`text-[15px] transition-all ${isGlitch ? 'hover:animate-text-glitch cursor-crosshair text-red-400/80' : ''}`}>
                         {text}
                       </span>
                     </motion.li>
                   );
                 })}
               </ul>
            </div>
          </motion.div>

          {/* RIGHT CARD: The Zatch Way */}
          <motion.div
            ref={rightCardRef}
            onMouseMove={handleRightMouseMove}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex-1 relative p-10 md:p-14 rounded-[2rem] bg-[#050A05] border border-white/[0.03] overflow-hidden transition-all duration-700 group/right"
          >
            {/* Elegant Flashlight Gradient */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-0 group-hover/right:opacity-100 transition-opacity duration-1000"
              style={{ background }}
            />

            {/* Subtle green corner glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#39FF14]/[0.02] blur-[100px] pointer-events-none rounded-full" />

            {/* Elegant Circuit Pattern */}
            <div className="absolute inset-[-10%] opacity-[0.08] mix-blend-screen pointer-events-none z-0 transition-opacity duration-700 group-hover/right:opacity-[0.15]">
               <img src={circuitPattern} alt="" className="w-full h-full object-cover grayscale brightness-200" />
            </div>

            <div className="relative z-30">
               {/* Minimalist Icon */}
               <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mb-8 border border-[#39FF14]/20 shadow-[inset_0_0_15px_rgba(57,255,20,0.05)] transition-transform duration-500 group-hover/right:scale-105">
                  <Check className="w-4 h-4 text-[#39FF14]" strokeWidth={2.5} />
               </div>
               
               {/* Elegant Typography */}
               <h4 className="text-[2rem] font-medium text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">The Zatch Way</h4>
               <p className="text-[#39FF14]/80 font-medium mb-12 text-sm tracking-wide">Automated & Instant</p>
               
               <ul className="space-y-6">
                 {/* Item 1 with Widget */}
                 <motion.li 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-4 text-[#aaa] hover:text-[#eee] cursor-pointer relative z-50 transition-colors duration-300 group/item"
                    onMouseEnter={() => setIsHoveringLive(true)}
                    onMouseLeave={() => setIsHoveringLive(false)}
                 >
                   <div className="w-6 h-6 rounded-full bg-[#39FF14]/5 flex items-center justify-center shrink-0 border border-[#39FF14]/10 group-hover/item:border-[#39FF14]/30 transition-colors duration-300">
                     <Check className="w-3 h-3 text-[#39FF14]/50 group-hover/item:text-[#39FF14]" strokeWidth={2} />
                   </div>
                   <span className="text-[15px]">One live stream = Hundreds of potential sales</span>
                   
                   {/* Minimalist Hover Widget */}
                   <AnimatePresence>
                     {isHoveringLive && (
                       <motion.div
                         initial={{ opacity: 0, x: -5, filter: "blur(2px)" }}
                         animate={{ opacity: 1, x: 10, filter: "blur(0px)" }}
                         exit={{ opacity: 0, x: -5, filter: "blur(2px)" }}
                         className="absolute left-1/2 lg:left-full top-full lg:top-1/2 mt-3 lg:mt-0 lg:-translate-y-1/2 lg:ml-2 px-4 py-2 rounded-xl bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 shadow-2xl flex items-center gap-3 whitespace-nowrap z-50 pointer-events-none"
                       >
                         <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-50"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
                         </span>
                         <span className="font-mono text-[#eee] text-lg">{viewerCount}</span>
                         <span className="text-[#888] text-[10px] uppercase tracking-wider">Live</span>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </motion.li>

                 <motion.li 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-4 text-[#aaa] hover:text-[#eee] transition-colors duration-300 group/item"
                 >
                   <div className="w-6 h-6 rounded-full bg-[#39FF14]/5 flex items-center justify-center shrink-0 border border-[#39FF14]/10 group-hover/item:border-[#39FF14]/30 transition-colors duration-300">
                     <Check className="w-3 h-3 text-[#39FF14]/50 group-hover/item:text-[#39FF14]" strokeWidth={2} />
                   </div>
                   <span className="text-[15px]">Negotiate instantly with auto-counter offers</span>
                 </motion.li>

                 {/* Item 3 with Tooltip */}
                 <motion.li 
                   initial={{ opacity: 0, x: 10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.5, delay: 0.6 }}
                   className="flex items-center gap-4 text-[#aaa] hover:text-[#eee] cursor-pointer relative z-40 transition-colors duration-300 group/item"
                   onMouseEnter={() => setIsHoveringPayment(true)}
                   onMouseLeave={() => setIsHoveringPayment(false)}
                 >
                   <div className="relative">
                     <div className="w-6 h-6 rounded-full bg-[#39FF14]/5 flex items-center justify-center shrink-0 border border-[#39FF14]/10 group-hover/item:border-[#39FF14]/30 transition-colors duration-300">
                       <Check className="w-3 h-3 text-[#39FF14]/50 group-hover/item:text-[#39FF14]" strokeWidth={2} />
                     </div>
                     {/* Minimalist Tooltip */}
                     <AnimatePresence>
                       {isHoveringPayment && (
                         <motion.div
                           initial={{ opacity: 0, y: 5, scale: 0.95 }}
                           animate={{ opacity: 1, y: 30, scale: 1 }}
                           exit={{ opacity: 0, y: 5, scale: 0.95 }}
                           className="absolute left-1/2 -translate-x-1/2 top-0 px-3 py-1.5 rounded-lg bg-[#39FF14]/10 backdrop-blur-md border border-[#39FF14]/30 text-[#39FF14] text-[11px] font-mono tracking-wider shadow-lg z-50 whitespace-nowrap pointer-events-none"
                         >
                           + ₹4,500
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                   <span className="text-[15px]">Payments collected inside the app</span>
                 </motion.li>

                 <motion.li 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex items-center gap-4 text-[#aaa] hover:text-[#eee] transition-colors duration-300 group/item"
                 >
                   <div className="w-6 h-6 rounded-full bg-[#39FF14]/5 flex items-center justify-center shrink-0 border border-[#39FF14]/10 group-hover/item:border-[#39FF14]/30 transition-colors duration-300">
                     <Check className="w-3 h-3 text-[#39FF14]/50 group-hover/item:text-[#39FF14]" strokeWidth={2} />
                   </div>
                   <span className="text-[15px]">Zero manual tracking needed</span>
                 </motion.li>
               </ul>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid with Spotlight Effect */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Video, title: "Content to Revenue", desc: "Every live. Every reel. Monetized instantly." },
            { icon: MessageCircle, title: "Built-In Negotiation", desc: "Automated bargaining. No more DM juggling." },
            { icon: Zap, title: "Instant Payments", desc: "UPI and token flow handled automatically." },
            { icon: DollarSign, title: "Low Commission", desc: "You keep more of what you earn. Always." },
          ].map((item, i) => {
            const Icon = item.icon; 
            return (
              <SpotlightCard key={i} className="group">
                <div className="p-8 h-full flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#39FF14] group-hover:text-black group-hover:border-[#39FF14] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-white group-hover:text-black transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </SpotlightCard>
            )
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center relative"
        >
          {/* Floating Elements around CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#39FF14]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <Button size="lg" className="relative bg-white text-black hover:bg-[#39FF14] hover:text-black font-bold px-10 h-16 rounded-full text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(57,255,20,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group">
            Start Selling Today <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-6 text-sm text-white/40">No website needed • Setup in 2 minutes</p>
        </motion.div>
      </div>
    </section>
  );
}
