import { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

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

const LIVE_COMMENTS = [
  { user: "priya_styles", text: "Omg this smells amazing! 🔥", color: "#cafe38" },
  { user: "rahul.k", text: "What's the price?? 💰", color: "#60a5fa" },
  { user: "sneha_21", text: "I need this!! 😍", color: "#f472b6" },
  { user: "arjun.m", text: "Can you show the bottle again?", color: "#a78bfa" },
  { user: "divya_shop", text: "Just ordered! ✨", color: "#34d399" },
  { user: "vikram.p", text: "Is this unisex?? 🙌", color: "#fbbf24" },
  { user: "meera.r", text: "Best live ever! 💕", color: "#fb7185" },
  { user: "amit_deals", text: "500 for 2 bottles? 🤝", color: "#38bdf8" },
];

function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; color: string }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const colors = ["#ff4d6d", "#ff6b8a", "#cafe38", "#ff85a1", "#f472b6"];
      setHearts(prev => {
        const next = [...prev, {
          id: idRef.current++,
          x: Math.random() * 20 - 10,
          delay: Math.random() * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        }];
        return next.slice(-12);
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-2 bottom-[140px] w-10 h-[180px] overflow-hidden">
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 160, x: h.x, scale: 0.5 }}
            animate={{ opacity: 0, y: -20, x: h.x + (Math.random() - 0.5) * 30, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, delay: h.delay, ease: "easeOut" }}
            className="absolute"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={h.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ScrollingComments() {
  const [comments, setComments] = useState(() =>
    LIVE_COMMENTS.slice(0, 3).map((c, i) => ({ ...c, _key: i }))
  );
  const keyRef = useRef(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setComments(prev => {
        const idx = keyRef.current % LIVE_COMMENTS.length;
        const next = [...prev.slice(1), { ...LIVE_COMMENTS[idx], _key: keyRef.current }];
        keyRef.current++;
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-[5px]">
      <AnimatePresence mode="popLayout">
        {comments.map((c) => (
          <motion.div
            key={c._key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-[4px] px-[6px] py-[3px] rounded-lg"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
          >
            <span className="text-[7px] font-semibold shrink-0" style={{ color: c.color }}>{c.user}</span>
            <span className="text-[7px] text-white/90 leading-tight">{c.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

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
          <img
            src={heroLivestreamBg}
            alt="Live Stream"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

          <div className="absolute top-0 left-0 right-0 z-10 pt-[22px]">
            <div className="flex items-center justify-between px-4">
              <span className="text-[8px] font-semibold text-white">9:41</span>
              <div className="flex items-center gap-[3px]">
                <svg width="10" height="8" viewBox="0 0 16 12" fill="white"><path d="M1 8h2v4H1V8zm4-3h2v7H5V5zm4-3h2v10H9V2zm4-2h2v12h-2V0z"/></svg>
                <svg width="10" height="8" viewBox="0 0 16 12" fill="white"><path d="M8 2C5 2 2.4 3.6 1 6c1.4 2.4 4 4 7 4s5.6-1.6 7-4c-1.4-2.4-4-4-7-4z" opacity="0.9"/></svg>
                <div className="w-[16px] h-[7px] rounded-sm border border-white/60 flex items-center p-[1px]">
                  <div className="h-full w-[70%] bg-primary rounded-[1px]" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-[38px] lg:top-[42px] left-0 right-0 px-3 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <div className="w-[26px] h-[26px] lg:w-[30px] lg:h-[30px] rounded-full overflow-hidden ring-2 ring-primary/60 flex-shrink-0" style={{ background: "linear-gradient(135deg, #cafe38, #8fb825)" }}>
                  <div className="w-full h-full flex items-center justify-center text-black font-bold text-[8px] lg:text-[9px]">BC</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[8px] lg:text-[9px] font-bold text-white">BCE Perfumes</span>
                    <span className="bg-red-500 text-white text-[5px] lg:text-[6px] font-bold px-[4px] py-[1px] rounded-full animate-pulse shadow-lg shadow-red-500/50">LIVE</span>
                  </div>
                  <span className="text-[6px] lg:text-[7px] text-white/60">2.2K viewers</span>
                </div>
              </div>
              <div className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" fill="none"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </div>
            </div>

            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-2 flex items-center gap-[4px] px-[7px] py-[3px] rounded-xl w-fit"
              style={{ background: "rgba(202,254,56,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(202,254,56,0.2)" }}
            >
              <div className="w-[5px] h-[5px] rounded-full bg-primary animate-pulse" />
              <span className="text-[6px] lg:text-[7px] text-primary font-semibold">Bargain Open · ₹899</span>
            </motion.div>
          </div>

          <FloatingHearts />

          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="px-3 pb-2">
              <ScrollingComments />
            </div>

            <div className="px-3 pb-3 pt-1">
              <div className="flex items-center gap-[5px]">
                <div
                  className="flex-1 h-[24px] lg:h-[28px] rounded-full flex items-center px-3"
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span className="text-[7px] text-white/40">Comment...</span>
                </div>
                <div className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#ff4d6d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <div className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="white" opacity="0.7"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </div>
              </div>
            </div>

            <div className="w-[90px] lg:w-[110px] h-[4px] bg-white/30 rounded-full mx-auto mb-2" />
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)",
            }}
          />

          <motion.div
            animate={{ opacity: [0, 0.04, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none bg-white"
          />
        </div>

        <div
          className="absolute inset-0 rounded-[2rem] lg:rounded-[2.2rem] pointer-events-none"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.03) 100%)",
          }}
        />

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
    offset: ["start start", "end end"],
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
              opacity: useTransform(smoothProgress, [0, 0.3], [1, 0]),
              scale: useTransform(smoothProgress, [0, 0.3], [1, 1.2]),
              filter: useTransform(smoothProgress, [0, 0.15], ["brightness(1) contrast(1)", "brightness(1.5) contrast(1.2)"]),
           }}
           className="absolute z-20 left-[42%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center"
        >
           <h1 className="text-[12vw] font-bold font-display leading-[0.8] tracking-tighter text-white text-center mix-blend-difference">
              CATCH IT<br/>
              MATCH IT<br/>
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
              opacity: useTransform(smoothProgress, [0, 0.3], [1, 0]),
              y: useTransform(smoothProgress, [0, 0.3], [0, 100]),
              scale: useTransform(smoothProgress, [0, 0.3], [1, 0.9]),
           }}
           className="absolute z-20 right-[4%] md:right-[6%] lg:right-[8%] top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center"
        >
           <div className="pointer-events-none">
             <IPhoneLiveStreamMockup />
           </div>
        </motion.div>
        
        <motion.div 
           style={{ opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]) }}
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
