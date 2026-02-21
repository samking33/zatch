import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, ArrowDown, Sparkles, Check, Loader2 } from "lucide-react";

const SPEECH_BUBBLES = [
  "Hey you! Yes, YOU! 👀",
  "Press the button already!",
  "I've been waiting here all day...",
  "C'mon, it's free! 🎉",
  "Don't leave me hanging!",
  "My arm is getting tired 😩",
  "Just ONE click. Please?",
  "I promise it's worth it!",
  "Fine, I'll just stand here...",
  "*taps foot impatiently*",
];

const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`ABCDEFZatch";

function useTextScramble(text: string, isActive: boolean) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) { setDisplay(text); return; }
    let iteration = 0;
    const maxIterations = text.length * 2;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration / 2) return text[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      iteration++;
      if (iteration > maxIterations) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, isActive]);

  return display;
}

function MagneticButton({
  children,
  onClick,
  onHoverChange,
  className,
  disabled,
  ...props
}: {
  children: React.ReactNode;
  onClick: () => void;
  onHoverChange: (h: boolean) => void;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 200;
    if (dist < maxDist) {
      const pull = (1 - dist / maxDist) * 15;
      x.set((dx / dist) * pull);
      y.set((dy / dist) * pull);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [x, y, disabled]);

  const handleMouseLeave = () => { x.set(0); y.set(0); onHoverChange(false); };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.92 }}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function StickmanSVG({ isPointing, isJumping, isTapping }: { isPointing: boolean; isJumping: boolean; isTapping: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 200 300"
      className="w-full h-full"
      animate={isJumping ? { y: [0, -20, 0] } : isTapping ? { rotate: [0, -2, 2, -2, 0] } : {}}
      transition={isJumping ? { duration: 0.5, ease: "easeOut" } : { duration: 0.3 }}
    >
      <motion.circle cx="100" cy="50" r="25" fill="none" stroke="white" strokeWidth="3"
        animate={isTapping ? { cy: [50, 47, 50] } : {}} transition={{ duration: 0.3, repeat: isTapping ? 3 : 0 }} />
      <motion.circle cx="90" cy="45" r="3" fill="white" animate={{ cx: isPointing ? 93 : 90 }} transition={{ duration: 0.3 }} />
      <motion.circle cx="110" cy="45" r="3" fill="white" animate={{ cx: isPointing ? 113 : 110 }} transition={{ duration: 0.3 }} />
      <motion.path
        d={isPointing ? "M 88 58 Q 100 68 112 58" : "M 90 58 Q 100 65 110 58"}
        fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <motion.line x1="100" y1="75" x2="100" y2="170" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <motion.path
        d={isPointing ? "M 100 110 L 160 90 L 175 85" : "M 100 110 L 60 140"}
        fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"
        animate={isPointing ? { d: ["M 100 110 L 160 90 L 175 85", "M 100 110 L 160 85 L 178 78", "M 100 110 L 160 90 L 175 85"] } : {}}
        transition={{ duration: 0.8, repeat: isPointing ? Infinity : 0 }} />
      {isPointing && (
        <motion.circle cx="178" cy="78" r="4" fill="#39FF14"
          animate={{ cx: [178, 181, 178], cy: [78, 75, 78], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }} />
      )}
      <motion.path d={isPointing ? "M 100 110 L 70 145" : "M 100 110 L 140 140"} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <motion.line x1="100" y1="170" x2="70" y2="240" stroke="white" strokeWidth="3" strokeLinecap="round"
        animate={isTapping ? { x2: [70, 65, 70] } : {}} transition={{ duration: 0.4, repeat: isTapping ? 3 : 0 }} />
      <motion.line x1="70" y1="240" x2="55" y2="240" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <motion.line x1="100" y1="170" x2="130" y2="240" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <motion.line x1="130" y1="240" x2="145" y2="240" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  );
}

export function StickmanCTA() {
  const [speechIndex, setSpeechIndex] = useState(0);
  const [isPointing, setIsPointing] = useState(true);
  const [isJumping, setIsJumping] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; shape: 'circle' | 'square' | 'star' }[]>([]);
  const [particles, setParticles] = useState<{ id: number; angle: number; dist: number }[]>([]);

  const scrambledText = useTextScramble("Download the App", buttonHovered && !downloading && !downloadComplete);

  useEffect(() => {
    const interval = setInterval(() => {
      if (downloading || downloadComplete) return;
      setSpeechIndex(prev => (prev + 1) % SPEECH_BUBBLES.length);
      const action = Math.random();
      if (action < 0.3) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 600);
      } else if (action < 0.6) {
        setIsTapping(true);
        setTimeout(() => setIsTapping(false), 1500);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [downloading, downloadComplete]);

  useEffect(() => {
    setIsPointing(!buttonHovered);
    if (buttonHovered) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        angle: (i / 8) * Math.PI * 2,
        dist: 30 + Math.random() * 20,
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [buttonHovered]);

  const spawnConfetti = () => {
    const shapes: ('circle' | 'square' | 'star')[] = ['circle', 'square', 'star'];
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 400,
      y: -(Math.random() * 250 + 80),
      color: ['#39FF14', '#ff0080', '#00d4ff', '#ffdd00', '#ff6600', '#c084fc', '#00ff88'][Math.floor(Math.random() * 7)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 2500);
  };

  const handleClick = () => {
    if (downloading) return;

    setClicked(true);
    setClickCount(prev => prev + 1);
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);

    if (!downloadComplete) {
      setDownloading(true);
      setDownloadProgress(0);

      const duration = 2500;
      const steps = 40;
      const stepTime = duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const progress = Math.min(100, (step / steps) * 100 + (Math.random() - 0.3) * 8);
        setDownloadProgress(Math.min(100, Math.round(progress)));

        if (step >= steps) {
          clearInterval(interval);
          setDownloadProgress(100);
          setDownloading(false);
          setDownloadComplete(true);
          spawnConfetti();
          setIsJumping(true);
          setTimeout(() => setIsJumping(false), 600);
        }
      }, stepTime);
    } else {
      spawnConfetti();
    }
  };

  const clickMessages = [
    "",
    "Ooh downloading... exciting!!! 🎉",
    "Again?! You're my favorite person!",
    "Hat-trick! You're on fire! 🔥",
    "Stop, you're making me blush 😊",
    "Okay now you're just showing off...",
    "I could do this all day! 💪",
  ];

  const downloadMessages = [
    "Loading the magic...",
    "Almost there...",
    "Packing your deals...",
  ];

  const currentSpeech = downloading
    ? downloadMessages[Math.floor(downloadProgress / 35) % downloadMessages.length]
    : downloadComplete && clickCount <= 1
    ? "YESSS! You did it! 🎉"
    : clicked && clickCount <= 6
    ? clickMessages[Math.min(clickCount, clickMessages.length - 1)]
    : SPEECH_BUBBLES[speechIndex];

  return (
    <section id="download" className="py-24 md:py-32 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Stickman */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-48 md:w-64 h-64 md:h-80 shrink-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${downloading}-${downloadComplete}-${clickCount}-${speechIndex}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-8 md:top-0 z-10"
              >
                <div className="relative px-4 py-2.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/[0.1] max-w-[220px] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  <p className="text-[12px] text-white/80 font-medium whitespace-nowrap">{currentSpeech}</p>
                  <div className="absolute -bottom-1.5 left-8 w-3 h-3 bg-white/[0.06] border-b border-r border-white/[0.1] rotate-45 backdrop-blur-md" />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-3 bg-white/[0.03] rounded-full blur-sm" />
            <div className="relative w-full h-full pt-12">
              <StickmanSVG isPointing={isPointing} isJumping={isJumping} isTapping={isTapping} />
            </div>
          </motion.div>

          {/* CTA Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center md:text-left"
          >
            <h3 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white mb-4 leading-tight">
              Ready to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#39FF14]/60"> Zatch</span>?
            </h3>
            <p className="text-base text-white/30 mb-10 max-w-md">
              Join thousands of sellers and buyers already transforming the way India shops.
            </p>

            {/* The Button Container */}
            <div className="relative inline-block">
              {/* Confetti */}
              <AnimatePresence>
                {confetti.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                    animate={{ opacity: 0, x: c.x, y: c.y, scale: 0, rotate: Math.random() * 1080 - 540 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 pointer-events-none z-50"
                  >
                    {c.shape === 'circle' && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />}
                    {c.shape === 'square' && <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: c.color }} />}
                    {c.shape === 'star' && (
                      <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 6.5,3.5 10,4 7.5,6.5 8,10 5,8 2,10 2.5,6.5 0,4 3.5,3.5" fill={c.color} /></svg>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Orbiting particles on hover */}
              <AnimatePresence>
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0.8, 0],
                      scale: [0, 1, 1, 0],
                      x: [0, Math.cos(p.angle) * p.dist, Math.cos(p.angle + 1) * (p.dist + 10), Math.cos(p.angle + 2) * (p.dist + 20)],
                      y: [0, Math.sin(p.angle) * p.dist, Math.sin(p.angle + 1) * (p.dist + 10), Math.sin(p.angle + 2) * (p.dist + 20)],
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 pointer-events-none z-40"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] shadow-[0_0_6px_#39FF14]" />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Pulsing rings */}
              {!downloadComplete && (
                <>
                  <motion.div
                    className="absolute -inset-3 rounded-2xl border border-[#39FF14]/15"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -inset-6 rounded-3xl border border-[#39FF14]/8"
                    animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.div
                    className="absolute -inset-10 rounded-[2rem] border border-[#39FF14]/4"
                    animate={{ scale: [1, 1.04, 1], opacity: [0.15, 0, 0.15] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                  />
                </>
              )}

              {/* Animated arrow */}
              {!downloading && !downloadComplete && (
                <motion.div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 hidden md:block"
                  animate={{ y: [0, 6, 0], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <ArrowDown className="w-5 h-5 text-[#39FF14]" />
                </motion.div>
              )}

              {/* Animated border glow (conic gradient chase) */}
              <div className="absolute -inset-[2px] rounded-2xl overflow-hidden z-0">
                <motion.div
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: downloading
                      ? `conic-gradient(from 0deg, #39FF14, #00d4ff, #39FF14, transparent 60%)`
                      : buttonHovered
                      ? `conic-gradient(from 0deg, #39FF14, #ffdd00, #ff6600, #ff0080, #c084fc, #00d4ff, #39FF14)`
                      : `conic-gradient(from 0deg, rgba(57,255,20,0.3), transparent 30%, rgba(57,255,20,0.3) 50%, transparent 80%)`,
                  }}
                />
              </div>

              {/* THE BUTTON */}
              <MagneticButton
                onClick={handleClick}
                onHoverChange={setButtonHovered}
                disabled={downloading}
                className={`relative z-10 px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all duration-500 overflow-hidden ${
                  downloadComplete
                    ? 'bg-[#39FF14] text-black shadow-[0_0_60px_rgba(57,255,20,0.4)]'
                    : downloading
                    ? 'bg-[#111] text-white/80 cursor-wait'
                    : 'bg-[#0a0a0a] text-white hover:text-[#39FF14] shadow-[0_0_40px_rgba(57,255,20,0.15)] hover:shadow-[0_0_80px_rgba(57,255,20,0.3)]'
                }`}
                data-testid="button-download-app"
              >
                {/* Inner glow on hover */}
                {buttonHovered && !downloading && !downloadComplete && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/5 via-[#39FF14]/10 to-[#39FF14]/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                {/* Progress bar inside button */}
                {downloading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/20 to-[#39FF14]/10 pointer-events-none origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: downloadProgress / 100 }}
                    transition={{ duration: 0.1 }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  className="relative z-10"
                  animate={
                    downloading
                      ? { rotate: 360 }
                      : downloadComplete
                      ? { scale: [1, 1.3, 1], rotate: [0, 0, 0] }
                      : buttonHovered
                      ? { y: [0, 3, 0], rotate: [0, -5, 5, 0] }
                      : { y: [0, 2, 0] }
                  }
                  transition={
                    downloading
                      ? { duration: 1, repeat: Infinity, ease: "linear" }
                      : downloadComplete
                      ? { duration: 0.5 }
                      : { duration: buttonHovered ? 0.6 : 2, repeat: Infinity }
                  }
                >
                  {downloading ? (
                    <Loader2 className="w-5 h-5" />
                  ) : downloadComplete ? (
                    <Check className="w-5 h-5" strokeWidth={3} />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                </motion.div>

                {/* Text */}
                <span className="relative z-10 font-mono tracking-wide">
                  {downloading
                    ? `${downloadProgress}%`
                    : downloadComplete
                    ? "Downloaded!"
                    : scrambledText}
                </span>

                {/* Sparkle on hover */}
                {!downloading && (
                  <motion.div
                    className="relative z-10"
                    animate={buttonHovered ? { rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] } : { opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className={`w-4 h-4 ${buttonHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                  </motion.div>
                )}
              </MagneticButton>

              {/* Click counter */}
              <AnimatePresence>
                {clickCount > 0 && !downloading && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center"
                  >
                    <span className="text-[11px] text-white/20">
                      {downloadComplete
                        ? clickCount > 1
                          ? `Clicked ${clickCount} times — our stickman is thrilled`
                          : "Our stickman can finally rest 😌"
                        : `Downloading...`}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trust line */}
            <div className="mt-8 flex items-center gap-4 justify-center md:justify-start text-[11px] text-white/15">
              <span className="flex items-center gap-1"><Download className="w-3 h-3" /> Free download</span>
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
