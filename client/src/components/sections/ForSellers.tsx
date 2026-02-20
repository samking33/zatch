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

export function ForSellers({ onJoinWaitlist }: { onJoinWaitlist?: () => void }) {
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
          
          {/* Connector (Desktop) - Animated Pulse Line */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-[2px] items-center justify-center">
             <div className="w-full h-full bg-gradient-to-r from-red-500/0 via-red-500/50 to-[#39FF14]/0 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#fde047] to-transparent"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
             </div>
             {/* Connection Nodes */}
             <div className="absolute left-0 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_red]" />
             <div className="absolute right-0 w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
          </div>

          {/* LEFT CARD: The Old Way */}
          <motion.div
            ref={leftCardRef}
            onMouseMove={handleLeftMouseMove}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[#1a0505]/80 to-[#0a0202]/90 backdrop-blur-xl border border-red-900/30 overflow-hidden group/left shadow-[0_0_40px_rgba(239,68,68,0.05)] hover:shadow-[0_0_60px_rgba(239,68,68,0.1)] hover:border-red-500/30 transition-all duration-500"
          >
            {/* Soft Ambient Glows */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover/left:opacity-100 opacity-60" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-red-900/20 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover/left:opacity-100 opacity-60" />
            
            {/* Elegant Shattered Glass Texture - Much larger, deeply blended */}
            <div className="absolute inset-[-20%] opacity-[0.25] mix-blend-color-dodge pointer-events-none z-0 transition-opacity duration-700 group-hover/left:opacity-[0.4] group-hover/left:scale-105 transform origin-center">
               <img src={shatteredGlass} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Anxiety Bubbles - Refined styling */}
            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  initial={{ opacity: 0, scale: 0.5, y: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, y: -50, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, y: -80, filter: "blur(4px)" }}
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute pointer-events-none px-4 py-2 rounded-xl bg-red-950/80 backdrop-blur-md border border-red-500/40 text-red-300 text-xs font-bold tracking-widest uppercase shadow-[0_10px_30px_rgba(239,68,68,0.4)] z-50 whitespace-nowrap flex items-center gap-2"
                  style={{ left: bubble.x, top: bubble.y }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {bubble.text}
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="relative z-30 flex flex-col h-full">
               {/* Header Section */}
               <div className="mb-10">
                 <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 shadow-[inset_0_0_20px_rgba(239,68,68,0.1),0_0_15px_rgba(239,68,68,0.1)] group-hover/left:shadow-[inset_0_0_20px_rgba(239,68,68,0.2),0_0_20px_rgba(239,68,68,0.2)] transition-all duration-500">
                    <X className="w-6 h-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" strokeWidth={2} />
                 </div>
                 
                 <h4 className="text-[2.5rem] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600 mb-3 tracking-tight">The Old Way</h4>
                 <p className="text-red-500/60 font-medium text-sm uppercase tracking-[0.2em]">Chaos & Manual Work</p>
               </div>
               
               {/* List Section */}
               <ul className="space-y-6 mt-auto">
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
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                        className="flex items-center gap-4 text-white/50 group-hover/left:text-white/70 transition-colors duration-300"
                     >
                       <div className="w-8 h-8 rounded-full bg-red-950/50 flex items-center justify-center shrink-0 border border-red-900/50 relative overflow-hidden">
                         <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover/left:opacity-100 transition-opacity" />
                         <X className="w-3.5 h-3.5 text-red-500/70" strokeWidth={2.5} />
                       </div>
                       <span className={`text-[16px] font-medium leading-tight ${isGlitch ? 'hover:animate-text-glitch cursor-crosshair text-red-400/80 hover:text-red-400' : ''}`}>
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
            className="flex-1 relative p-8 md:p-12 rounded-[2rem] bg-gradient-to-bl from-[#051a0a]/80 to-[#020a05]/90 backdrop-blur-xl border border-[#39FF14]/20 overflow-hidden group/right shadow-[0_0_40px_rgba(57,255,20,0.05)] hover:shadow-[0_0_60px_rgba(57,255,20,0.1)] hover:border-[#39FF14]/40 transition-all duration-500"
          >
            {/* Elegant Flashlight Gradient */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-0 group-hover/right:opacity-100 transition-opacity duration-700"
              style={{ background }}
            />

            {/* Soft Ambient Glows */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#39FF14]/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover/right:opacity-100 opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#39FF14]/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover/right:opacity-100 opacity-60" />

            {/* Elegant Circuit Pattern */}
            <div className="absolute inset-[-10%] opacity-[0.15] mix-blend-screen pointer-events-none z-0 transition-all duration-1000 group-hover/right:opacity-[0.25] group-hover/right:scale-105 transform origin-center">
               <img src={circuitPattern} alt="" className="w-full h-full object-cover mix-blend-lighten" />
            </div>

            <div className="relative z-30 flex flex-col h-full">
               {/* Header Section */}
               <div className="mb-10">
                 <div className="w-14 h-14 rounded-2xl bg-[#39FF14]/10 flex items-center justify-center mb-6 border border-[#39FF14]/20 shadow-[inset_0_0_20px_rgba(57,255,20,0.1),0_0_15px_rgba(57,255,20,0.1)] group-hover/right:shadow-[inset_0_0_20px_rgba(57,255,20,0.2),0_0_20px_rgba(57,255,20,0.2)] transition-all duration-500 relative">
                    <div className="absolute inset-0 rounded-2xl border border-[#39FF14]/50 scale-110 opacity-0 group-hover/right:opacity-100 group-hover/right:scale-100 transition-all duration-500" />
                    <Check className="w-6 h-6 text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]" strokeWidth={2.5} />
                 </div>
                 
                 <h4 className="text-[2.5rem] leading-none font-bold text-white mb-3 tracking-tight">The Zatch Way</h4>
                 <p className="text-[#39FF14]/80 font-medium text-sm uppercase tracking-[0.2em]">Automated & Instant</p>
               </div>
               
               {/* List Section */}
               <ul className="space-y-6 mt-auto">
                 {/* Item 1 with Widget */}
                 <motion.li 
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-4 text-white/50 hover:text-white/90 cursor-pointer relative z-50 transition-colors duration-300 group/item"
                    onMouseEnter={() => setIsHoveringLive(true)}
                    onMouseLeave={() => setIsHoveringLive(false)}
                 >
                   <div className="w-8 h-8 rounded-full bg-[#0a1a0a] flex items-center justify-center shrink-0 border border-[#39FF14]/30 group-hover/item:border-[#39FF14]/80 group-hover/item:bg-[#39FF14]/10 transition-all duration-300 relative overflow-hidden">
                     <div className="absolute inset-0 bg-[#39FF14]/20 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                     <Check className="w-3.5 h-3.5 text-[#39FF14]/70 group-hover/item:text-[#39FF14]" strokeWidth={2.5} />
                   </div>
                   <span className="text-[16px] font-medium leading-tight">One live stream = Hundreds of potential sales</span>
                   
                   {/* Premium Hover Widget */}
                   <AnimatePresence>
                     {isHoveringLive && (
                       <motion.div
                         initial={{ opacity: 0, x: -10, filter: "blur(8px)", scale: 0.9 }}
                         animate={{ opacity: 1, x: 10, filter: "blur(0px)", scale: 1 }}
                         exit={{ opacity: 0, x: -5, filter: "blur(4px)", scale: 0.95 }}
                         transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
                         className="absolute left-1/2 lg:left-full top-full lg:top-1/2 mt-3 lg:mt-0 lg:-translate-y-1/2 lg:ml-4 px-5 py-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-[#39FF14]/40 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_30px_rgba(57,255,20,0.15)] flex items-center gap-4 whitespace-nowrap z-50 pointer-events-none"
                       >
                         <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#39FF14]/20 border border-[#39FF14]/50">
                           <span className="animate-ping absolute w-full h-full rounded-full bg-[#39FF14] opacity-40"></span>
                           <span className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14]"></span>
                         </div>
                         <div className="flex flex-col">
                           <span className="font-display text-white text-2xl font-bold leading-none tracking-tight">{viewerCount}</span>
                           <span className="text-[#39FF14]/80 text-[10px] uppercase tracking-[0.2em] font-bold">Live Viewers</span>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </motion.li>

                 <motion.li 
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-4 text-white/50 group-hover/right:text-white/70 transition-colors duration-300 group/item"
                 >
                   <div className="w-8 h-8 rounded-full bg-[#0a1a0a] flex items-center justify-center shrink-0 border border-[#39FF14]/30 relative overflow-hidden">
                     <Check className="w-3.5 h-3.5 text-[#39FF14]/70" strokeWidth={2.5} />
                   </div>
                   <span className="text-[16px] font-medium leading-tight">Negotiate instantly with auto-counter offers</span>
                 </motion.li>

                 {/* Item 3 with Tooltip */}
                 <motion.li 
                   initial={{ opacity: 0, x: 15 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.5, delay: 0.6 }}
                   className="flex items-center gap-4 text-white/50 hover:text-white/90 cursor-pointer relative z-40 transition-colors duration-300 group/item"
                   onMouseEnter={() => setIsHoveringPayment(true)}
                   onMouseLeave={() => setIsHoveringPayment(false)}
                 >
                   <div className="relative">
                     <div className="w-8 h-8 rounded-full bg-[#0a1a0a] flex items-center justify-center shrink-0 border border-[#39FF14]/30 group-hover/item:border-[#39FF14]/80 group-hover/item:bg-[#39FF14]/10 transition-all duration-300 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[#39FF14]/20 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                       <Check className="w-3.5 h-3.5 text-[#39FF14]/70 group-hover/item:text-[#39FF14]" strokeWidth={2.5} />
                     </div>
                     {/* Premium Tooltip */}
                     <AnimatePresence>
                       {isHoveringPayment && (
                         <motion.div
                           initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(4px)" }}
                           animate={{ opacity: 1, y: 35, scale: 1, filter: "blur(0px)" }}
                           exit={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(4px)" }}
                           transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
                           className="absolute left-1/2 -translate-x-1/2 top-0 px-4 py-2 rounded-xl bg-[#39FF14] border border-[#39FF14] text-black text-xs font-bold tracking-widest uppercase shadow-[0_15px_30px_rgba(57,255,20,0.3)] z-50 whitespace-nowrap pointer-events-none flex items-center gap-2"
                         >
                           <Zap className="w-3 h-3" fill="currentColor" />
                           + ₹4,500
                           <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#39FF14] rotate-45 border-t border-l border-[#39FF14]" />
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                   <span className="text-[16px] font-medium leading-tight">Payments collected inside the app</span>
                 </motion.li>

                 <motion.li 
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex items-center gap-4 text-white/50 group-hover/right:text-white/70 transition-colors duration-300 group/item"
                 >
                   <div className="w-8 h-8 rounded-full bg-[#0a1a0a] flex items-center justify-center shrink-0 border border-[#39FF14]/30 relative overflow-hidden">
                     <Check className="w-3.5 h-3.5 text-[#39FF14]/70" strokeWidth={2.5} />
                   </div>
                   <span className="text-[16px] font-medium leading-tight">Zero manual tracking needed</span>
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
          
          <Button size="lg" onClick={onJoinWaitlist} className="relative bg-white text-black hover:bg-[#39FF14] hover:text-black font-bold px-10 h-16 rounded-full text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(57,255,20,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group" data-testid="button-seller-waitlist">
            Start Selling Today <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-6 text-sm text-white/40">No website needed • Setup in 2 minutes</p>
        </motion.div>
      </div>
    </section>
  );
}
