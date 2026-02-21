import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";
const HOLD_DURATION = 1400;

type GatewayState = "idle" | "proximity" | "unlocking" | "unlocked";

export function StickmanCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [state, setState] = useState<GatewayState>("idle");
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (unlockTimerRef.current) {
      clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
  }, []);

  const handleCenterEnter = useCallback(() => {
    if (state === "unlocked") return;
    clearTimers();
    setState("proximity");

    holdTimerRef.current = setTimeout(() => {
      setState("unlocking");
      unlockTimerRef.current = setTimeout(() => {
        setState("unlocked");
      }, HOLD_DURATION);
    }, 300);
  }, [state, clearTimers]);

  const handleCenterLeave = useCallback(() => {
    if (state === "unlocked") return;
    clearTimers();
    setState("idle");
  }, [state, clearTimers]);

  const handleTouchUnlock = useCallback(() => {
    if (state === "unlocked") return;
    clearTimers();
    setState("unlocked");
  }, [state, clearTimers]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const isOpen = state === "unlocked";
  const isActive = state === "proximity" || state === "unlocking";
  const isUnlocking = state === "unlocking";

  return (
    <section id="download" ref={ref} className="py-20 md:py-28 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] transition-opacity duration-1000"
          style={{
            background: "radial-gradient(circle, rgba(202,254,56,0.02) 0%, transparent 70%)",
            opacity: isOpen ? 1 : 0.4,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[0.95]" data-testid="text-download-heading">
            Enter the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cafe38] via-[#cafe38] to-[#cafe38]/60">
              Zatch&trade; Ecosystem
            </span>
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/30 text-sm md:text-base mt-4 font-display"
          >
            Where live commerce becomes a system.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="relative w-full max-w-[600px] h-[320px] md:h-[380px] flex items-center justify-center">
            <motion.div
              className="absolute h-[260px] md:h-[300px] w-[42%] rounded-2xl border overflow-hidden"
              style={{ left: 0 }}
              animate={{
                x: isOpen ? "-8%" : isActive ? "2%" : "5%",
                borderColor: isActive
                  ? "rgba(202,254,56,0.2)"
                  : "rgba(255,255,255,0.06)",
                boxShadow: isActive
                  ? "inset -4px 0 20px rgba(202,254,56,0.06), 0 0 40px rgba(0,0,0,0.3)"
                  : "0 0 30px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-[#0a1a0a]/80 backdrop-blur-md" />
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#cafe38]/40" />
                    <span className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em]">Buyer World</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/[0.04] rounded-full w-4/5" />
                    <div className="h-2 bg-white/[0.03] rounded-full w-3/5" />
                    <div className="h-2 bg-white/[0.02] rounded-full w-4/6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-white/[0.03] rounded-full w-2/3" />
                  <div className="h-1.5 bg-white/[0.02] rounded-full w-1/2" />
                </div>
              </div>
              <div
                className="absolute top-0 right-0 w-px h-full transition-opacity duration-500"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(202,254,56,0.3), transparent)",
                  opacity: isActive ? 1 : 0,
                }}
              />
            </motion.div>

            <motion.div
              className="absolute h-[260px] md:h-[300px] w-[42%] rounded-2xl border overflow-hidden"
              style={{ right: 0 }}
              animate={{
                x: isOpen ? "8%" : isActive ? "-2%" : "-5%",
                borderColor: isActive
                  ? "rgba(202,254,56,0.2)"
                  : "rgba(255,255,255,0.06)",
                boxShadow: isActive
                  ? "inset 4px 0 20px rgba(202,254,56,0.06), 0 0 40px rgba(0,0,0,0.3)"
                  : "0 0 30px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.04] to-[#0a1a0a]/80 backdrop-blur-md" />
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 justify-end">
                    <span className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em]">Seller World</span>
                    <div className="w-2 h-2 rounded-full bg-[#cafe38]/40" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/[0.04] rounded-full w-4/5 ml-auto" />
                    <div className="h-2 bg-white/[0.03] rounded-full w-3/5 ml-auto" />
                    <div className="h-2 bg-white/[0.02] rounded-full w-4/6 ml-auto" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 bg-white/[0.03] rounded-full w-2/3 ml-auto" />
                  <div className="h-1.5 bg-white/[0.02] rounded-full w-1/2 ml-auto" />
                </div>
              </div>
              <div
                className="absolute top-0 left-0 w-px h-full transition-opacity duration-500"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(202,254,56,0.3), transparent)",
                  opacity: isActive ? 1 : 0,
                }}
              />
            </motion.div>

            <div
              className="absolute inset-0 z-20 flex items-center justify-center"
              style={{ left: "25%", right: "25%", width: "50%" }}
              onMouseEnter={handleCenterEnter}
              onMouseLeave={handleCenterLeave}
              onTouchStart={handleTouchUnlock}
            >
              {!isOpen && (
                <div className="absolute w-16 h-16 md:w-20 md:h-20">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                    <circle
                      cx="20" cy="20" r="17"
                      fill="none"
                      stroke="rgba(202,254,56,0.1)"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="20" cy="20" r="17"
                      fill="none"
                      stroke="#cafe38"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="106.8 106.8"
                      strokeDashoffset={isUnlocking ? "0" : "106.8"}
                      style={{
                        transition: isUnlocking
                          ? `stroke-dashoffset ${HOLD_DURATION}ms linear`
                          : "stroke-dashoffset 200ms ease-out",
                        filter: "drop-shadow(0 0 4px rgba(202,254,56,0.5))",
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </svg>
                </div>
              )}

              <div
                className="w-3 h-3 rounded-full transition-all duration-600"
                style={{
                  transform: `scale(${isOpen ? 2 : isActive ? 1.5 : 1})`,
                  backgroundColor: isOpen
                    ? "rgba(202,254,56,0.6)"
                    : isActive
                      ? "rgba(202,254,56,0.3)"
                      : "rgba(255,255,255,0.1)",
                  boxShadow: isOpen
                    ? "0 0 30px rgba(202,254,56,0.4), 0 0 60px rgba(202,254,56,0.2)"
                    : isActive
                      ? "0 0 15px rgba(202,254,56,0.2)"
                      : "none",
                  transition: "all 0.6s ease",
                }}
              />
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute z-30 flex items-center justify-center gap-4 md:gap-6"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="p-5 md:p-6 rounded-2xl flex gap-4 md:gap-6"
                    style={{
                      background: "radial-gradient(ellipse 120% 140% at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)",
                    }}
                  >
                    <motion.a
                      href={PLAYSTORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="group relative"
                      data-testid="button-download-appstore"
                    >
                      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-white/10 blur-[0.5px]" />
                      <div className="relative w-[110px] h-[140px] md:w-[130px] md:h-[165px] rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] flex flex-col items-center justify-center gap-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)] group-hover:bg-white/[0.1] group-hover:border-white/[0.2] transition-all duration-500">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-[#cafe38]/10 group-hover:border-[#cafe38]/20 transition-all duration-500">
                          <svg className="w-6 h-6 md:w-7 md:h-7 text-white/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                          </svg>
                        </div>
                        <div className="text-center px-2">
                          <p className="text-[8px] text-white/30 uppercase tracking-widest">Download on</p>
                          <p className="text-[11px] md:text-xs text-white/80 font-semibold mt-0.5">App Store</p>
                        </div>
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#cafe38]/30 group-hover:bg-[#cafe38]/60 transition-colors" />
                      </div>
                    </motion.a>

                    <motion.a
                      href={PLAYSTORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="group relative"
                      data-testid="button-download-app"
                    >
                      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#cafe38]/20 via-[#cafe38]/5 to-[#cafe38]/10 blur-[0.5px]" />
                      <div className="relative w-[110px] h-[140px] md:w-[130px] md:h-[165px] rounded-2xl bg-[#cafe38]/[0.06] backdrop-blur-xl border border-[#cafe38]/[0.15] flex flex-col items-center justify-center gap-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)] group-hover:bg-[#cafe38]/[0.1] group-hover:border-[#cafe38]/[0.3] transition-all duration-500">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#cafe38]/[0.06] border border-[#cafe38]/[0.1] flex items-center justify-center group-hover:bg-[#cafe38]/15 group-hover:border-[#cafe38]/25 transition-all duration-500">
                          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24">
                            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4"/>
                            <path d="M17.556 8.248l-3.764 3.753 3.764 3.753 4.243-2.399c.477-.27.77-.772.77-1.316s-.294-1.046-.77-1.316l-4.243-2.475z" fill="#FBBC04"/>
                            <path d="M3.609 22.186L14.99 13.21l-1.198-1.21L3.609 22.186z" fill="#EA4335"/>
                            <path d="M3.609 1.814L13.792 12l1.198-1.21L3.609 1.814z" fill="#34A853"/>
                          </svg>
                        </div>
                        <div className="text-center px-2">
                          <p className="text-[8px] text-[#cafe38]/30 uppercase tracking-widest">Get it on</p>
                          <p className="text-[11px] md:text-xs text-white/80 font-semibold mt-0.5">Google Play</p>
                        </div>
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#cafe38]/40 group-hover:bg-[#cafe38]/80 transition-colors" />
                      </div>
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative mt-4">
            <div className="w-[320px] md:w-[400px] h-[2px] rounded-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mx-auto" />
            <div
              className="w-[200px] md:w-[260px] h-[1px] rounded-full mx-auto mt-[1px] bg-gradient-to-r from-transparent via-[#cafe38]/20 to-transparent transition-opacity duration-600"
              style={{ opacity: isOpen ? 0.8 : isActive ? 0.4 : 0.15 }}
            />
          </div>

          <div className="mt-6 h-5">
            <AnimatePresence mode="wait">
              {state === "idle" && (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[11px] font-mono text-white/20 tracking-[0.3em] uppercase text-center"
                >
                  [ Hover to unlock ]
                </motion.p>
              )}
              {state === "proximity" && (
                <motion.p
                  key="proximity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[11px] font-mono text-white/25 tracking-[0.3em] uppercase text-center"
                >
                  [ Establishing connection… ]
                </motion.p>
              )}
              {state === "unlocking" && (
                <motion.p
                  key="unlocking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[11px] font-mono text-[#cafe38]/35 tracking-[0.3em] uppercase text-center"
                >
                  [ Establishing connection… ]
                </motion.p>
              )}
              {state === "unlocked" && (
                <motion.p
                  key="unlocked"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[11px] font-mono text-[#cafe38]/50 tracking-[0.3em] uppercase text-center"
                >
                  Access granted
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

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
              <span className="w-1.5 h-1.5 rounded-full bg-[#cafe38]/30" />
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
