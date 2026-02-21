import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Terminal, ExternalLink } from "lucide-react";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";

const TERMINAL_SEQUENCE: { type: "cmd" | "output" | "success" | "data" | "ascii" | "prompt"; text: string; delay: number }[] = [
  { type: "cmd", text: "> zatch.init --protocol=live-bargain", delay: 0 },
  { type: "output", text: "  Connecting to Zatch™ network...", delay: 800 },
  { type: "success", text: "  ✓ Connected. 12,847 sellers online.", delay: 1600 },
  { type: "cmd", text: "> scan --market=india --mode=realtime", delay: 2800 },
  { type: "data", text: "  ┌─────────────────────────────────────────┐", delay: 3500 },
  { type: "data", text: "  │  LIVE DEALS          ████████░░  82%    │", delay: 3700 },
  { type: "data", text: "  │  AVG SAVINGS         ₹340 per order     │", delay: 3900 },
  { type: "data", text: "  │  ACTIVE BARGAINS     2,491 right now    │", delay: 4100 },
  { type: "data", text: "  │  BUYER SATISFACTION  ★★★★★  98.2%       │", delay: 4300 },
  { type: "data", text: "  └─────────────────────────────────────────┘", delay: 4500 },
  { type: "cmd", text: "> analyze --savings-potential --user=you", delay: 5500 },
  { type: "output", text: "  Calculating your potential savings...", delay: 6200 },
  { type: "success", text: "  ✓ You could save ₹4,200/month with live bargaining.", delay: 7000 },
  { type: "cmd", text: "> zatch.download --platform=android", delay: 8200 },
  { type: "ascii", text: "", delay: 9000 },
  { type: "success", text: "  ✓ Ready. The future of shopping awaits.", delay: 9800 },
  { type: "prompt", text: "  [ENTER] to download →", delay: 10500 },
];

const ZATCH_ASCII = `
   ███████╗ █████╗ ████████╗ ██████╗██╗  ██╗
   ╚══███╔╝██╔══██╗╚══██╔══╝██╔════╝██║  ██║
     ███╔╝ ███████║   ██║   ██║     ███████║
    ███╔╝  ██╔══██║   ██║   ██║     ██╔══██║
   ███████╗██║  ██║   ██║   ╚██████╗██║  ██║
   ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝`;

function TypedText({ text, onComplete, speed = 25 }: { text: string; onComplete?: () => void; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse text-[#39FF14]">█</span>}
    </span>
  );
}

function MatrixRain() {
  const chars = "01アイウエオカキクケコサシスセソZATCH₹★";
  const columns = 30;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      {Array.from({ length: columns }).map((_, i) => {
        const left = `${(i / columns) * 100}%`;
        const animDuration = 8 + Math.random() * 12;
        const delay = Math.random() * 5;
        const charCount = 10 + Math.floor(Math.random() * 15);

        return (
          <motion.div
            key={i}
            className="absolute text-[10px] text-[#39FF14] font-mono leading-[1.2] whitespace-pre"
            style={{ left, top: "-20%" }}
            animate={{ y: ["0%", "120vh"] }}
            transition={{ duration: animDuration, delay, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: charCount }).map((_, j) => (
              <div key={j}>{chars[Math.floor(Math.random() * chars.length)]}</div>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent pointer-events-none z-20"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    />
  );
}

function DataStream({ side }: { side: "left" | "right" }) {
  const items = side === "left"
    ? ["₹899 → ₹650", "LIVE: Silk Sarees", "Deal closed ✓", "Buyer saved ₹349", "New seller joined", "Rating: ★★★★★", "₹2,400 → ₹1,800", "Auto-negotiate ON"]
    : ["Payment: ₹1,200", "Viewers: 1,847", "Offer: ₹750", "Counter: ₹890", "SOLD × 3", "Shipping: Free", "₹4,500 → ₹3,200", "Trust score: 98%"];

  return (
    <div className={`absolute top-0 bottom-0 ${side === "left" ? "left-0" : "right-0"} w-36 md:w-44 overflow-hidden pointer-events-none hidden lg:block`}>
      <motion.div
        className="flex flex-col gap-8"
        animate={{ y: [0, -400] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className={`text-[10px] font-mono ${side === "left" ? "text-right pr-8" : "text-left pl-8"} ${
              item.includes("✓") || item.includes("SOLD") ? "text-[#39FF14]/20" : "text-white/[0.06]"
            }`}
          >
            {item}
          </div>
        ))}
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-${side === "left" ? "r" : "l"} from-[#030303] via-[#030303]/80 to-transparent`} />
    </div>
  );
}

export function StickmanCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [hovering, setHovering] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView) return;

    TERMINAL_SEQUENCE.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
        if (index === TERMINAL_SEQUENCE.length - 1) {
          setSequenceComplete(true);
        }
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, line.delay);
    });
  }, [isInView]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "cmd": return "text-[#39FF14]";
      case "output": return "text-white/40";
      case "success": return "text-[#39FF14]/80";
      case "data": return "text-cyan-400/50";
      case "ascii": return "text-[#39FF14]";
      case "prompt": return "text-[#39FF14] font-bold";
      default: return "text-white/30";
    }
  };

  return (
    <section id="download" ref={ref} className="py-24 md:py-36 bg-[#030303] relative overflow-hidden">
      <MatrixRain />
      <ScanLine />
      <DataStream side="left" />
      <DataStream side="right" />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 hidden md:block pointer-events-none">
        <div className="w-16 h-16 border-l-2 border-t-2 border-[#39FF14]/10 rounded-tl-lg" />
      </div>
      <div className="absolute top-8 right-8 hidden md:block pointer-events-none">
        <div className="w-16 h-16 border-r-2 border-t-2 border-[#39FF14]/10 rounded-tr-lg" />
      </div>
      <div className="absolute bottom-8 left-8 hidden md:block pointer-events-none">
        <div className="w-16 h-16 border-l-2 border-b-2 border-[#39FF14]/10 rounded-bl-lg" />
      </div>
      <div className="absolute bottom-8 right-8 hidden md:block pointer-events-none">
        <div className="w-16 h-16 border-r-2 border-b-2 border-[#39FF14]/10 rounded-br-lg" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#39FF14]/10 bg-[#39FF14]/[0.03] mb-6">
            <Terminal className="w-3.5 h-3.5 text-[#39FF14]/60" />
            <span className="text-[11px] font-mono text-[#39FF14]/60 tracking-widest uppercase">System Terminal</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-white leading-tight" data-testid="text-download-heading">
            Initializing the Future<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] via-[#39FF14] to-[#00d4ff]">of Shopping</span>
          </h3>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glow behind terminal */}
          <div className="absolute -inset-4 bg-[#39FF14]/[0.02] blur-3xl rounded-3xl pointer-events-none" />

          <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0a0a0a] shadow-[0_0_100px_rgba(0,0,0,0.6),0_0_40px_rgba(57,255,20,0.03)]">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111]/80 border-b border-white/[0.06]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors" />
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-white/20" />
                <span className="text-[11px] font-mono text-white/25">zatch@terminal ~ %</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#39FF14]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[9px] font-mono text-[#39FF14]/40">LIVE</span>
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="p-5 md:p-6 font-mono text-[11px] md:text-[13px] leading-relaxed h-[360px] md:h-[420px] overflow-y-auto scrollbar-none"
              style={{ scrollBehavior: "smooth" }}
            >
              <AnimatePresence mode="sync">
                {visibleLines.map((lineIdx) => {
                  const line = TERMINAL_SEQUENCE[lineIdx];
                  return (
                    <motion.div
                      key={lineIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${getLineColor(line.type)} mb-1 whitespace-pre-wrap`}
                    >
                      {line.type === "ascii" ? (
                        <pre className="text-[6px] md:text-[8px] leading-[1.1] text-[#39FF14]/70 my-2">{ZATCH_ASCII}</pre>
                      ) : line.type === "cmd" ? (
                        <TypedText text={line.text} speed={20} />
                      ) : line.type === "prompt" ? (
                        <motion.span
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {line.text}
                        </motion.span>
                      ) : (
                        <span>{line.text}</span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Blinking cursor at bottom */}
              {!sequenceComplete && visibleLines.length > 0 && (
                <motion.span
                  className="text-[#39FF14] inline-block"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  █
                </motion.span>
              )}
            </div>

            {/* Download action bar */}
            <AnimatePresence>
              {sequenceComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  className="border-t border-white/[0.06] bg-[#39FF14]/[0.02] p-4 md:p-5"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href={PLAYSTORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex-1 sm:flex-none"
                      data-testid="button-download-app"
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                    >
                      <div className="absolute -inset-[1px] rounded-xl overflow-hidden">
                        <motion.div
                          className="w-full h-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          style={{ background: hovering
                            ? 'conic-gradient(from 0deg, #39FF14, #00d4ff, #ff0080, #ffdd00, #39FF14)'
                            : 'conic-gradient(from 0deg, #39FF14, transparent 40%, #39FF14 50%, transparent 90%)'
                          }}
                        />
                      </div>
                      <div className="relative bg-[#39FF14] text-black px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-3 justify-center group-hover:shadow-[0_0_40px_rgba(57,255,20,0.3)] transition-all duration-300 group-hover:scale-[1.02] active:scale-95 w-full sm:w-auto">
                        <motion.span
                          className="font-mono"
                          animate={hovering ? { letterSpacing: ["0em", "0.05em", "0em"] } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          $ execute download
                        </motion.span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-white/20">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]/40" />
                        v2.4.1
                      </span>
                      <span>|</span>
                      <span>12MB</span>
                      <span>|</span>
                      <span>Android 8+</span>
                      <a
                        href={PLAYSTORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-1 text-[#39FF14]/40 hover:text-[#39FF14]/80 transition-colors ml-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Play Store
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                "from-[#39FF14]/30 to-[#00d4ff]/30",
                "from-pink-500/30 to-purple-500/30",
                "from-amber-500/30 to-orange-500/30",
                "from-cyan-500/30 to-blue-500/30",
              ].map((gradient, i) => (
                <div key={i} className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} border-2 border-[#030303] flex items-center justify-center`}>
                  <span className="text-[8px] text-white/60 font-bold">{["R", "P", "S", "A"][i]}</span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-[11px] text-white/40 font-semibold">12,000+ downloads</p>
              <p className="text-[9px] text-white/20">and counting...</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-6 bg-white/[0.06]" />

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => (
                <motion.span
                  key={i}
                  className="text-[12px]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2 + i * 0.1, type: "spring", bounce: 0.6 }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>
            <span className="text-[11px] text-white/30">4.8 on Play Store</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
