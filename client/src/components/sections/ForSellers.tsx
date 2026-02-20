import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, DollarSign, MessageCircle, X, Check, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type Bubble = {
  id: number;
  x: number;
  y: number;
  text: string;
};

const ANXIETY_TEXTS = ["Price??", "Available?", "Last price??", "Pls reply fast", "Bro??", "Final offer?", "Still there?", "Hello???"];

export function ForSellers({ onJoinWaitlist }: { onJoinWaitlist?: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const leftCardRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const bubbleIdCounter = useRef(0);

  const handleLeftMouseMove = useCallback((e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    const currentX = e.clientX;
    const currentY = e.clientY;
    const currentTime = Date.now();
    const dx = currentX - lastMousePos.current.x;
    const dy = currentY - lastMousePos.current.y;
    const dt = currentTime - lastMousePos.current.time;

    if (dt > 0) {
      const velocity = Math.sqrt(dx * dx + dy * dy) / dt;
      if (velocity > 0.8) {
        setBubbles((prev) => {
          if (prev.length >= 12) return prev;
          const rect = leftCardRef.current?.getBoundingClientRect();
          if (!rect) return prev;
          const spawnX = currentX - rect.left + (Math.random() - 0.5) * 80;
          const spawnY = currentY - rect.top + (Math.random() - 0.5) * 80;
          return [...prev, {
            id: bubbleIdCounter.current++,
            x: spawnX,
            y: spawnY,
            text: ANXIETY_TEXTS[Math.floor(Math.random() * ANXIETY_TEXTS.length)],
          }];
        });
      }
    }
    lastMousePos.current = { x: currentX, y: currentY, time: currentTime };
  }, []);

  useEffect(() => {
    if (bubbles.length === 0) return;
    const interval = setInterval(() => {
      setBubbles(prev => prev.slice(1));
    }, 350);
    return () => clearInterval(interval);
  }, [bubbles]);

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
          if (prev >= 890) { clearInterval(interval); return 890; }
          return prev + Math.floor(Math.random() * 40) + 15;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isHoveringLive]);

  const [isHoveringPayment, setIsHoveringPayment] = useState(false);

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(57, 255, 20, 0.06), transparent 70%)`
  );

  return (
    <section id="sellers" ref={ref} className="py-32 bg-[#050505] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '3rem 3rem',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold text-[#39FF14] tracking-[0.3em] uppercase mb-6" data-testid="text-sellers-tag">For Sellers</span>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 text-white" data-testid="text-sellers-heading">
              <span className="block" style={{ textShadow: '0 0 30px rgba(57,255,20,0.4), 0 0 60px rgba(57,255,20,0.15)' }}>Your DMs Are Not</span>
              <span className="block" style={{ textShadow: '0 0 30px rgba(57,255,20,0.4), 0 0 60px rgba(57,255,20,0.15)' }}>a Sales System.</span>
            </h3>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Stop managing conversations. Start closing deals.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-24 max-w-6xl mx-auto relative items-stretch">

          {/* LEFT CARD: The Old Way */}
          <motion.div
            ref={leftCardRef}
            onMouseMove={handleLeftMouseMove}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-8 md:p-10 rounded-3xl bg-red-950/10 backdrop-blur-xl border border-red-900/20 overflow-hidden group/left hover:border-red-500/30 transition-all duration-500"
          >
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/5 blur-[100px] rounded-full pointer-events-none group-hover/left:bg-red-600/10 transition-all duration-700" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-900/5 blur-[100px] rounded-full pointer-events-none group-hover/left:bg-red-900/10 transition-all duration-700" />

            {/* DOM-based cracks overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06] group-hover/left:opacity-[0.12] transition-opacity duration-700">
              <div className="absolute top-[20%] left-[10%] w-[60%] h-px bg-gradient-to-r from-transparent via-red-400 to-transparent rotate-[25deg]" />
              <div className="absolute top-[35%] left-[30%] w-[50%] h-px bg-gradient-to-r from-transparent via-red-400 to-transparent rotate-[-15deg]" />
              <div className="absolute top-[55%] left-[5%] w-[70%] h-px bg-gradient-to-r from-transparent via-red-400 to-transparent rotate-[40deg]" />
              <div className="absolute top-[70%] left-[20%] w-[40%] h-px bg-gradient-to-r from-transparent via-red-400 to-transparent rotate-[-30deg]" />
              <div className="absolute top-[15%] left-[50%] w-[45%] h-px bg-gradient-to-r from-transparent via-red-400 to-transparent rotate-[60deg]" />
              <div className="absolute top-[45%] left-[15%] w-[55%] h-px bg-gradient-to-r from-transparent via-red-300 to-transparent rotate-[-45deg]" />
              <div className="absolute top-[80%] left-[40%] w-[35%] h-px bg-gradient-to-r from-transparent via-red-400 to-transparent rotate-[20deg]" />
            </div>

            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  initial={{ opacity: 0, scale: 0.3, y: 0, filter: "blur(6px)" }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.3, 1.05, 1, 0.8],
                    y: [0, -20, -50, -70],
                    x: (Math.random() - 0.5) * 30,
                    filter: ["blur(6px)", "blur(0px)", "blur(0px)", "blur(4px)"],
                  }}
                  exit={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
                  transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute pointer-events-none z-50 px-3 py-1.5 rounded-full bg-red-950/90 backdrop-blur-md border border-red-500/30 text-red-400 text-[11px] font-semibold tracking-wider whitespace-nowrap flex items-center gap-1.5 shadow-[0_8px_25px_rgba(239,68,68,0.25)]"
                  style={{ left: bubble.x, top: bubble.y }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                  {bubble.text}
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="relative z-30 flex flex-col h-full">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-5 border border-red-500/20">
                  <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight" data-testid="text-old-way-title">The Old Way</h4>
                <p className="text-red-500/50 font-medium text-xs uppercase tracking-[0.25em]">Chaos & Manual Work</p>
              </div>

              <ul className="space-y-5 mt-auto">
                {[
                  { text: "Closing one sale takes 15+ mins", glitch: false },
                  { text: "Endless DM back & forth", glitch: true },
                  { text: "Chasing payments manually", glitch: false },
                  { text: "Ghosted by buyers constantly", glitch: false },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                    className="flex items-center gap-3.5 text-white/50 group-hover/left:text-white/70 transition-colors duration-300"
                  >
                    <div className="w-7 h-7 rounded-full bg-red-950/60 flex items-center justify-center shrink-0 border border-red-900/40">
                      <X className="w-3 h-3 text-red-500/70" strokeWidth={3} />
                    </div>
                    <span
                      className={`text-sm md:text-[15px] font-medium leading-snug ${
                        item.glitch
                          ? "cursor-crosshair text-red-400/70 hover:text-red-400 hover:[text-shadow:_-2px_0_#ff0040,_2px_0_#00ffff] transition-all duration-100"
                          : ""
                      }`}
                    >
                      {item.text}
                    </span>
                  </motion.li>
                ))}
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
            className="relative p-8 md:p-10 rounded-3xl bg-[#051a0a]/40 backdrop-blur-xl border border-[#39FF14]/15 overflow-hidden group/right hover:border-[#39FF14]/35 transition-all duration-500"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover/right:opacity-100 transition-opacity duration-500"
              style={{ background }}
            />

            <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#39FF14]/3 blur-[100px] rounded-full pointer-events-none group-hover/right:bg-[#39FF14]/6 transition-all duration-700" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#39FF14]/3 blur-[100px] rounded-full pointer-events-none group-hover/right:bg-[#39FF14]/6 transition-all duration-700" />

            {/* DOM-based circuit lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04] group-hover/right:opacity-[0.08] transition-opacity duration-700">
              <div className="absolute top-[15%] left-[8%] w-[30%] h-px bg-[#39FF14]" />
              <div className="absolute top-[15%] left-[38%] w-px h-[20%] bg-[#39FF14]" />
              <div className="absolute top-[35%] left-[38%] w-[25%] h-px bg-[#39FF14]" />
              <div className="absolute top-[50%] left-[60%] w-px h-[15%] bg-[#39FF14]" />
              <div className="absolute top-[65%] left-[15%] w-[45%] h-px bg-[#39FF14]" />
              <div className="absolute top-[65%] left-[60%] w-px h-[20%] bg-[#39FF14]" />
              <div className="absolute top-[85%] left-[60%] w-[30%] h-px bg-[#39FF14]" />
              <div className="absolute top-[40%] left-[70%] w-[20%] h-px bg-[#39FF14]" />
              <div className="absolute top-[40%] left-[90%] w-px h-[30%] bg-[#39FF14]" />
              {/* Circuit nodes */}
              <div className="absolute top-[15%] left-[38%] w-1.5 h-1.5 rounded-full bg-[#39FF14] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-[65%] left-[60%] w-1.5 h-1.5 rounded-full bg-[#39FF14] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-[40%] left-[90%] w-1.5 h-1.5 rounded-full bg-[#39FF14] -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-30 flex flex-col h-full">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#39FF14]/10 flex items-center justify-center mb-5 border border-[#39FF14]/20 group-hover/right:shadow-[0_0_20px_rgba(57,255,20,0.15)] transition-all duration-500">
                  <Check className="w-5 h-5 text-[#39FF14]" strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight" data-testid="text-zatch-way-title">The Zatch Way</h4>
                <p className="text-[#39FF14]/60 font-medium text-xs uppercase tracking-[0.25em]">Automated & Instant</p>
              </div>

              <ul className="space-y-5 mt-auto">
                {/* Item 1: Live viewers widget */}
                <motion.li
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-3.5 text-white/50 hover:text-white/90 cursor-pointer relative transition-colors duration-300 group/item"
                  onMouseEnter={() => setIsHoveringLive(true)}
                  onMouseLeave={() => setIsHoveringLive(false)}
                >
                  <div className="w-7 h-7 rounded-full bg-[#0a1a0a] flex items-center justify-center shrink-0 border border-[#39FF14]/25 group-hover/item:border-[#39FF14]/70 group-hover/item:bg-[#39FF14]/10 transition-all duration-300">
                    <Check className="w-3 h-3 text-[#39FF14]/70 group-hover/item:text-[#39FF14]" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-[15px] font-medium leading-snug">One live stream = Hundreds of potential sales</span>

                  <AnimatePresence>
                    {isHoveringLive && (
                      <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.9, filter: "blur(8px)" }}
                        animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -5, scale: 0.95, filter: "blur(4px)" }}
                        transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
                        className="absolute right-0 lg:left-full top-full lg:top-1/2 mt-2 lg:mt-0 lg:-translate-y-1/2 lg:ml-3 px-4 py-2.5 rounded-2xl bg-black/90 backdrop-blur-xl border border-[#39FF14]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(57,255,20,0.1)] flex items-center gap-3 whitespace-nowrap z-50 pointer-events-none"
                      >
                        <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#39FF14]/20">
                          <span className="animate-ping absolute w-full h-full rounded-full bg-[#39FF14] opacity-30" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] shadow-[0_0_6px_#39FF14]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display text-white text-xl font-bold leading-none tracking-tight">{viewerCount}</span>
                          <span className="text-[#39FF14]/70 text-[9px] uppercase tracking-[0.2em] font-bold mt-0.5">Live Viewers</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>

                {/* Item 2: Negotiate */}
                <motion.li
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center gap-3.5 text-white/50 group-hover/right:text-white/70 transition-colors duration-300"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0a1a0a] flex items-center justify-center shrink-0 border border-[#39FF14]/25">
                    <Check className="w-3 h-3 text-[#39FF14]/70" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-[15px] font-medium leading-snug">Negotiate instantly with auto-counter offers</span>
                </motion.li>

                {/* Item 3: Payments with tooltip */}
                <motion.li
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center gap-3.5 text-white/50 hover:text-white/90 cursor-pointer relative transition-colors duration-300 group/item"
                  onMouseEnter={() => setIsHoveringPayment(true)}
                  onMouseLeave={() => setIsHoveringPayment(false)}
                >
                  <div className="relative">
                    <motion.div
                      className="w-7 h-7 rounded-full bg-[#0a1a0a] flex items-center justify-center shrink-0 border border-[#39FF14]/25 group-hover/item:border-[#39FF14]/70 group-hover/item:bg-[#39FF14]/10 transition-all duration-300"
                      animate={isHoveringPayment ? { scale: [1, 1.3, 1.15] } : { scale: 1 }}
                      transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
                    >
                      <Check className="w-3 h-3 text-[#39FF14]/70 group-hover/item:text-[#39FF14]" strokeWidth={3} />
                    </motion.div>

                    <AnimatePresence>
                      {isHoveringPayment && (
                        <motion.div
                          initial={{ opacity: 0, y: 0, scale: 0.8, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 38, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 20, scale: 0.8, filter: "blur(4px)" }}
                          transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
                          className="absolute left-1/2 -translate-x-1/2 top-0 px-3 py-1.5 rounded-lg bg-[#39FF14] text-black text-[11px] font-bold tracking-wider shadow-[0_10px_25px_rgba(57,255,20,0.3)] z-50 whitespace-nowrap pointer-events-none flex items-center gap-1.5"
                        >
                          <Zap className="w-3 h-3" fill="currentColor" />
                          + ₹4,500
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#39FF14] rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <span className="text-sm md:text-[15px] font-medium leading-snug">Payments collected inside the app</span>
                </motion.li>

                {/* Item 4: Zero tracking */}
                <motion.li
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-center gap-3.5 text-white/50 group-hover/right:text-white/70 transition-colors duration-300"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0a1a0a] flex items-center justify-center shrink-0 border border-[#39FF14]/25">
                    <Check className="w-3 h-3 text-[#39FF14]/70" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-[15px] font-medium leading-snug">Zero manual tracking needed</span>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {[
            { icon: Video, title: "Content to Revenue", desc: "Every live. Every reel. Monetized instantly." },
            { icon: MessageCircle, title: "Built-In Negotiation", desc: "Automated bargaining. No more DM juggling." },
            { icon: Zap, title: "Instant Payments", desc: "UPI and token flow handled automatically." },
            { icon: DollarSign, title: "Low Commission", desc: "You keep more of what you earn. Always." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <SpotlightCard key={i} className="group">
                <div className="p-7 h-full flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:bg-[#39FF14] group-hover:text-black group-hover:border-[#39FF14] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-white/70 group-hover:text-black transition-colors duration-300" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#39FF14]/5 blur-[100px] rounded-full pointer-events-none" />

          <Button
            size="lg"
            onClick={onJoinWaitlist}
            className="relative bg-white text-black hover:bg-[#39FF14] hover:text-black font-bold px-10 h-14 rounded-full text-base shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(57,255,20,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group"
            data-testid="button-seller-waitlist"
          >
            Start Selling Today <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-5 text-sm text-white/30">No website needed · Setup in 2 minutes</p>
        </motion.div>
      </div>
    </section>
  );
}
