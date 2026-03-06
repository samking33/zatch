import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { DesktopEcosystemCube } from "@/components/sections/DesktopEcosystemCube";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";

export function StickmanCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewOnce = useInView(ref, { once: true, margin: "-50px" });
  const { isMobileViewport, prefersReducedMotion } = useDeviceCapabilities();

  return (
    <section id="download" ref={ref} className="py-20 md:py-28 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[160px]"
          style={{
            background: "radial-gradient(circle, rgba(202,254,56,0.05) 0%, transparent 70%)",
            opacity: 0.7,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInViewOnce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
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
            animate={isInViewOnce ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/30 text-sm md:text-base mt-4 font-display"
          >
            Where live commerce becomes a system.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInViewOnce ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="relative w-full max-w-[980px] h-[320px] sm:h-[380px] md:h-[560px] lg:h-[620px] flex items-center justify-center">
            {isMobileViewport ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <StaticEcosystemBackdrop />
                <a
                  href={PLAYSTORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center justify-center rounded-full bg-[#cafe38] text-black font-bold px-10 h-12 text-sm shadow-[0_0_30px_rgba(202,254,56,0.25)]"
                  data-testid="button-download-app"
                >
                  Download for Android
                </a>
              </div>
            ) : (
              <DesktopEcosystemCube prefersReducedMotion={prefersReducedMotion} />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewOnce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-white/20 text-sm max-w-md mx-auto leading-relaxed mb-6">
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

function StaticEcosystemBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(202,254,56,0.2)_0%,_rgba(202,254,56,0.08)_35%,_rgba(0,0,0,0)_70%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.55)_0%,_rgba(0,0,0,0.82)_55%,_rgba(0,0,0,1)_85%)]" />
    </div>
  );
}
