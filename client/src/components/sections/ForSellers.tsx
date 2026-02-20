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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-24 max-w-7xl mx-auto relative items-stretch z-10">
          
          {/* Connector (Desktop) */}
          <div className="hidden lg:flex absolute top-1/2 left-[calc(50%-2rem)] -translate-y-1/2 z-20 w-16 h-[60px] items-center justify-center pointer-events-none">
             {/* The Glass Tube */}
             <div className="relative w-full h-8 bg-black/60 border-t border-b border-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center z-20">
                {/* Electric Arcs */}
                <svg className="absolute inset-0 w-full h-full overflow-visible mix-blend-screen" viewBox="0 0 100 40" preserveAspectRatio="none">
                   <defs>
                      <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                         <stop offset="0%" stopColor="#ef4444" />
                         <stop offset="50%" stopColor="#ffff00" />
                         <stop offset="100%" stopColor="#39FF14" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                         <feGaussianBlur stdDeviation="2" result="blur" />
                         <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                   </defs>
                   <path d="M0,20 Q25,10 50,20 T100,20" fill="none" stroke="url(#beam-gradient)" strokeWidth="3" filter="url(#glow)">
                      <animate attributeName="d" 
                         values="M0,20 Q25,10 50,20 T100,20; M0,20 Q25,30 50,10 T100,20; M0,20 Q25,5 50,35 T100,20; M0,20 Q25,10 50,20 T100,20" 
                         dur="0.2s" repeatCount="indefinite" />
                   </path>
                </svg>
             </div>
          </div>

          {/* LEFT CARD: The Old Way (Anxiety) */}
          <motion.div
            ref={leftCardRef}
            onMouseMove={handleLeftMouseMove}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative p-10 md:p-12 rounded-[2.5rem] bg-[#1a0505]/80 border border-red-900 overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-colors duration-500"
          >
            {/* Dark red glowing accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/20 blur-[100px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/20 blur-[100px] pointer-events-none rounded-full" />

            {/* Shattered Glass Texture */}
            <div className="absolute top-[-20%] right-[-20%] w-[120%] h-[120%] opacity-40 mix-blend-plus-lighter pointer-events-none z-0">
               <img src={shatteredGlass} alt="" className="w-full h-full object-contain rotate-12 scale-125" />
            </div>

            {/* Anxiety Bubbles */}
            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -40 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute pointer-events-none px-3 py-1.5 rounded-full bg-red-950 border border-red-500 text-red-200 text-xs font-bold shadow-[0_0_15px_rgba(239,68,68,0.8)] z-50 whitespace-nowrap"
                  style={{ left: bubble.x, top: bubble.y }}
                >
                  {bubble.text}
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="relative z-30">
               <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-8 text-red-500 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                  <X className="w-6 h-6 drop-shadow-[0_0_8px_rgba(239,68,68,1)]" />
               </div>
               <h4 className="text-3xl md:text-4xl font-bold text-red-400 mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">The Old Way</h4>
               <p className="text-red-500/70 font-medium mb-10">Chaos & Manual Work</p>
               
               <ul className="space-y-8">
                 {[
                   "Closing one sale takes 15+ mins",
                   { text: "Endless DM back & forth", glitch: true },
                   "Chasing payments manually",
                   "Ghosted by buyers constantly"
                 ].map((item, i) => {
                   const isGlitch = typeof item === 'object' && item.glitch;
                   const text = typeof item === 'object' ? item.text : item;
                   
                   return (
                     <li key={i} className="flex items-center gap-5 text-red-200/80 font-medium group">
                       <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/30">
                         <X className="w-4 h-4 text-red-500" />
                       </div>
                       <span className={`text-xl transition-all ${isGlitch ? 'hover:animate-text-glitch hover:text-red-100 cursor-crosshair' : ''}`}>
                         {text}
                       </span>
                     </li>
                   );
                 })}
               </ul>
            </div>
          </motion.div>

          {/* RIGHT CARD: The Zatch Way (Flow State) */}
          <motion.div
            ref={rightCardRef}
            onMouseMove={handleRightMouseMove}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 relative p-10 md:p-12 rounded-[2.5rem] bg-[#051a05]/80 border border-[#39FF14] overflow-hidden shadow-[0_0_40px_rgba(57,255,20,0.15)] group"
          >
            {/* Interactive Flashlight Gradient */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
              style={{ background }}
            />

            {/* High contrast neon green border effect on hover */}
            <div className="absolute inset-0 border-2 border-[#39FF14]/0 group-hover:border-[#39FF14]/50 rounded-[2.5rem] transition-colors duration-700 pointer-events-none z-10" />

            {/* Circuit Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
               <img src={circuitPattern} alt="" className="w-full h-full object-cover mix-blend-color-dodge" />
            </div>

            <div className="relative z-30">
               <div className="w-12 h-12 rounded-2xl bg-[#39FF14]/10 flex items-center justify-center mb-8 text-[#39FF14] border border-[#39FF14]/30 shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                  <Check className="w-6 h-6 font-bold drop-shadow-[0_0_8px_rgba(57,255,20,1)]" />
               </div>
               <h4 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">The Zatch Way</h4>
               <p className="text-[#39FF14] font-medium mb-10 drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">Automated & Instant</p>
               
               <ul className="space-y-8">
                 {/* Item 1 with Widget */}
                 <li 
                    className="flex items-center gap-5 text-white cursor-pointer relative z-50"
                    onMouseEnter={() => setIsHoveringLive(true)}
                    onMouseLeave={() => setIsHoveringLive(false)}
                 >
                   <div className="w-8 h-8 rounded-full bg-[#39FF14]/20 flex items-center justify-center shrink-0 border border-[#39FF14]/50 shadow-[0_0_10px_rgba(57,255,20,0.3)]">
                     <Check className="w-4 h-4 text-[#39FF14] font-bold" />
                   </div>
                   <span className="text-xl font-medium">One live stream = Hundreds of potential sales</span>
                   
                   {/* Hover Widget */}
                   <AnimatePresence>
                     {isHoveringLive && (
                       <motion.div
                         initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                         animate={{ opacity: 1, x: 10, filter: "blur(0px)" }}
                         exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                         className="absolute left-1/2 lg:left-full top-full lg:top-1/2 mt-4 lg:mt-0 lg:-translate-y-1/2 lg:ml-2 px-5 py-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-[#39FF14]/50 shadow-[0_0_25px_rgba(57,255,20,0.3)] flex items-center gap-4 whitespace-nowrap z-50 pointer-events-none"
                       >
                         <span className="relative flex h-3 w-3">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_10px_red]"></span>
                         </span>
                         <span className="font-mono text-[#39FF14] font-bold text-2xl drop-shadow-[0_0_5px_rgba(57,255,20,0.8)]">{viewerCount}</span>
                         <span className="text-white/80 font-medium">watching</span>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </li>

                 <li className="flex items-center gap-5 text-white">
                   <div className="w-8 h-8 rounded-full bg-[#39FF14]/20 flex items-center justify-center shrink-0 border border-[#39FF14]/50 shadow-[0_0_10px_rgba(57,255,20,0.3)]">
                     <Check className="w-4 h-4 text-[#39FF14] font-bold" />
                   </div>
                   <span className="text-xl font-medium">Negotiate instantly with auto-counter offers</span>
                 </li>

                 {/* Item 3 with Tooltip */}
                 <li 
                   className="flex items-center gap-5 text-white cursor-pointer relative z-40"
                   onMouseEnter={() => setIsHoveringPayment(true)}
                   onMouseLeave={() => setIsHoveringPayment(false)}
                 >
                   <motion.div 
                     animate={isHoveringPayment ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                     transition={{ duration: 0.4, type: "spring", bounce: 0.6 }}
                     className="w-8 h-8 rounded-full bg-[#39FF14]/20 flex items-center justify-center shrink-0 border border-[#39FF14]/50 shadow-[0_0_10px_rgba(57,255,20,0.3)] relative"
                   >
                     <Check className="w-4 h-4 text-[#39FF14] font-bold" />
                     {/* Tooltip */}
                     <AnimatePresence>
                       {isHoveringPayment && (
                         <motion.div
                           initial={{ opacity: 0, y: 10, scale: 0.9 }}
                           animate={{ opacity: 1, y: 35, scale: 1 }}
                           exit={{ opacity: 0, y: 15, scale: 0.9 }}
                           className="absolute left-1/2 -translate-x-1/2 top-0 px-4 py-2 rounded-xl bg-[#39FF14] text-black font-bold shadow-[0_0_30px_rgba(57,255,20,0.6)] z-50 whitespace-nowrap pointer-events-none"
                         >
                           + ₹4,500 Deal Closed
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </motion.div>
                   <span className="text-xl font-medium">Payments collected inside the app</span>
                 </li>

                 <li className="flex items-center gap-5 text-white">
                   <div className="w-8 h-8 rounded-full bg-[#39FF14]/20 flex items-center justify-center shrink-0 border border-[#39FF14]/50 shadow-[0_0_10px_rgba(57,255,20,0.3)]">
                     <Check className="w-4 h-4 text-[#39FF14] font-bold" />
                   </div>
                   <span className="text-xl font-medium">Zero manual tracking needed</span>
                 </li>
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
