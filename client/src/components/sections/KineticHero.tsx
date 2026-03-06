import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import streamFashion from "@/assets/kinetic/stream-fashion.png";
import streamTech from "@/assets/kinetic/stream-tech.png";
import streamSneaker from "@/assets/kinetic/stream-sneaker.png";
import streamBeauty from "@/assets/kinetic/stream-beauty.png";
import streamSaree from "@/assets/kinetic/stream-saree.png";
import streamShoes from "@/assets/kinetic/stream-shoes.png";
import streamJewelry from "@/assets/kinetic/stream-jewelry.png";
import streamPhones from "@/assets/kinetic/stream-phones.png";
import streamSkincare from "@/assets/kinetic/stream-skincare.png";
import streamWatches from "@/assets/kinetic/stream-watches.png";
import streamKurti from "@/assets/kinetic/stream-kurti.png";
import streamSports from "@/assets/kinetic/stream-sports.png";
import streamHomedecor from "@/assets/kinetic/stream-homedecor.png";
import streamBags from "@/assets/kinetic/stream-bags.png";
import streamVinyl from "@/assets/kinetic/stream-vinyl.png";
import streamSpices from "@/assets/kinetic/stream-spices.png";
import streamGaming from "@/assets/kinetic/stream-gaming.png";
import streamSunglasses from "@/assets/kinetic/stream-sunglasses.png";
import streamCustomshoes from "@/assets/kinetic/stream-customshoes.png";
import streamPashmina from "@/assets/kinetic/stream-pashmina.png";
import streamCamera from "@/assets/kinetic/stream-camera.png";
import streamCandles from "@/assets/kinetic/stream-candles.png";
import streamHeadphones from "@/assets/kinetic/stream-headphones.png";
import streamFabric from "@/assets/kinetic/stream-fabric.png";
import streamFurniture from "@/assets/kinetic/stream-furniture.png";
import streamSweets from "@/assets/kinetic/stream-sweets.png";
import streamSmartwatch from "@/assets/kinetic/stream-smartwatch.png";
import streamPlants from "@/assets/kinetic/stream-plants.png";
import streamKurta from "@/assets/kinetic/stream-kurta.png";
import streamChocolate from "@/assets/kinetic/stream-chocolate.png";
import streamBackpack from "@/assets/kinetic/stream-backpack.png";
import streamPottery from "@/assets/kinetic/stream-pottery.png";
import streamTshirts from "@/assets/kinetic/stream-tshirts.png";
import streamBridal from "@/assets/kinetic/stream-bridal.png";
import streamHairaccess from "@/assets/kinetic/stream-hairaccess.png";
import streamPerfume from "@/assets/kinetic/stream-perfume.png";
import streamYoga from "@/assets/kinetic/stream-yoga.png";
import streamKeyboards from "@/assets/kinetic/stream-keyboards.png";
import streamBangles from "@/assets/kinetic/stream-bangles.png";
import streamScooter from "@/assets/kinetic/stream-scooter.png";
import streamTea from "@/assets/kinetic/stream-tea.png";
import streamComics from "@/assets/kinetic/stream-comics.png";
import streamJuttis from "@/assets/kinetic/stream-juttis.png";
import streamDrone from "@/assets/kinetic/stream-drone.png";
import streamScarves from "@/assets/kinetic/stream-scarves.png";
import streamCoffee from "@/assets/kinetic/stream-coffee.png";
import streamEco from "@/assets/kinetic/stream-eco.png";
import streamArtprints from "@/assets/kinetic/stream-artprints.png";
import heroLivestreamBg from "@/assets/kinetic/hero-livestream-bg.png";
import zatchQR from "@assets/zatchQR_1771958263462.png";

const ALL_STREAMS = [
  streamSaree, streamShoes, streamJewelry, streamPhones,
  streamSkincare, streamWatches, streamKurti, streamSports,
  streamHomedecor, streamBags, streamFashion, streamTech,
  streamSneaker, streamBeauty, streamVinyl, streamSpices,
  streamGaming, streamSunglasses, streamCustomshoes, streamPashmina,
  streamCamera, streamCandles, streamHeadphones, streamFabric,
  streamFurniture, streamSweets, streamSmartwatch, streamPlants,
  streamKurta, streamChocolate, streamBackpack, streamPottery,
  streamTshirts, streamBridal, streamHairaccess, streamPerfume,
  streamYoga, streamKeyboards, streamBangles, streamScooter,
  streamTea, streamComics, streamJuttis, streamDrone,
  streamScarves, streamCoffee, streamEco, streamArtprints,
];

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
          boxShadow: "0 0 0 1.5px rgba(80,80,80,0.5), 0 0 0 3px rgba(40,40,40,0.4), 0 0 0 5px rgba(20,20,20,0.3), 0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(202,254,56,0.08), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[2px] z-30 flex items-center justify-center gap-[6px]"
          style={{ width: "45%", height: "20px", background: "#0a0a0a", borderRadius: "0 0 14px 14px" }}
        >
          <div className="w-[4px] h-[4px] rounded-full bg-gray-700 ring-1 ring-gray-600/50" />
          <div className="w-[6px] h-[6px] rounded-full" style={{ background: "linear-gradient(135deg, #1a1a2e, #0d0d1a)", boxShadow: "inset 0 0 2px rgba(50,50,80,0.5), 0 0 1px rgba(100,100,150,0.3)" }} />
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
            preload="auto"
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Use full section travel for progress so the hero does not disappear too early.
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

  const gridItems = useMemo(() => {
    return ALL_STREAMS.map((image, i) => ({
      id: i,
      image,
      randomX: (Math.random() - 0.5) * 200,
      randomY: -100 - Math.random() * 300,
      randomRotate: (Math.random() - 0.5) * 30,
      scale: 0.8 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="h-[105vh] relative bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">

        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 p-1">
          {gridItems.map((item) => (
            <GridItem
              key={item.id}
              item={item}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0.55, 0.92], [1, 0]),
            scale: useTransform(smoothProgress, [0.55, 0.92], [1, 1.12]),
            filter: useTransform(smoothProgress, [0, 0.55], ["brightness(1) contrast(1)", "brightness(1.35) contrast(1.1)"]),
          }}
          className="absolute z-20 left-[42%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <h1 className="text-[12vw] font-bold font-display leading-[0.8] tracking-tighter text-white text-center mix-blend-difference">
            CATCH IT<br />
            MATCH IT<br />
            <span className="relative inline-block text-primary italic pr-4">
              <span className="relative z-10">ZATCH</span>
              <span className="absolute top-1/2 -left-20 w-full h-[2px] bg-primary/50 -translate-y-1/2 blur-[1px]" />
              <span className="absolute top-[30%] -left-32 w-3/4 h-[1px] bg-primary/30 blur-[0.5px]" />
              <span className="absolute top-[70%] -left-24 w-4/5 h-[1.5px] bg-primary/40 blur-[0.5px]" />
              <span className="absolute inset-0 translate-x-1 translate-y-0 opacity-50 mix-blend-screen blur-[1px] skew-x-12 scale-x-110 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10"></span>
            </span> IT
          </h1>

          <a href="/download" className="group flex items-center gap-5 px-5 py-4 rounded-2xl pointer-events-auto mt-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
            <div className="relative w-[90px] h-[90px] lg:w-[100px] lg:h-[100px] rounded-xl overflow-hidden ring-1 ring-white/15 group-hover:ring-primary/50 transition-all duration-300 bg-white p-1.5">
              <img src={zatchQR} alt="Download Zatch" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg lg:text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 font-display">Get the App</span>
              <span className="text-[11px] text-white/30">Available on iOS & Android</span>
            </div>
          </a>
        </motion.div>

        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0.58, 0.92], [1, 0]),
            y: useTransform(smoothProgress, [0.58, 0.92], [0, 80]),
            scale: useTransform(smoothProgress, [0.58, 0.92], [1, 0.92]),
          }}
          className="absolute z-20 right-[4%] md:right-[6%] lg:right-[8%] top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center"
        >
          <div className="pointer-events-none">
            <IPhoneLiveStreamMockup />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0.2, 0.45], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
        >
          <span className="text-white/50 text-sm uppercase tracking-widest">Scroll to Explore</span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"
          >
            <path d="M7 13l5 5 5-5" />
            <path d="M7 6l5 5 5-5" />
          </motion.svg>
        </motion.div>

      </div>
    </section>
  );
}

function GridItem({ item, scrollYProgress }: any) {
  const y = useTransform(scrollYProgress, [0, 1], [0, item.randomY + "%"]);
  const x = useTransform(scrollYProgress, [0, 1], [0, item.randomX + "%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, item.randomRotate]);
  const scale = useTransform(scrollYProgress, [0.25, 0.92], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  return (
    <motion.div
      style={{ y, x, rotate, scale, opacity }}
      className="relative w-full h-full overflow-hidden grayscale brightness-[0.25] opacity-40 hover:grayscale-0 hover:brightness-100 hover:opacity-90 hover:z-10 hover:scale-125 hover:rounded-lg hover:shadow-xl hover:ring-2 hover:ring-primary transition-all duration-300"
    >
      <img
        src={item.image}
        alt="Stream"
        className="w-full h-full object-cover aspect-[9/16]"
        loading="lazy"
      />
    </motion.div>
  )
}
