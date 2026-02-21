import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Download, ArrowRight, Star, Zap, ShoppingBag, TrendingUp, Shield, Play, Users, IndianRupee, Smartphone } from "lucide-react";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";

function FloatingDeal({ delay, x, y, rotate, children }: { delay: number; x: string; y: string; rotate: number; children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotate: rotate - 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      transition={{ delay, duration: 0.8, type: "spring", bounce: 0.4 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [rotate, rotate + 2, rotate - 2, rotate] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function PhoneMockup() {
  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveScreen(s => (s + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  const screens = [
    <div key="live" className="w-full h-full bg-gradient-to-b from-[#0a0f0a] to-[#050805] p-3 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="px-2 py-0.5 rounded-full bg-red-500/90 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
            <span className="text-[7px] text-white font-bold">LIVE</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40">
            <Users className="w-2 h-2 text-[#39FF14]" />
            <span className="text-[7px] text-white">1.2K</span>
          </div>
        </div>
        <div className="text-[7px] text-[#39FF14]/60">Silk Collection</div>
      </div>
      <div className="flex-1 rounded-lg bg-gradient-to-br from-[#1a0f2e] to-[#0a1a0f] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Play className="w-6 h-6 text-white/60" fill="currentColor" />
        <div className="absolute bottom-1.5 left-1.5 right-1.5 space-y-0.5">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-1.5 py-0.5 w-fit">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-400" />
            <span className="text-[6px] text-white/80">love this!</span>
          </div>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1">
        {["₹899", "₹1,200", "₹750"].map((p, i) => (
          <div key={i} className="bg-[#39FF14]/10 rounded px-1.5 py-1 text-center border border-[#39FF14]/20">
            <span className="text-[7px] text-[#39FF14] font-bold">{p}</span>
          </div>
        ))}
      </div>
    </div>,

    <div key="bargain" className="w-full h-full bg-gradient-to-b from-[#0a0f0a] to-[#050805] p-3 flex flex-col">
      <div className="text-[8px] text-[#39FF14]/60 font-bold uppercase tracking-wider mb-2">Live Bargain</div>
      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.03]">
          <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center"><span className="text-[6px]">👤</span></div>
          <span className="text-[7px] text-white/60 flex-1">You offered</span>
          <span className="text-[8px] text-white/80 font-bold">₹750</span>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#39FF14]/5 border border-[#39FF14]/10">
          <div className="w-4 h-4 rounded-full bg-[#39FF14]/20 flex items-center justify-center"><Zap className="w-2 h-2 text-[#39FF14]" /></div>
          <span className="text-[7px] text-[#39FF14]/60 flex-1">Seller countered</span>
          <span className="text-[8px] text-[#39FF14] font-bold">₹899</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2 p-1.5 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30"
        >
          <div className="w-4 h-4 rounded-full bg-[#39FF14]/30 flex items-center justify-center"><span className="text-[8px]">🤝</span></div>
          <span className="text-[7px] text-[#39FF14] font-semibold flex-1">Deal at</span>
          <span className="text-[8px] text-[#39FF14] font-bold">₹820</span>
        </motion.div>
      </div>
      <div className="mt-2 p-1.5 rounded-lg bg-[#39FF14]/5 border border-[#39FF14]/10 text-center">
        <span className="text-[7px] text-[#39FF14]/80 font-bold">You saved ₹79!</span>
      </div>
    </div>,

    <div key="discover" className="w-full h-full bg-gradient-to-b from-[#0a0f0a] to-[#050805] p-3 flex flex-col">
      <div className="text-[8px] text-[#39FF14]/60 font-bold uppercase tracking-wider mb-2">Discover</div>
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {[
          { cat: "Fashion", deals: "2.4K", color: "from-pink-500/20 to-purple-500/20" },
          { cat: "Electronics", deals: "1.8K", color: "from-blue-500/20 to-cyan-500/20" },
          { cat: "Home", deals: "960", color: "from-amber-500/20 to-orange-500/20" },
          { cat: "Beauty", deals: "1.2K", color: "from-rose-500/20 to-pink-500/20" },
        ].map((c, i) => (
          <div key={i} className={`rounded-lg bg-gradient-to-br ${c.color} border border-white/[0.06] p-2 flex flex-col justify-between`}>
            <span className="text-[7px] text-white/70 font-semibold">{c.cat}</span>
            <span className="text-[7px] text-white/30">{c.deals} live</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <div className="flex -space-x-1.5">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10" />
          ))}
        </div>
        <span className="text-[7px] text-white/30">12K+ users online</span>
      </div>
    </div>,
  ];

  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="relative w-[180px] h-[360px] md:w-[220px] md:h-[440px] rounded-[2rem] border-[3px] border-white/10 bg-[#0a0a0a] overflow-hidden shadow-[0_0_80px_rgba(57,255,20,0.08),0_40px_80px_rgba(0,0,0,0.5)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0a0a0a] rounded-b-2xl z-20 border-b border-x border-white/[0.06]" />

        {/* Status bar */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-1.5 pb-1">
          <span className="text-[7px] text-white/40 font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1.5 rounded-sm border border-white/30 relative">
              <div className="absolute inset-[1px] rounded-[1px] bg-[#39FF14]" />
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="px-3 py-1.5 flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#39FF14]/20 flex items-center justify-center">
            <Zap className="w-3 h-3 text-[#39FF14]" />
          </div>
          <span className="text-[9px] text-white font-bold tracking-wide">ZATCH</span>
          <span className="text-[6px] text-[#39FF14] align-super">TM</span>
        </div>

        {/* Screen content */}
        <div className="px-1.5 flex-1 h-[calc(100%-70px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              {screens[activeScreen]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/[0.06] flex items-center justify-around px-4">
          {[
            { icon: ShoppingBag, label: "Shop", active: activeScreen === 2 },
            { icon: Play, label: "Live", active: activeScreen === 0 },
            { icon: IndianRupee, label: "Deals", active: activeScreen === 1 },
          ].map((tab, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <tab.icon className={`w-3 h-3 ${tab.active ? 'text-[#39FF14]' : 'text-white/25'}`} />
              <span className={`text-[6px] ${tab.active ? 'text-[#39FF14]' : 'text-white/20'}`}>{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Screen glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#39FF14]/[0.02] to-transparent pointer-events-none" />
      </div>

      {/* Phone reflection */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[180px] md:w-[220px] h-20 bg-gradient-to-b from-[#39FF14]/[0.03] to-transparent blur-sm rounded-full" />
    </div>
  );
}

function GlowOrb({ size, color, x, y, delay }: { size: number; color: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: `blur(${size/2}px)` }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function CountUp({ target, duration = 2000, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const stepTime = duration / steps;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * eased));
          if (step >= steps) {
            setCount(target);
            clearInterval(interval);
          }
        }, stepTime);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function StickmanCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const phoneSpring = useSpring(phoneY, { stiffness: 50, damping: 20 });

  return (
    <section id="download" ref={sectionRef} className="py-28 md:py-40 bg-[#030303] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <GlowOrb size={400} color="rgba(57,255,20,0.04)" x="20%" y="20%" delay={0} />
        <GlowOrb size={300} color="rgba(57,255,20,0.03)" x="70%" y="60%" delay={2} />
        <GlowOrb size={200} color="rgba(0,212,255,0.02)" x="80%" y="10%" delay={1} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(57,255,20,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left: Phone with floating elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative shrink-0"
          >
            <motion.div style={{ y: phoneSpring }}>
              {/* Floating deals around the phone */}
              <FloatingDeal delay={0.3} x="-60px" y="30px" rotate={-6}>
                <div className="bg-[#111]/90 backdrop-blur-md border border-[#39FF14]/20 rounded-xl px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-3 h-3 rounded-full bg-[#39FF14]/20 flex items-center justify-center">
                      <Zap className="w-1.5 h-1.5 text-[#39FF14]" />
                    </div>
                    <span className="text-[8px] text-[#39FF14]/80 font-bold">DEAL CLOSED</span>
                  </div>
                  <span className="text-[10px] text-white/60">Saved <span className="text-[#39FF14] font-bold">₹350</span></span>
                </div>
              </FloatingDeal>

              <FloatingDeal delay={0.6} x="calc(100% + 10px)" y="80px" rotate={4}>
                <div className="bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                    </div>
                    <span className="text-[8px] text-white/60 font-semibold">3 sellers LIVE</span>
                  </div>
                </div>
              </FloatingDeal>

              <FloatingDeal delay={0.9} x="calc(100% - 20px)" y="260px" rotate={-3}>
                <div className="bg-[#111]/90 backdrop-blur-md border border-amber-500/20 rounded-xl px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-2 h-2 text-amber-400" fill="currentColor" />)}
                  </div>
                  <span className="text-[8px] text-white/50 mt-0.5 block">4.8 avg rating</span>
                </div>
              </FloatingDeal>

              <FloatingDeal delay={1.2} x="-40px" y="220px" rotate={5}>
                <div className="bg-[#111]/90 backdrop-blur-md border border-purple-500/20 rounded-xl px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-purple-400" />
                    <span className="text-[8px] text-white/60 font-semibold">Buyer Protected</span>
                  </div>
                </div>
              </FloatingDeal>

              {/* The phone */}
              <PhoneMockup />
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                <div className="w-8 h-px bg-[#39FF14]" />
                <span className="text-[11px] font-bold text-[#39FF14] tracking-[0.4em] uppercase">Get the App</span>
              </div>

              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[0.95] mb-6" data-testid="text-download-heading">
                <span className="text-white">Shop Live.</span><br />
                <span className="text-white">Bargain Smart.</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] via-[#39FF14] to-[#00d4ff]">
                  Save Big.
                </span>
              </h3>

              <p className="text-base md:text-lg text-white/30 leading-relaxed max-w-lg mb-10 mx-auto lg:mx-0">
                Join India's first live bargain marketplace. Watch sellers go live, negotiate prices in real-time, and never overpay again.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0"
            >
              {[
                { value: 12000, suffix: "+", label: "Downloads" },
                { value: 4.8, suffix: "★", label: "App Rating" },
                { value: 98, suffix: "%", label: "Satisfaction" },
              ].map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-bold font-display text-white">
                    {s.suffix === "★" ? (
                      <><CountUp target={48} suffix="" /><span className="text-[#39FF14]/60">.</span><span className="text-[#39FF14]">★</span></>
                    ) : (
                      <CountUp target={s.value} suffix={s.suffix} />
                    )}
                  </p>
                  <p className="text-[10px] text-white/25 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
            >
              <a
                href={PLAYSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                data-testid="button-download-app"
              >
                {/* Animated border */}
                <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ background: 'conic-gradient(from 0deg, #39FF14, #00d4ff, #39FF14, transparent 60%)' }}
                  />
                </div>
                <div className="relative bg-[#39FF14] text-black px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg flex items-center gap-3 shadow-[0_0_50px_rgba(57,255,20,0.25)] group-hover:shadow-[0_0_80px_rgba(57,255,20,0.4)] transition-all duration-300 group-hover:scale-105 active:scale-95">
                  <Smartphone className="w-5 h-5" />
                  <span>Download Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Google Play badge */}
              <a
                href={PLAYSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
              >
                <Play className="w-6 h-6 text-white/60 group-hover:text-[#39FF14] transition-colors" fill="currentColor" />
                <div className="text-left">
                  <p className="text-[9px] text-white/40 uppercase tracking-wider">Get it on</p>
                  <p className="text-sm text-white/80 font-semibold">Google Play</p>
                </div>
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 justify-center lg:justify-start"
            >
              {[
                { icon: Download, text: "Free to download" },
                { icon: Shield, text: "Secure payments" },
                { icon: Zap, text: "Instant deals" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-white/20">
                  <item.icon className="w-3 h-3 text-[#39FF14]/30" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
