import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Zap, DollarSign, MessageCircle, X, Check, Video, AlertTriangle, Clock, Ghost, Send, Eye, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type Bubble = {
  id: number;
  x: number;
  y: number;
  text: string;
  rotation: number;
};

const ANXIETY_TEXTS = ["Price??", "Available?", "Last price??", "Pls reply fast", "Bro??", "Final offer?", "Still there?", "Hello???", "????", "Ship today?"];

function FloatingNotification({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -10 }}
      animate={{
        opacity: [0, 0.7, 0.7, 0],
        y: [20, 0, -10, -30],
        x: [-10, 0, 5, 10],
      }}
      transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 2 }}
      className="absolute pointer-events-none px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400/60 text-[10px] font-medium whitespace-nowrap backdrop-blur-sm"
    >
      {text}
    </motion.div>
  );
}

function PulseRing({ delay, size }: { delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full border border-[#39FF14]/20"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.2, 1.5] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

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
      if (velocity > 0.6) {
        setBubbles((prev) => {
          if (prev.length >= 10) return prev;
          const rect = leftCardRef.current?.getBoundingClientRect();
          if (!rect) return prev;
          return [...prev, {
            id: bubbleIdCounter.current++,
            x: currentX - rect.left + (Math.random() - 0.5) * 100,
            y: currentY - rect.top + (Math.random() - 0.5) * 100,
            text: ANXIETY_TEXTS[Math.floor(Math.random() * ANXIETY_TEXTS.length)],
            rotation: (Math.random() - 0.5) * 20,
          }];
        });
      }
    }
    lastMousePos.current = { x: currentX, y: currentY, time: currentTime };
  }, []);

  useEffect(() => {
    if (bubbles.length === 0) return;
    const interval = setInterval(() => setBubbles(prev => prev.slice(1)), 300);
    return () => clearInterval(interval);
  }, [bubbles]);

  const rightCardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleRightMouseMove = (e: React.MouseEvent) => {
    const rect = rightCardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    }
  };

  const flashlight = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(600px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(57, 255, 20, 0.07), transparent 60%)`
  );

  const [isHoveringLive, setIsHoveringLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(124);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHoveringLive) {
      setViewerCount(124);
      interval = setInterval(() => {
        setViewerCount(prev => {
          if (prev >= 890) { clearInterval(interval); return 890; }
          return prev + Math.floor(Math.random() * 35) + 12;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isHoveringLive]);

  const [isHoveringPayment, setIsHoveringPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<'old' | 'new'>('old');

  const leftPainPoints = [
    { icon: Clock, text: "Closing one sale takes 15+ mins", glitch: false },
    { icon: MessageCircle, text: "Endless DM back & forth", glitch: true },
    { icon: Send, text: "Chasing payments manually", glitch: false },
    { icon: Ghost, text: "Ghosted by buyers constantly", glitch: false },
  ];

  const rightFeatures = [
    { icon: Eye, text: "One live stream = Hundreds of potential sales", hoverable: "live" as const },
    { icon: Zap, text: "Negotiate instantly with auto-counter offers", hoverable: null },
    { icon: Shield, text: "Payments collected inside the app", hoverable: "payment" as const },
    { icon: Sparkles, text: "Zero manual tracking needed", hoverable: null },
  ];

  return (
    <section id="sellers" ref={ref} className="py-32 md:py-40 bg-[#030303] relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-950/20 blur-[200px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#39FF14]/5 blur-[200px] rounded-full" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#39FF14]" />
              <span className="text-[11px] font-bold text-[#39FF14] tracking-[0.4em] uppercase" data-testid="text-sellers-tag">For Sellers</span>
            </div>

            <h3 className="text-4xl sm:text-6xl md:text-[5.5rem] font-bold font-display tracking-tight leading-[0.9] mb-8" data-testid="text-sellers-heading">
              <span className="text-white">Your DMs</span>
              <br />
              <span className="text-white">Are Not a</span>
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#39FF14]/60">Sales System.</span>
                <motion.div
                  className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-[#39FF14] to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </h3>

            <p className="text-lg md:text-xl text-white/30 max-w-lg leading-relaxed">
              Stop managing conversations. Start closing deals — automatically.
            </p>
          </motion.div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden mb-6 bg-white/[0.03] rounded-2xl p-1 border border-white/[0.06] max-w-xs">
          <button
            onClick={() => setActiveTab('old')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'old' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-white/30'}`}
          >
            Old Way
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'new' ? 'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30' : 'text-white/30'}`}
          >
            Zatch Way
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-6xl relative">

          {/* Diagonal Divider (Desktop) */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-20 w-px">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-500/80 via-yellow-400/80 to-[#39FF14]/80"
              style={{ height: '60px', filter: 'blur(1px)' }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center z-10">
              <ArrowRight className="w-4 h-4 text-white/40" />
            </div>
          </div>

          {/* LEFT CARD */}
          <motion.div
            ref={leftCardRef}
            onMouseMove={handleLeftMouseMove}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`relative p-8 md:p-12 lg:p-14 rounded-3xl lg:rounded-r-none bg-gradient-to-br from-red-950/15 via-[#0a0505]/80 to-[#080303] border border-red-900/15 lg:border-r-0 overflow-hidden group/left ${activeTab !== 'old' ? 'hidden lg:block' : ''}`}
          >
            {/* Ambient noise texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />

            {/* Floating anxiety notifications (ambient, always visible) */}
            <FloatingNotification text="3 unread" delay={0} />
            <div className="absolute top-[15%] right-[10%]"><FloatingNotification text="Where's my order?" delay={1.5} /></div>
            <div className="absolute top-[45%] right-[5%]"><FloatingNotification text="Last price??" delay={3} /></div>
            <div className="absolute bottom-[25%] left-[5%]"><FloatingNotification text="Reply pls" delay={2} /></div>
            <div className="absolute bottom-[10%] right-[15%]"><FloatingNotification text="Hello???" delay={4} /></div>

            {/* Cursor-triggered anxiety bubbles */}
            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1.1, 1, 0.6],
                    y: [0, -30, -60, -100],
                    rotate: bubble.rotation,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute pointer-events-none z-50"
                  style={{ left: bubble.x, top: bubble.y }}
                >
                  <div className="px-3 py-1.5 rounded-full bg-red-500/15 backdrop-blur-md border border-red-500/25 text-red-400 text-[10px] font-bold tracking-widest whitespace-nowrap flex items-center gap-1.5 shadow-[0_4px_20px_rgba(239,68,68,0.15)]">
                    <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                    {bubble.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Red stress vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(127,29,29,0.08)_100%)] group-hover/left:opacity-100 opacity-60 transition-opacity duration-700" />

            <div className="relative z-30">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <AlertTriangle className="w-4 h-4 text-red-500/80" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white/90 tracking-tight" data-testid="text-old-way-title">The Old Way</h4>
                  <p className="text-red-500/40 text-[10px] uppercase tracking-[0.3em] font-semibold">Chaos & Manual Work</p>
                </div>
              </div>

              <div className="space-y-0">
                {leftPainPoints.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 + 0.2 }}
                      className="group/pain relative"
                    >
                      <div className={`flex items-center gap-4 py-5 border-b border-white/[0.04] last:border-0 transition-all duration-300 ${item.glitch ? 'cursor-crosshair' : ''}`}>
                        <div className="w-8 h-8 rounded-lg bg-red-500/5 flex items-center justify-center shrink-0 border border-red-500/10 group-hover/pain:bg-red-500/10 group-hover/pain:border-red-500/20 transition-all duration-300">
                          <Icon className="w-3.5 h-3.5 text-red-500/50 group-hover/pain:text-red-500/80 transition-colors" strokeWidth={2} />
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                          <X className="w-3 h-3 text-red-500/40 shrink-0" strokeWidth={3} />
                          <span className={`text-[14px] md:text-[15px] text-white/40 group-hover/pain:text-white/60 transition-all duration-300 ${item.glitch ? 'hover:[text-shadow:_-2px_0_rgba(255,0,64,0.7),_2px_0_rgba(0,255,255,0.7)] hover:text-red-300' : ''}`}>
                            {item.text}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex items-center gap-6 pt-6 border-t border-white/[0.04]"
              >
                <div>
                  <span className="text-2xl font-bold text-red-400/70 font-display">73%</span>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mt-0.5">Deals Lost</p>
                </div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div>
                  <span className="text-2xl font-bold text-red-400/70 font-display">4.2h</span>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mt-0.5">Wasted Daily</p>
                </div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div>
                  <span className="text-2xl font-bold text-red-400/70 font-display">∞</span>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mt-0.5">Frustration</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            ref={rightCardRef}
            onMouseMove={handleRightMouseMove}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className={`relative p-8 md:p-12 lg:p-14 rounded-3xl lg:rounded-l-none bg-gradient-to-bl from-[#041208]/80 via-[#030a06]/90 to-[#030303] border border-[#39FF14]/10 lg:border-l-0 overflow-hidden group/right ${activeTab !== 'new' ? 'hidden lg:block' : ''}`}
          >
            {/* Flashlight */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover/right:opacity-100 transition-opacity duration-700"
              style={{ background: flashlight }}
            />

            {/* Animated pulse rings (ambient) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover/right:opacity-40 transition-opacity duration-700">
              <PulseRing delay={0} size={200} />
              <PulseRing delay={1} size={300} />
              <PulseRing delay={2} size={400} />
            </div>

            {/* Scan line */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent pointer-events-none z-0"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-30">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 flex items-center justify-center border border-[#39FF14]/20 relative group-hover/right:shadow-[0_0_25px_rgba(57,255,20,0.15)] transition-all duration-500">
                  <Check className="w-4 h-4 text-[#39FF14]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white/90 tracking-tight" data-testid="text-zatch-way-title">The Zatch Way</h4>
                  <p className="text-[#39FF14]/40 text-[10px] uppercase tracking-[0.3em] font-semibold">Automated & Instant</p>
                </div>
              </div>

              <div className="space-y-0">
                {rightFeatures.map((item, i) => {
                  const Icon = item.icon;
                  const isLive = item.hoverable === 'live';
                  const isPayment = item.hoverable === 'payment';

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 + 0.3 }}
                      className="group/feat relative"
                      onMouseEnter={() => {
                        if (isLive) setIsHoveringLive(true);
                        if (isPayment) setIsHoveringPayment(true);
                      }}
                      onMouseLeave={() => {
                        if (isLive) setIsHoveringLive(false);
                        if (isPayment) setIsHoveringPayment(false);
                      }}
                    >
                      <div className={`flex items-center gap-4 py-5 border-b border-white/[0.04] last:border-0 transition-all duration-300 ${item.hoverable ? 'cursor-pointer' : ''}`}>
                        <motion.div
                          className="w-8 h-8 rounded-lg bg-[#39FF14]/5 flex items-center justify-center shrink-0 border border-[#39FF14]/10 group-hover/feat:bg-[#39FF14]/15 group-hover/feat:border-[#39FF14]/30 transition-all duration-300"
                          animate={isPayment && isHoveringPayment ? { scale: [1, 1.25, 1.1] } : { scale: 1 }}
                          transition={{ type: "spring", bounce: 0.6 }}
                        >
                          <Icon className="w-3.5 h-3.5 text-[#39FF14]/50 group-hover/feat:text-[#39FF14]/90 transition-colors" strokeWidth={2} />
                        </motion.div>

                        <div className="flex items-center gap-2 flex-1">
                          <Check className="w-3 h-3 text-[#39FF14]/40 shrink-0" strokeWidth={3} />
                          <span className="text-[14px] md:text-[15px] text-white/40 group-hover/feat:text-white/70 transition-colors duration-300">{item.text}</span>
                        </div>
                      </div>

                      {/* Live Viewers Widget */}
                      {isLive && (
                        <AnimatePresence>
                          {isHoveringLive && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(10px)" }}
                              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                              exit={{ opacity: 0, y: 5, scale: 0.95, filter: "blur(6px)" }}
                              transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
                              className="absolute right-0 top-full mt-2 z-50 pointer-events-none"
                            >
                              <div className="px-5 py-3.5 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-2xl border border-[#39FF14]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(57,255,20,0.08)] flex items-center gap-4">
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30">
                                  <span className="animate-ping absolute w-full h-full rounded-full bg-[#39FF14] opacity-20" />
                                  <span className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
                                </div>
                                <div>
                                  <span className="font-display text-white text-3xl font-bold leading-none tracking-tight">{viewerCount.toLocaleString()}</span>
                                  <p className="text-[#39FF14]/50 text-[9px] uppercase tracking-[0.25em] font-bold mt-1">Watching Now</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}

                      {/* Payment Tooltip */}
                      {isPayment && (
                        <AnimatePresence>
                          {isHoveringPayment && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.85 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.9 }}
                              transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
                              className="absolute left-12 top-full mt-2 z-50 pointer-events-none"
                            >
                              <div className="px-4 py-2 rounded-xl bg-[#39FF14] text-black text-[12px] font-bold tracking-wide shadow-[0_10px_30px_rgba(57,255,20,0.3)] flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5" fill="currentColor" />
                                + ₹4,500 Deal Closed
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 flex items-center gap-6 pt-6 border-t border-white/[0.04]"
              >
                <div>
                  <span className="text-2xl font-bold text-[#39FF14]/80 font-display">3x</span>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mt-0.5">More Sales</p>
                </div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div>
                  <span className="text-2xl font-bold text-[#39FF14]/80 font-display">2min</span>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mt-0.5">To Close</p>
                </div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div>
                  <span className="text-2xl font-bold text-[#39FF14]/80 font-display">0</span>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mt-0.5">Stress</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 md:mt-28"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
            {[
              { icon: Video, title: "Content to Revenue", desc: "Every live. Every reel. Monetized instantly.", accent: "group-hover:shadow-[0_0_40px_rgba(57,255,20,0.08)]" },
              { icon: MessageCircle, title: "Built-In Negotiation", desc: "Automated bargaining. No more DM juggling.", accent: "group-hover:shadow-[0_0_40px_rgba(57,255,20,0.08)]" },
              { icon: Zap, title: "Instant Payments", desc: "UPI and token flow handled automatically.", accent: "group-hover:shadow-[0_0_40px_rgba(57,255,20,0.08)]" },
              { icon: DollarSign, title: "Low Commission", desc: "You keep more of what you earn. Always.", accent: "group-hover:shadow-[0_0_40px_rgba(57,255,20,0.08)]" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.5 }}
                >
                  <SpotlightCard className={`group ${item.accent}`}>
                    <div className="p-6 md:p-7 h-full flex flex-col items-start">
                      <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:bg-[#39FF14]/10 group-hover:border-[#39FF14]/30 transition-all duration-500">
                        <Icon className="w-5 h-5 text-white/30 group-hover:text-[#39FF14] transition-colors duration-500" />
                      </div>
                      <h4 className="text-base font-bold text-white/90 mb-2">{item.title}</h4>
                      <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 md:mt-24 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Button
              size="lg"
              onClick={onJoinWaitlist}
              className="relative bg-[#39FF14] text-black hover:bg-[#39FF14]/90 font-bold px-10 h-14 rounded-full text-base shadow-[0_0_40px_rgba(57,255,20,0.2)] hover:shadow-[0_0_60px_rgba(57,255,20,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group"
              data-testid="button-seller-waitlist"
            >
              Start Selling Today <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-white/20">No website needed · Setup in 2 minutes</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
