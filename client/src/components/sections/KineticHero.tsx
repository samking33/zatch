import { useRef, useMemo, useState, useEffect } from "react";
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
import heroUnboxing from "@/assets/kinetic/stream-hero-unboxing.png";

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

const CHAT_MESSAGES = [
  { user: "Priya_S", msg: "OMG this looks amazing! 🔥", color: "#ff6b9d" },
  { user: "rahul_k", msg: "What's the price?", color: "#6bccff" },
  { user: "Ananya.M", msg: "Can you show the back?", color: "#ffb86b" },
  { user: "dev_shop", msg: "Is this genuine? 👀", color: "#b86bff" },
  { user: "Sneha23", msg: "I want this!! Take my money 💸", color: "#6bff9d" },
];

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
      className="h-[130vh] relative bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 p-1">
          {gridItems.map((item) => (
            <GridItem
              key={item.id}
              item={item}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/40 z-10" />

        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0, 0.3], [1, 0]),
            scale: useTransform(smoothProgress, [0, 0.3], [1, 1.05]),
          }}
          className="absolute inset-0 z-20 flex flex-col lg:flex-row items-center justify-center lg:items-center px-6 md:px-12 lg:px-24 xl:px-32 gap-6 lg:gap-12"
        >

          <div className="w-full lg:w-[62%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-16 lg:pt-0">
            <h1 className="text-[16vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw] font-bold font-display leading-[0.82] tracking-tighter text-white">
              CATCH IT<br />
              MATCH IT<br />
              <span className="relative inline-block text-primary italic pr-4">
                <span className="relative z-10">ZATCH</span>
                <span className="absolute top-1/2 -left-20 w-full h-[2px] bg-primary/50 -translate-y-1/2 blur-[1px]" />
                <span className="absolute top-[30%] -left-32 w-3/4 h-[1px] bg-primary/30 blur-[0.5px]" />
                <span className="absolute top-[70%] -left-24 w-4/5 h-[1.5px] bg-primary/40 blur-[0.5px]" />
                <span className="absolute inset-0 translate-x-1 translate-y-0 opacity-50 mix-blend-screen blur-[1px] skew-x-12 scale-x-110 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />
              </span> IT
            </h1>
            <p className="mt-6 text-white/50 text-base md:text-lg lg:text-xl max-w-lg font-body tracking-wide">
              India's First Live Bargain Marketplace
            </p>
          </div>

          <div className="w-full lg:w-[38%] flex items-center justify-center lg:justify-end">
            <IPhoneMockup />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm uppercase tracking-widest animate-pulse pointer-events-none z-30"
        >
          Scroll to Explore
        </motion.div>

      </div>
    </section>
  );
}

function IPhoneMockup() {
  const [visibleChats, setVisibleChats] = useState(CHAT_MESSAGES.slice(0, 3));
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const heartId = useRef(0);

  useEffect(() => {
    let chatIndex = 3;
    const chatInterval = setInterval(() => {
      setVisibleChats((prev) => {
        const next = [...prev, CHAT_MESSAGES[chatIndex % CHAT_MESSAGES.length]];
        if (next.length > 4) next.shift();
        return next;
      });
      chatIndex++;
    }, 2500);

    const heartInterval = setInterval(() => {
      const id = heartId.current++;
      setHearts((prev) => [...prev.slice(-6), { id, x: Math.random() * 30 }]);
    }, 1800);

    return () => {
      clearInterval(chatInterval);
      clearInterval(heartInterval);
    };
  }, []);

  return (
    <div className="relative w-[200px] h-[420px] md:w-[220px] md:h-[460px] lg:w-[230px] lg:h-[480px] xl:w-[250px] xl:h-[520px]">
      <div className="absolute inset-0 rounded-[2.5rem] border-[10px] border-neutral-800 bg-black overflow-hidden shadow-2xl shadow-primary/10">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-[80px] h-[22px] bg-black rounded-b-xl flex items-center justify-center gap-1.5">
          <div className="w-[6px] h-[6px] rounded-full bg-neutral-800 ring-1 ring-neutral-700" />
          <div className="w-[32px] h-[6px] rounded-full bg-neutral-800" />
        </div>

        <img
          src={heroUnboxing}
          alt="Creator unboxing live stream"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-3 pt-10">

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-yellow-400 flex items-center justify-center text-black text-xs font-bold ring-2 ring-primary/50">
                ZS
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-tight">zatch_seller</p>
                <p className="text-white/50 text-[10px]">Unboxing Haul ✨</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-lg shadow-red-600/30">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
              <div className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                38K
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-full left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="flex flex-col gap-1.5 mb-2 max-h-[100px] overflow-hidden">
              <AnimatePresence mode="popLayout">
                {visibleChats.map((chat, idx) => (
                  <motion.div
                    key={`${chat.user}-${idx}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-1.5"
                  >
                    <span className="text-[10px] font-bold shrink-0" style={{ color: chat.color }}>
                      {chat.user}
                    </span>
                    <span className="text-white/90 text-[10px] leading-tight">
                      {chat.msg}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-white/40 text-[10px] border border-white/10">
                Say something nice...
              </div>
              <div className="relative w-8 h-8">
                <AnimatePresence>
                  {hearts.map((heart) => (
                    <motion.div
                      key={heart.id}
                      initial={{ opacity: 1, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -60, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute bottom-0 text-red-500 text-sm"
                      style={{ right: heart.x }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-sm">
                  ❤️
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute -inset-2 rounded-[3rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/10 -z-10 blur-xl" />
    </div>
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
  );
}
