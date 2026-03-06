import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import zatchQR from "@assets/zatchQR_1771958263462.png";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

const STREAM_MODULES = import.meta.glob("../../assets/kinetic/stream-*.png", {
  import: "default",
}) as Record<string, () => Promise<string>>;

const WALK_VIDEO_SRC = "/walk.mp4";

function IPhoneLiveStreamMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-10 bg-primary/8 rounded-[3rem] blur-3xl" />
      <div className="absolute -inset-6 bg-primary/4 rounded-[2.5rem] blur-2xl" />

      <div
        className="relative w-[200px] lg:w-[240px] xl:w-[270px] rounded-[2rem] lg:rounded-[2.2rem] overflow-hidden"
        style={{
          aspectRatio: "414/896",
          background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #111 100%)",
          boxShadow:
            "0 0 0 1.5px rgba(80,80,80,0.5), 0 0 0 3px rgba(40,40,40,0.4), 0 0 0 5px rgba(20,20,20,0.3), 0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(202,254,56,0.08), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[2px] z-30 flex items-center justify-center gap-[6px]"
          style={{ width: "45%", height: "20px", background: "#0a0a0a", borderRadius: "0 0 14px 14px" }}
        >
          <div className="w-[4px] h-[4px] rounded-full bg-gray-700 ring-1 ring-gray-600/50" />
          <div
            className="w-[6px] h-[6px] rounded-full"
            style={{
              background: "linear-gradient(135deg, #1a1a2e, #0d0d1a)",
              boxShadow: "inset 0 0 2px rgba(50,50,80,0.5), 0 0 1px rgba(100,100,150,0.3)",
            }}
          />
          <div className="w-[4px] h-[4px] rounded-full bg-gray-700" />
        </div>

        <div
          className="absolute top-[1px] left-[1px] right-[1px] h-[6px] z-20 rounded-t-[2rem] lg:rounded-t-[2.2rem]"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)" }}
        />

        <div className="absolute inset-[4px] rounded-[1.8rem] lg:rounded-[2rem] overflow-hidden bg-black">
          <video
            src={WALK_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="absolute left-[-2px] top-[25%] w-[3px] h-[18px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #333, #222)" }} />
        <div className="absolute left-[-2px] top-[33%] w-[3px] h-[28px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #333, #222)" }} />
        <div className="absolute left-[-2px] top-[42%] w-[3px] h-[28px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #333, #222)" }} />
        <div className="absolute right-[-2px] top-[30%] w-[3px] h-[35px] rounded-r-sm" style={{ background: "linear-gradient(180deg, #333, #222)" }} />
      </div>
    </div>
  );
}

export function KineticHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobileViewport, isFinePointer, prefersReducedMotion } = useDeviceCapabilities();
  const [streamImages, setStreamImages] = useState<string[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

  useEffect(() => {
    let alive = true;
    const keys = Object.keys(STREAM_MODULES).sort();
    const maxTiles = prefersReducedMotion ? 12 : isMobileViewport ? 18 : keys.length;

    Promise.all(keys.slice(0, maxTiles).map((key) => STREAM_MODULES[key]()))
      .then((images) => {
        if (!alive) return;
        setStreamImages(images);
      })
      .catch(() => {
        if (!alive) return;
        setStreamImages([]);
      });

    return () => {
      alive = false;
    };
  }, [isMobileViewport, prefersReducedMotion]);

  const gridItems = useMemo(() => {
    return streamImages.map((image, i) => ({
      id: i,
      image,
      randomX: (Math.random() - 0.5) * 200,
      randomY: -100 - Math.random() * 300,
      randomRotate: (Math.random() - 0.5) * 30,
      scale: 0.8 + Math.random() * 0.4,
    }));
  }, [streamImages]);

  const filterRange = isMobileViewport
    ? ["brightness(1) contrast(1)", "brightness(1.16) contrast(1.04)"]
    : ["brightness(1) contrast(1)", "brightness(1.35) contrast(1.1)"];

  const heroOpacity = useTransform(smoothProgress, [0.55, 0.92], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0.55, 0.92], [1, isMobileViewport ? 1.03 : 1.08]);
  const heroFilter = useTransform(smoothProgress, [0, 0.55], filterRange);
  const phoneY = useTransform(smoothProgress, [0.58, 0.92], [0, isMobileViewport ? 18 : 48]);
  const phoneScale = useTransform(smoothProgress, [0.58, 0.92], [1, isMobileViewport ? 0.98 : 0.95]);
  const mobileTextOpacity = useTransform(smoothProgress, [0, 0.4, 0.56], [1, 1, 0]);
  const mobileTextY = useTransform(smoothProgress, [0, 0.56], [0, -36]);
  const mobileTextScale = useTransform(smoothProgress, [0, 0.56], [1, 0.96]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0.2, 0.45], [1, 0]);

  return (
    <section id="hero" ref={containerRef} className={`${isMobileViewport ? "h-[120vh]" : "h-[105vh]"} relative bg-black`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(202,254,56,0.08) 0%, rgba(10,10,10,0.35) 35%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 p-1">
          {gridItems.map((item) => (
            <GridItem
              key={item.id}
              item={item}
              scrollYProgress={scrollYProgress}
              isFinePointer={isFinePointer}
              isMobileViewport={isMobileViewport}
            />
          ))}
        </div>

        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            filter: heroFilter,
          }}
          className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1220px] px-4 sm:px-6 md:px-8 pointer-events-none"
        >
          {isMobileViewport ? (
            <div className="relative h-screen w-full">
              <motion.div
                style={{
                  opacity: mobileTextOpacity,
                  y: mobileTextY,
                  scale: mobileTextScale,
                }}
                className="absolute left-1/2 top-[45vh] -translate-x-1/2 -translate-y-1/2 w-full px-4"
              >
                <h1 className="text-[15vw] font-bold font-display leading-[0.82] tracking-[-0.02em] text-white text-center max-w-[92vw] mx-auto">
                  CATCH IT
                  <br />
                  MATCH IT
                  <br />
                  <span className="text-primary italic">ZATCH</span> IT
                </h1>
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-7 sm:gap-8 md:gap-12 lg:gap-16">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-[17vw] sm:text-[14vw] md:text-[11.6vw] lg:text-[10vw] xl:text-[9.1vw] font-bold font-display leading-[0.8] tracking-tighter text-white text-center md:text-left mix-blend-difference">
                  CATCH IT
                  <br />
                  MATCH IT
                  <br />
                  <span className="relative inline-block text-primary italic pr-4">
                    <span className="relative z-10">ZATCH</span>
                    <span className="absolute top-1/2 -left-20 w-full h-[2px] bg-primary/50 -translate-y-1/2 blur-[1px]" />
                    <span className="absolute top-[30%] -left-32 w-3/4 h-[1px] bg-primary/30 blur-[0.5px]" />
                    <span className="absolute top-[70%] -left-24 w-4/5 h-[1.5px] bg-primary/40 blur-[0.5px]" />
                    <span className="absolute inset-0 translate-x-1 translate-y-0 opacity-50 mix-blend-screen blur-[1px] skew-x-12 scale-x-110 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />
                  </span>{" "}
                  IT
                </h1>

                <a
                  href="/download"
                  className="group flex items-center gap-4 sm:gap-5 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl pointer-events-auto mt-5 sm:mt-7 w-fit self-center md:self-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="relative w-[82px] h-[82px] sm:w-[90px] sm:h-[90px] lg:w-[100px] lg:h-[100px] rounded-xl overflow-hidden ring-1 ring-white/15 group-hover:ring-primary/50 transition-all duration-300 bg-white p-1.5">
                    <img src={zatchQR} alt="Download Zatch" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 font-display">Get the App</span>
                    <span className="text-[11px] text-white/30">Available on iOS & Android</span>
                  </div>
                </a>
              </div>

              <motion.div
                style={{
                  y: phoneY,
                  scale: phoneScale,
                }}
                className="pointer-events-none shrink-0 scale-[0.72] sm:scale-[0.84] md:scale-100 origin-center"
              >
                <IPhoneLiveStreamMockup />
              </motion.div>
            </div>
          )}
        </motion.div>

        <motion.div
          style={{ opacity: isMobileViewport ? mobileTextOpacity : scrollIndicatorOpacity }}
          className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30 ${isMobileViewport ? "bottom-2" : "bottom-10"}`}
        >
          <span className={`text-white/50 uppercase tracking-widest ${isMobileViewport ? "hidden" : "text-xs sm:text-sm"}`}>Scroll to Explore</span>
          <motion.svg
            animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            width={isMobileViewport ? "16" : "20"}
            height={isMobileViewport ? "16" : "20"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/50"
          >
            <path d="M7 13l5 5 5-5" />
            <path d="M7 6l5 5 5-5" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}

function GridItem({
  item,
  scrollYProgress,
  isFinePointer,
  isMobileViewport,
}: {
  item: { id: number; image: string; randomX: number; randomY: number; randomRotate: number; scale: number };
  scrollYProgress: any;
  isFinePointer: boolean;
  isMobileViewport: boolean;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, item.randomY + "%"]);
  const x = useTransform(scrollYProgress, [0, 1], [0, item.randomX + "%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, item.randomRotate]);
  const scale = useTransform(scrollYProgress, [0.25, 0.92], [1, isMobileViewport ? 0.25 : 0]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  const hoverClasses = isFinePointer
    ? "hover:grayscale-0 hover:brightness-100 hover:opacity-90 hover:z-10 hover:scale-125 hover:rounded-lg hover:shadow-xl hover:ring-2 hover:ring-primary"
    : "";

  return (
    <motion.div
      style={{ y, x, rotate, scale, opacity }}
      className={`relative w-full h-full overflow-hidden grayscale brightness-[0.25] opacity-40 transition-all duration-300 ${hoverClasses}`}
    >
      <img src={item.image} alt="Stream" className="w-full h-full object-cover aspect-[9/16]" loading="lazy" />
    </motion.div>
  );
}
