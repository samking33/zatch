import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { Download, Sparkles } from "lucide-react";

type WalkPhase = "hidden" | "entering" | "walking" | "approaching" | "clicking" | "celebrating" | "idle";

const SPEECH_BUBBLES: Record<string, string> = {
  entering: "Let me show you something...",
  walking: "Almost there...",
  approaching: "Ooh, what's this button? 👀",
  clicking: "*CLICK* 🖱️",
  celebrating: "YESSS! Download it! 🎉",
  idle: "Go on, you try it too!",
};

const POST_CLICK_MESSAGES = [
  "See? That wasn't so hard! 😄",
  "Now YOU press it!",
  "My job here is done 💪",
  "Best button ever, right?",
  "I could click this all day...",
  "Your turn now! 👆",
];

function WalkingStickman({ phase, legCycle }: { phase: WalkPhase; legCycle: number }) {
  const isWalking = phase === "entering" || phase === "walking" || phase === "approaching";
  const isClicking = phase === "clicking";
  const isCelebrating = phase === "celebrating";
  const isIdle = phase === "idle";

  const leftLegSwing = isWalking ? Math.sin(legCycle) * 22 : 0;
  const rightLegSwing = isWalking ? Math.sin(legCycle + Math.PI) * 22 : 0;
  const leftArmSwing = isWalking ? Math.sin(legCycle + Math.PI) * 18 : 0;
  const rightArmSwing = isWalking ? Math.sin(legCycle) * 18 : 0;
  const bodyBob = isWalking ? Math.abs(Math.sin(legCycle * 2)) * 3 : 0;

  return (
    <svg viewBox="0 0 120 200" className="w-full h-full" style={{ overflow: "visible" }}>
      <g transform={`translate(0, ${-bodyBob})`}>
        {/* Head */}
        <motion.circle
          cx="60" cy="35" r="18"
          fill="none" stroke="white" strokeWidth="2.5"
          animate={isCelebrating ? { cy: [35, 28, 35] } : {}}
          transition={{ duration: 0.4, repeat: isCelebrating ? 5 : 0 }}
        />
        {/* Eyes */}
        <circle cx={isClicking ? 53 : 55} cy={isClicking ? 33 : 31} r="2.5" fill="white" />
        <circle cx={isClicking ? 67 : 69} cy={isClicking ? 33 : 31} r="2.5" fill="white" />
        {/* Mouth */}
        {isCelebrating || isIdle ? (
          <path d="M 50 42 Q 60 52 70 42" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        ) : isClicking ? (
          <circle cx="60" cy="44" r="4" fill="none" stroke="white" strokeWidth="2" />
        ) : (
          <path d="M 52 42 Q 60 48 68 42" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* Body */}
        <line x1="60" y1="53" x2="60" y2="120" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left arm */}
        {isClicking ? (
          <path d="M 60 80 L 85 60 L 95 55" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        ) : isCelebrating ? (
          <motion.path
            d="M 60 80 L 30 55 L 20 40"
            fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
            animate={{ d: ["M 60 80 L 30 55 L 20 40", "M 60 80 L 28 50 L 15 35", "M 60 80 L 30 55 L 20 40"] }}
            transition={{ duration: 0.3, repeat: 8 }}
          />
        ) : (
          <line x1="60" y1="80" x2={40 + leftArmSwing} y2="110" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Right arm */}
        {isClicking ? (
          <>
            <motion.path
              d="M 60 80 L 90 65 L 100 58"
              fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
              animate={{ d: ["M 60 80 L 90 65 L 100 58", "M 60 80 L 90 68 L 102 62", "M 60 80 L 90 65 L 100 58"] }}
              transition={{ duration: 0.3, repeat: 2 }}
            />
            <motion.circle
              cx="100" cy="58" r="3" fill="#39FF14"
              animate={{ cx: [100, 102, 100], cy: [58, 62, 58] }}
              transition={{ duration: 0.3, repeat: 2 }}
            />
          </>
        ) : isCelebrating ? (
          <motion.path
            d="M 60 80 L 90 55 L 100 40"
            fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
            animate={{ d: ["M 60 80 L 90 55 L 100 40", "M 60 80 L 92 50 L 105 35", "M 60 80 L 90 55 L 100 40"] }}
            transition={{ duration: 0.3, repeat: 8 }}
          />
        ) : isIdle ? (
          <motion.path
            d="M 60 80 L 90 65 L 105 60"
            fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
            animate={{ d: ["M 60 80 L 90 65 L 105 60", "M 60 80 L 90 62 L 108 55", "M 60 80 L 90 65 L 105 60"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        ) : (
          <line x1="60" y1="80" x2={80 + rightArmSwing} y2="110" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {isIdle && (
          <motion.circle
            cx="108" cy="55" r="3" fill="#39FF14"
            animate={{ cx: [108, 111, 108], cy: [55, 52, 55], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Left leg */}
        <line x1="60" y1="120" x2={45 + leftLegSwing} y2="165" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={45 + leftLegSwing} y1="165" x2={35 + leftLegSwing} y2="165" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right leg */}
        <line x1="60" y1="120" x2={75 + rightLegSwing} y2="165" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={75 + rightLegSwing} y1="165" x2={85 + rightLegSwing} y2="165" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function StickmanCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  const [phase, setPhase] = useState<WalkPhase>("hidden");
  const [speechVisible, setSpeechVisible] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState("");
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [buttonPulse, setButtonPulse] = useState(false);
  const [userClickCount, setUserClickCount] = useState(0);
  const [legCycle, setLegCycle] = useState(0);

  const stickmanX = useMotionValue(-10);
  const smoothX = useSpring(stickmanX, { stiffness: 40, damping: 18, mass: 0.8 });
  const xPercent = useTransform(smoothX, v => `${v}%`);

  const rafRef = useRef<number>(0);
  const phaseRef = useRef<WalkPhase>("hidden");
  phaseRef.current = phase;

  useEffect(() => {
    let running = true;
    let prev = performance.now();
    const tick = (now: number) => {
      if (!running) return;
      const dt = (now - prev) / 1000;
      prev = now;
      const p = phaseRef.current;
      if (p === "entering" || p === "walking" || p === "approaching") {
        setLegCycle(c => c + dt * 10);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    if (!isInView || phase !== "hidden") return;
    const t = setTimeout(() => {
      setPhase("entering");
      setCurrentSpeech(SPEECH_BUBBLES.entering);
      setSpeechVisible(true);
      stickmanX.set(25);
    }, 600);
    return () => clearTimeout(t);
  }, [isInView, phase]);

  useEffect(() => {
    if (phase === "entering") {
      const t = setTimeout(() => {
        setPhase("walking");
        setCurrentSpeech(SPEECH_BUBBLES.walking);
        stickmanX.set(50);
      }, 1800);
      return () => clearTimeout(t);
    }
    if (phase === "walking") {
      const t = setTimeout(() => {
        setPhase("approaching");
        setCurrentSpeech(SPEECH_BUBBLES.approaching);
        stickmanX.set(65);
      }, 2200);
      return () => clearTimeout(t);
    }
    if (phase === "approaching") {
      const t = setTimeout(() => {
        setPhase("clicking");
        setCurrentSpeech(SPEECH_BUBBLES.clicking);
        setButtonPulse(true);
      }, 1800);
      return () => clearTimeout(t);
    }
    if (phase === "clicking") {
      const t = setTimeout(() => {
        setPhase("celebrating");
        setCurrentSpeech(SPEECH_BUBBLES.celebrating);
        setButtonPulse(false);
        spawnConfetti(25);
      }, 1000);
      return () => clearTimeout(t);
    }
    if (phase === "celebrating") {
      const t = setTimeout(() => {
        setPhase("idle");
        setCurrentSpeech(SPEECH_BUBBLES.idle);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "idle") return;
    const interval = setInterval(() => {
      setCurrentSpeech(prev => {
        const idx = POST_CLICK_MESSAGES.indexOf(prev);
        return POST_CLICK_MESSAGES[(idx + 1) % POST_CLICK_MESSAGES.length];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [phase]);

  const spawnConfetti = useCallback((count: number) => {
    const items = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 400,
      y: -(Math.random() * 250 + 50),
      color: ['#39FF14', '#ff0080', '#00d4ff', '#ffdd00', '#ff6600', '#c084fc'][Math.floor(Math.random() * 6)],
    }));
    setConfetti(items);
    setTimeout(() => setConfetti([]), 2500);
  }, []);

  const handleUserClick = () => {
    setUserClickCount(prev => prev + 1);
    spawnConfetti(20);
    const reactions = [
      "That's the spirit! 🎉",
      "You're a natural! 😎",
      "Hat-trick! 🔥",
      "We're best friends now!",
      "Unstoppable! 💪",
      "I love this human! ❤️",
    ];
    setCurrentSpeech(reactions[userClickCount % reactions.length]);
  };

  const footprintCount = phase === "hidden" ? 0 : phase === "entering" ? 3 : phase === "walking" ? 7 : 10;

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* Dotted path */}
      <div className="absolute bottom-[28%] left-0 right-0 pointer-events-none hidden md:block">
        <svg width="100%" height="4" className="opacity-[0.06]">
          <line x1="0" y1="2" x2="100%" y2="2" stroke="white" strokeWidth="1" strokeDasharray="6 8" />
        </svg>
      </div>

      {/* Footprints */}
      <div className="absolute bottom-[26%] left-0 pointer-events-none hidden md:block">
        {Array.from({ length: footprintCount }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.04, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className="absolute"
            style={{ left: `${i * 6 + 4}%`, bottom: i % 2 === 0 ? '2px' : '8px' }}
          >
            <div className="w-3 h-1.5 rounded-full bg-white" style={{ transform: `rotate(${i % 2 === 0 ? -10 : 10}deg)` }} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="relative min-h-[350px] md:min-h-[400px]">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-md"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-white mb-4 leading-tight">
              Ready to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#39FF14]/60"> Zatch</span>?
            </h3>
            <p className="text-base text-white/30 max-w-sm">
              Join thousands already transforming the way India shops.
            </p>
          </motion.div>

          {/* Walking Stickman (desktop) */}
          <motion.div
            className="absolute hidden md:block z-20"
            style={{
              left: xPercent,
              bottom: '10%',
              width: 80,
              height: 130,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "hidden" ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {speechVisible && currentSpeech && (
                <motion.div
                  key={currentSpeech}
                  initial={{ opacity: 0, scale: 0.7, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: -5 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap"
                >
                  <div className="px-3 py-1.5 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.12] shadow-[0_8px_25px_rgba(0,0,0,0.4)]">
                    <p className="text-[11px] text-white/80 font-medium">{currentSpeech}</p>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/[0.08] border-b border-r border-white/[0.12] rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-white/[0.04] rounded-full blur-[2px]" />
            <WalkingStickman phase={phase} legCycle={legCycle} />
          </motion.div>

          {/* Mobile stickman */}
          <motion.div
            className="md:hidden relative w-32 h-44 mx-auto my-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <AnimatePresence mode="wait">
              {speechVisible && currentSpeech && (
                <motion.div
                  key={currentSpeech}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap"
                >
                  <div className="px-3 py-1.5 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.12]">
                    <p className="text-[11px] text-white/80 font-medium">{currentSpeech}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <WalkingStickman phase={phase === "hidden" ? "idle" : phase} legCycle={legCycle} />
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 flex flex-col items-center md:items-end"
          >
            <div className="relative">
              <AnimatePresence>
                {confetti.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{ opacity: 0, x: c.x, y: c.y, scale: 0, rotate: Math.random() * 720 - 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 pointer-events-none z-50"
                  >
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: c.color }} />
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                className="absolute -inset-6 rounded-2xl border border-[#39FF14]/10"
                animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {buttonPulse && (
                <motion.div
                  className="absolute -inset-3 rounded-2xl bg-[#39FF14]/20 blur-xl"
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                />
              )}

              <motion.button
                onClick={handleUserClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                animate={buttonPulse ? { scale: [1, 0.95, 1.05, 1] } : {}}
                transition={buttonPulse ? { duration: 0.4 } : {}}
                className="relative px-10 md:px-12 py-5 md:py-6 rounded-2xl bg-[#39FF14] text-black font-bold text-lg md:text-xl flex items-center gap-3 shadow-[0_0_50px_rgba(57,255,20,0.2)] hover:shadow-[0_0_80px_rgba(57,255,20,0.4)] transition-shadow duration-500 group"
                data-testid="button-download-app"
              >
                <Download className="w-5 h-5 md:w-6 md:h-6" />
                Download the App
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              {userClickCount > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] text-white/15 text-center mt-3"
                >
                  Pressed {userClickCount} time{userClickCount > 1 ? 's' : ''} — stickman is proud of you
                </motion.p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3 text-[11px] text-white/15">
              <span>Free download</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>No ads</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>Available soon</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
