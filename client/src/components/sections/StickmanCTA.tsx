import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";

function GlowParticle({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0.5, 1.2, 0.5],
        y: [0, -30, 0],
      }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-full h-full rounded-full bg-[#39FF14]" style={{ filter: `blur(${size/3}px)` }} />
    </motion.div>
  );
}

export function StickmanCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    setTimeout(() => setRevealed(true), 600);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    setRevealed(false);
  };

  return (
    <section id="download" ref={ref} className="py-32 md:py-44 bg-[#020202] relative overflow-hidden">
      {/* Atmospheric void background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#39FF14]/[0.015] blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#39FF14]/[0.02] blur-[80px]" />

        {/* Grid floor effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%] opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(57,255,20,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* Floating particles */}
      <GlowParticle delay={0} size={4} x="30%" y="20%" />
      <GlowParticle delay={1.5} size={3} x="70%" y="30%" />
      <GlowParticle delay={0.8} size={5} x="20%" y="60%" />
      <GlowParticle delay={2.2} size={3} x="75%" y="70%" />
      <GlowParticle delay={1} size={4} x="50%" y="15%" />
      <GlowParticle delay={3} size={3} x="40%" y="75%" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[0.95]" data-testid="text-download-heading">
            Enter the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] via-[#39FF14] to-[#00d4ff]">
              Zatch&trade; Ecosystem
            </span>
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm md:text-base text-white/20 mt-6 font-mono tracking-wide"
          >
            [ HOVER TO UNLOCK ]
          </motion.p>
        </motion.div>

        {/* The Cube Zone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Cube container */}
          <div
            className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] cursor-pointer"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            onTouchStart={handleHoverStart}
            style={{ perspective: "1000px" }}
          >
            {/* Cube pulse ring */}
            <motion.div
              className="absolute inset-[-20px] rounded-full border border-[#39FF14]/10"
              animate={isHovered ? { scale: 1.3, opacity: 0 } : { scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={isHovered ? { duration: 0.6 } : { duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-[-40px] rounded-full border border-[#39FF14]/5"
              animate={isHovered ? { scale: 1.5, opacity: 0 } : { scale: [1, 1.08, 1], opacity: [0.15, 0.05, 0.15] }}
              transition={isHovered ? { duration: 0.8 } : { duration: 4, repeat: Infinity, delay: 1 }}
            />

            {/* THE 3D CUBE */}
            <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
              {/* Left half */}
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
                animate={
                  isHovered
                    ? { rotateY: 0, x: "-55%" }
                    : { rotateY: [0, 360], x: "0%" }
                }
                transition={
                  isHovered
                    ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                    : { rotateY: { duration: 12, repeat: Infinity, ease: "linear" }, x: { duration: 0.8 } }
                }
              >
                {/* Front face - left half */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transform: "translateZ(140px) md:translateZ(170px)",
                    clipPath: "inset(0 50% 0 0)",
                  }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/20 bg-gradient-to-br from-[#39FF14]/[0.06] to-[#0a1a0a]/80 backdrop-blur-sm shadow-[inset_0_0_60px_rgba(57,255,20,0.05)]">
                    <div className="absolute inset-0 rounded-2xl bg-[#39FF14]/[0.03]" />
                    {/* Circuit pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 200 200">
                      <path d="M20 100 L80 100 L80 40 L140 40" stroke="#39FF14" strokeWidth="1" fill="none" />
                      <path d="M20 140 L60 140 L60 160 L120 160" stroke="#39FF14" strokeWidth="1" fill="none" />
                      <circle cx="140" cy="40" r="3" fill="#39FF14" />
                      <circle cx="120" cy="160" r="3" fill="#39FF14" />
                    </svg>
                  </div>
                </div>

                {/* Back face - left half */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transform: "translateZ(-140px) rotateY(180deg)",
                    clipPath: "inset(0 0 0 50%)",
                  }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/15 bg-gradient-to-bl from-[#39FF14]/[0.04] to-[#0a1a0a]/80 backdrop-blur-sm" />
                </div>

                {/* Left face */}
                <div
                  className="absolute w-full h-full"
                  style={{ transform: "rotateY(-90deg) translateZ(140px)" }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/15 bg-gradient-to-r from-[#39FF14]/[0.04] to-[#0a1a0a]/80 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(57,255,20,0.03)]" />
                </div>

                {/* Top face - left half */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transform: "rotateX(90deg) translateZ(140px)",
                    clipPath: "inset(0 50% 0 0)",
                  }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/15 bg-gradient-to-b from-[#39FF14]/[0.06] to-[#0a1a0a]/80 backdrop-blur-sm" />
                </div>

                {/* Bottom face - left half */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transform: "rotateX(-90deg) translateZ(140px)",
                    clipPath: "inset(0 50% 0 0)",
                  }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/10 bg-[#050a05]/80" />
                </div>
              </motion.div>

              {/* Right half */}
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
                animate={
                  isHovered
                    ? { rotateY: 0, x: "55%" }
                    : { rotateY: [0, 360], x: "0%" }
                }
                transition={
                  isHovered
                    ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                    : { rotateY: { duration: 12, repeat: Infinity, ease: "linear" }, x: { duration: 0.8 } }
                }
              >
                {/* Front face - right half */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transform: "translateZ(140px)",
                    clipPath: "inset(0 0 0 50%)",
                  }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/20 bg-gradient-to-bl from-[#39FF14]/[0.06] to-[#0a1a0a]/80 backdrop-blur-sm shadow-[inset_0_0_60px_rgba(57,255,20,0.05)]">
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 200 200">
                      <path d="M180 60 L120 60 L120 120 L60 120" stroke="#39FF14" strokeWidth="1" fill="none" />
                      <path d="M180 100 L140 100 L140 50 L100 50" stroke="#39FF14" strokeWidth="1" fill="none" />
                      <circle cx="60" cy="120" r="3" fill="#39FF14" />
                      <circle cx="100" cy="50" r="3" fill="#39FF14" />
                    </svg>
                  </div>
                </div>

                {/* Back face - right half */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transform: "translateZ(-140px) rotateY(180deg)",
                    clipPath: "inset(0 50% 0 0)",
                  }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/15 bg-gradient-to-br from-[#39FF14]/[0.04] to-[#0a1a0a]/80 backdrop-blur-sm" />
                </div>

                {/* Right face */}
                <div
                  className="absolute w-full h-full"
                  style={{ transform: "rotateY(90deg) translateZ(140px)" }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/15 bg-gradient-to-l from-[#39FF14]/[0.04] to-[#0a1a0a]/80 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(57,255,20,0.03)]" />
                </div>

                {/* Top face - right half */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transform: "rotateX(90deg) translateZ(140px)",
                    clipPath: "inset(0 0 0 50%)",
                  }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/15 bg-gradient-to-b from-[#39FF14]/[0.06] to-[#0a1a0a]/80 backdrop-blur-sm" />
                </div>

                {/* Bottom face - right half */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transform: "rotateX(-90deg) translateZ(140px)",
                    clipPath: "inset(0 0 0 50%)",
                  }}
                >
                  <div className="w-full h-full rounded-2xl border border-[#39FF14]/10 bg-[#050a05]/80" />
                </div>
              </motion.div>

              {/* Inner core glow - visible when split */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#39FF14]/20 blur-xl"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#39FF14]/10 blur-3xl"
                        animate={{ scale: [1.2, 1.8, 1.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Access Keys - revealed from inside */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center gap-4 md:gap-6 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  {/* Apple App Store Key */}
                  <motion.a
                    href={PLAYSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.3, x: 20, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.3, x: 20, rotateY: -90 }}
                    transition={{ duration: 0.7, delay: 0.1, type: "spring", bounce: 0.3 }}
                    className="group relative"
                    data-testid="button-download-appstore"
                  >
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-white/10 blur-[0.5px]" />
                    <div className="relative w-[110px] h-[140px] md:w-[130px] md:h-[165px] rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] flex flex-col items-center justify-center gap-3 shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] group-hover:bg-white/[0.08] group-hover:border-white/[0.2] group-hover:shadow-[0_8px_50px_rgba(57,255,20,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-105">
                      {/* Key icon cut */}
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-[#39FF14]/10 group-hover:border-[#39FF14]/20 transition-all duration-500">
                        <span className="text-2xl md:text-3xl"></span>
                      </div>
                      <div className="text-center px-2">
                        <p className="text-[8px] text-white/30 uppercase tracking-widest">Download on</p>
                        <p className="text-[11px] md:text-xs text-white/80 font-semibold mt-0.5">App Store</p>
                      </div>
                      {/* Corner accent */}
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#39FF14]/30 group-hover:bg-[#39FF14]/60 transition-colors" />
                    </div>
                  </motion.a>

                  {/* Google Play Key */}
                  <motion.a
                    href={PLAYSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.3, x: -20, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.3, x: -20, rotateY: 90 }}
                    transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.3 }}
                    className="group relative"
                    data-testid="button-download-app"
                  >
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#39FF14]/20 via-[#39FF14]/5 to-[#39FF14]/10 blur-[0.5px]" />
                    <div className="relative w-[110px] h-[140px] md:w-[130px] md:h-[165px] rounded-2xl bg-[#39FF14]/[0.04] backdrop-blur-xl border border-[#39FF14]/[0.15] flex flex-col items-center justify-center gap-3 shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(57,255,20,0.06)] group-hover:bg-[#39FF14]/[0.08] group-hover:border-[#39FF14]/[0.3] group-hover:shadow-[0_8px_50px_rgba(57,255,20,0.15),inset_0_1px_0_rgba(57,255,20,0.1)] transition-all duration-500 group-hover:scale-105">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#39FF14]/[0.06] border border-[#39FF14]/[0.1] flex items-center justify-center group-hover:bg-[#39FF14]/15 group-hover:border-[#39FF14]/25 transition-all duration-500">
                        <Play className="w-5 h-5 md:w-6 md:h-6 text-[#39FF14]/60 group-hover:text-[#39FF14] transition-colors" fill="currentColor" />
                      </div>
                      <div className="text-center px-2">
                        <p className="text-[8px] text-[#39FF14]/30 uppercase tracking-widest">Get it on</p>
                        <p className="text-[11px] md:text-xs text-white/80 font-semibold mt-0.5">Google Play</p>
                      </div>
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#39FF14]/40 group-hover:bg-[#39FF14]/80 transition-colors" />
                    </div>
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Glass Pedestal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative mt-8"
          >
            {/* Pedestal surface */}
            <div className="w-[320px] md:w-[400px] h-[3px] rounded-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            {/* Pedestal glow */}
            <motion.div
              className="w-[200px] md:w-[260px] h-[2px] rounded-full mx-auto mt-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent"
              animate={isHovered ? { opacity: [0.6, 1, 0.6], width: ["260px", "300px", "260px"] } : { opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Pedestal reflection */}
            <div className="w-[180px] md:w-[220px] h-20 mx-auto bg-gradient-to-b from-[#39FF14]/[0.02] to-transparent blur-md rounded-full" />
          </motion.div>

          {/* Hint text */}
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-[11px] font-mono text-white/15 tracking-[0.3em] uppercase"
              >
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  hover the cube
                </motion.span>
              </motion.p>
            ) : (
              <motion.p
                key="unlocked"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-[11px] font-mono text-[#39FF14]/40 tracking-[0.3em] uppercase"
              >
                access granted
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-white/20 text-sm max-w-md mx-auto leading-relaxed mb-8">
            Join India's first live bargain marketplace. Watch sellers go live, negotiate in real-time, and never overpay again.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/15">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]/30" />
              Free to download
            </span>
            <span className="w-px h-3 bg-white/[0.06]" />
            <span>12,000+ downloads</span>
            <span className="w-px h-3 bg-white/[0.06]" />
            <span>4.8 ★ on Play Store</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
