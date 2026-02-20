import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowDown, Sparkles } from "lucide-react";

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

function StickmanSVG({ isPointing, isJumping, isTapping }: { isPointing: boolean; isJumping: boolean; isTapping: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 200 300"
      className="w-full h-full"
      animate={isJumping ? { y: [0, -20, 0] } : isTapping ? { rotate: [0, -2, 2, -2, 0] } : {}}
      transition={isJumping ? { duration: 0.5, ease: "easeOut" } : { duration: 0.3 }}
    >
      {/* Head */}
      <motion.circle
        cx="100"
        cy="50"
        r="25"
        fill="none"
        stroke="white"
        strokeWidth="3"
        animate={isTapping ? { cy: [50, 47, 50] } : {}}
        transition={{ duration: 0.3, repeat: isTapping ? 3 : 0 }}
      />
      {/* Eyes */}
      <motion.circle cx="90" cy="45" r="3" fill="white"
        animate={{ cx: isPointing ? 93 : 90 }}
        transition={{ duration: 0.3 }}
      />
      <motion.circle cx="110" cy="45" r="3" fill="white"
        animate={{ cx: isPointing ? 113 : 110 }}
        transition={{ duration: 0.3 }}
      />
      {/* Mouth */}
      <motion.path
        d={isPointing ? "M 88 58 Q 100 68 112 58" : "M 90 58 Q 100 65 110 58"}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Body */}
      <motion.line x1="100" y1="75" x2="100" y2="170" stroke="white" strokeWidth="3" strokeLinecap="round" />

      {/* Left arm - pointing right toward button */}
      <motion.path
        d={isPointing ? "M 100 110 L 160 90 L 175 85" : "M 100 110 L 60 140"}
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        animate={isPointing ? { d: ["M 100 110 L 160 90 L 175 85", "M 100 110 L 160 85 L 178 78", "M 100 110 L 160 90 L 175 85"] } : {}}
        transition={{ duration: 0.8, repeat: isPointing ? Infinity : 0 }}
      />
      {/* Pointing hand / finger */}
      {isPointing && (
        <motion.circle
          cx="178"
          cy="78"
          r="4"
          fill="#39FF14"
          animate={{ cx: [178, 181, 178], cy: [78, 75, 78], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}

      {/* Right arm */}
      <motion.path
        d={isPointing ? "M 100 110 L 70 145" : "M 100 110 L 140 140"}
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Left leg */}
      <motion.line x1="100" y1="170" x2="70" y2="240" stroke="white" strokeWidth="3" strokeLinecap="round"
        animate={isTapping ? { x2: [70, 65, 70] } : {}}
        transition={{ duration: 0.4, repeat: isTapping ? 3 : 0 }}
      />
      {/* Left foot */}
      <motion.line x1="70" y1="240" x2="55" y2="240" stroke="white" strokeWidth="3" strokeLinecap="round" />

      {/* Right leg */}
      <motion.line x1="100" y1="170" x2="130" y2="240" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Right foot */}
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
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
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
  }, []);

  useEffect(() => {
    setIsPointing(!buttonHovered);
    if (buttonHovered) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
    }
  }, [buttonHovered]);

  const handleClick = () => {
    setClicked(true);
    setClickCount(prev => prev + 1);

    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 300,
      y: -(Math.random() * 200 + 50),
      color: ['#39FF14', '#ff0080', '#00d4ff', '#ffdd00', '#ff6600', '#c084fc'][Math.floor(Math.random() * 6)],
    }));
    setConfetti(newConfetti);

    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);
    setTimeout(() => setConfetti([]), 2000);
  };

  const clickMessages = [
    "",
    "YESSS! That's what I'm talking about! 🎉",
    "Again?! You're my favorite person!",
    "Hat-trick! You're on fire! 🔥",
    "Stop, you're making me blush 😊",
    "Okay now you're just showing off...",
    "I could do this all day! 💪",
  ];

  return (
    <section className="py-24 md:py-32 bg-[#030303] relative overflow-hidden">
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
            {/* Speech bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={clicked && clickCount <= 6 ? `click-${clickCount}` : speechIndex}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-8 md:top-0 z-10"
              >
                <div className="relative px-4 py-2.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/[0.1] max-w-[200px] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  <p className="text-[12px] text-white/80 font-medium whitespace-nowrap">
                    {clicked && clickCount <= 6 ? clickMessages[clickCount] : SPEECH_BUBBLES[speechIndex]}
                  </p>
                  <div className="absolute -bottom-1.5 left-8 w-3 h-3 bg-white/[0.06] border-b border-r border-white/[0.1] rotate-45 backdrop-blur-md" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Shadow under stickman */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-3 bg-white/[0.03] rounded-full blur-sm" />

            {/* The stickman */}
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
            <div className="relative inline-block">
              {/* Peeping stickmen on top of text */}
              {/* Stickman 1 - peeking from behind "Ready" */}
              <motion.svg
                viewBox="0 0 60 80"
                className="absolute -top-10 left-[15%] w-8 md:w-10 h-auto z-10 pointer-events-none"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
              >
                <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                  <circle cx="30" cy="18" r="10" fill="none" stroke="white" strokeWidth="2.5" />
                  <circle cx="26" cy="16" r="2" fill="white" />
                  <circle cx="34" cy="16" r="2" fill="white" />
                  <path d="M 24 22 Q 30 28 36 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="30" y1="28" x2="30" y2="52" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="30" y1="35" x2="18" y2="48" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <motion.line x1="30" y1="35" x2="42" y2="28" stroke="white" strokeWidth="2.5" strokeLinecap="round"
                    animate={{ x2: [42, 44, 42], y2: [28, 25, 28] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.g>
              </motion.svg>

              {/* Stickman 2 - hanging off the "t" in "to" */}
              <motion.svg
                viewBox="0 0 50 90"
                className="absolute -top-8 left-[52%] md:left-[48%] w-6 md:w-8 h-auto z-10 pointer-events-none"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, type: "spring", bounce: 0.5 }}
              >
                <motion.g animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: "25px 10px" }}>
                  <line x1="25" y1="0" x2="25" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="25" cy="22" r="9" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="22" cy="20" r="1.5" fill="white" />
                  <circle cx="28" cy="20" r="1.5" fill="white" />
                  <path d="M 21 26 Q 25 30 29 26" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="25" y1="31" x2="25" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="25" y1="40" x2="15" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="25" y1="40" x2="35" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <motion.line x1="25" y1="55" x2="18" y2="72" stroke="white" strokeWidth="2" strokeLinecap="round"
                    animate={{ x2: [18, 15, 18] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.line x1="25" y1="55" x2="32" y2="72" stroke="white" strokeWidth="2" strokeLinecap="round"
                    animate={{ x2: [32, 35, 32] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.g>
              </motion.svg>

              {/* Stickman 3 - peeking from the right side of "Zatch?" with binoculars */}
              <motion.svg
                viewBox="0 0 70 70"
                className="absolute -top-9 right-[5%] md:right-[10%] w-8 md:w-10 h-auto z-10 pointer-events-none"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
              >
                <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                  <circle cx="35" cy="18" r="10" fill="none" stroke="white" strokeWidth="2.5" />
                  {/* Binoculars */}
                  <rect x="22" y="12" width="8" height="6" rx="3" fill="none" stroke="#39FF14" strokeWidth="1.5" />
                  <rect x="34" y="12" width="8" height="6" rx="3" fill="none" stroke="#39FF14" strokeWidth="1.5" />
                  <line x1="30" y1="15" x2="34" y2="15" stroke="#39FF14" strokeWidth="1.5" />
                  <path d="M 28 24 Q 35 28 42 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="35" y1="28" x2="35" y2="52" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="35" y1="38" x2="48" y2="45" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="35" y1="38" x2="22" y2="45" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </motion.g>
              </motion.svg>

              {/* Stickman 4 - tiny one sitting on the "Z" */}
              <motion.svg
                viewBox="0 0 40 55"
                className="absolute -top-6 left-[62%] md:left-[57%] w-5 md:w-7 h-auto z-10 pointer-events-none"
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, type: "spring", bounce: 0.5 }}
              >
                <motion.g animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 4, repeat: Infinity }} style={{ transformOrigin: "20px 30px" }}>
                  <circle cx="20" cy="10" r="7" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="17" cy="9" r="1.5" fill="white" />
                  <circle cx="23" cy="9" r="1.5" fill="white" />
                  <path d="M 16 14 Q 20 17 24 14" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="20" y1="17" x2="20" y2="35" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <motion.line x1="20" y1="24" x2="10" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"
                    animate={{ y2: [20, 17, 20] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <line x1="20" y1="24" x2="30" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  {/* Sitting legs */}
                  <path d="M 20 35 L 12 42 L 8 40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 20 35 L 28 42 L 32 40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </motion.g>
              </motion.svg>

              <h3 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white mb-4 leading-tight">
                Ready to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#39FF14]/60"> Zatch</span>?
              </h3>
            </div>
            <p className="text-base text-white/30 mb-8 max-w-md">
              Join thousands of sellers and buyers already transforming the way India shops.
            </p>

            {/* The Button */}
            <div className="relative inline-block">
              {/* Confetti */}
              <AnimatePresence>
                {confetti.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                    animate={{
                      opacity: 0,
                      x: c.x,
                      y: c.y,
                      scale: 0,
                      rotate: Math.random() * 720 - 360,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 pointer-events-none z-50"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Animated rings around button */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-[#39FF14]/10"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-[#39FF14]/5"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />

              {/* Arrow pointing at button */}
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 hidden md:block"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5 text-[#39FF14]/40" />
              </motion.div>

              <motion.button
                onClick={handleClick}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-5 rounded-2xl bg-[#39FF14] text-black font-bold text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(57,255,20,0.25)] hover:shadow-[0_0_80px_rgba(57,255,20,0.4)] transition-shadow duration-500 group"
                data-testid="button-download-app"
              >
                <motion.div
                  animate={buttonHovered ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Download className="w-5 h-5" />
                </motion.div>
                Download the App
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              {clickCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center"
                >
                  <span className="text-[11px] text-white/20">
                    Clicked {clickCount} time{clickCount > 1 ? 's' : ''} — our stickman approves
                  </span>
                </motion.div>
              )}
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
