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
import heroIphoneMockup from "@/assets/kinetic/hero-iphone-mockup.png";

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
           className="absolute z-20 pointer-events-none left-[8%] md:left-[10%] lg:left-[12%] top-1/2 -translate-y-1/2 text-left mix-blend-difference"
        >
           <h1 className="text-[12vw] font-bold font-display leading-[0.8] tracking-tighter text-white">
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
        </motion.div>

        <motion.div
           style={{
              opacity: useTransform(smoothProgress, [0, 0.3], [1, 0]),
              y: useTransform(smoothProgress, [0, 0.3], [0, 100]),
              scale: useTransform(smoothProgress, [0, 0.3], [1, 0.9]),
           }}
           className="absolute z-20 pointer-events-none right-[6%] md:right-[8%] lg:right-[10%] top-1/2 -translate-y-1/2 hidden md:block"
        >
           <div className="relative">
              <div className="absolute -inset-8 bg-primary/10 rounded-[3rem] blur-3xl" />
              <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-xl" />
              <img
                src={heroIphoneMockup}
                alt="Zatch App"
                className="relative w-[220px] lg:w-[280px] xl:w-[320px] h-auto drop-shadow-[0_0_40px_rgba(202,254,56,0.15)] rounded-[2rem]"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-lg shadow-red-500/50">
                LIVE
              </div>
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
