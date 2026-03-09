import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DesktopEcosystemCube } from "@/components/sections/DesktopEcosystemCube";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

export function StickmanCTAStatic() {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewOnce = useInView(ref, { once: true, margin: "-50px" });
  const { prefersReducedMotion } = useDeviceCapabilities();

  return (
    <section id="download" ref={ref} className="py-20 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[160px]"
          style={{
            background: "radial-gradient(circle, rgba(202,254,56,0.05) 0%, transparent 70%)",
            opacity: 0.7,
          }}
        />
      </div>

      <div className="container mx-auto px-5 relative z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInViewOnce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <h3 className="text-[2.7rem] leading-[0.92] font-bold font-display tracking-tight text-white" data-testid="text-download-heading">
            Enter the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cafe38] via-[#d8ff7a] to-[#8cae31]">
              Zatch&trade; Ecosystem
            </span>
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInViewOnce ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="text-white/35 text-sm mt-4"
          >
            Where live commerce becomes a system.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInViewOnce ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="relative w-full min-h-[320px] flex flex-col items-center justify-center">
            <DesktopEcosystemCube
              prefersReducedMotion={prefersReducedMotion}
              compact
              interactive
              showCenterCta
            />
            <p className="mt-3 text-center text-xs text-white/35">Tap the cube to explode it and reveal the CTA.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInViewOnce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-white/25 text-sm leading-relaxed mb-5">
            Join India's first live bargain marketplace. Watch sellers go live, negotiate in real-time, and never overpay again.
          </p>
          <div className="flex items-center justify-center gap-5 text-[11px] text-white/15">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cafe38]/40" />
              Free to download
            </span>
            <span className="w-px h-3 bg-white/[0.08]" />
            <span>12,000+ downloads</span>
            <span className="w-px h-3 bg-white/[0.08]" />
            <span>4.8 star on Play Store</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
