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
           className="absolute z-20 pointer-events-none w-full px-6 md:px-12 lg:px-16"
        >
           <div className="flex items-center justify-center gap-8 lg:gap-16 max-w-[1400px] mx-auto">
             <h1 className="text-[11vw] md:text-[9vw] font-bold font-display leading-[0.85] tracking-tighter text-white mix-blend-difference">
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

             <div className="hidden md:block flex-shrink-0">
               <IPhoneMockup />
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

function IPhoneMockup() {
  return (
    <div className="relative w-[280px] lg:w-[320px] xl:w-[360px] pointer-events-auto">
      <div className="relative rounded-[3rem] border-[3px] border-white/20 bg-black overflow-hidden shadow-2xl shadow-black/50"
           style={{ aspectRatio: "9/19.5" }}>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-b-[1.2rem] z-30" />
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] bg-[#1a1a2e] rounded-full z-30 border border-[#2a2a3e]" />

        <div className="absolute top-0 left-0 right-0 h-[50px] z-20 flex items-end justify-between px-6 pb-1">
          <span className="text-white text-[13px] font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><rect x="0" y="6" width="3" height="6" rx="0.5"/><rect x="4.5" y="4" width="3" height="8" rx="0.5"/><rect x="9" y="2" width="3" height="10" rx="0.5"/><rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3"/></svg>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="white"><path d="M7.5 3.6C9.4 3.6 11.1 4.3 12.3 5.5L13.7 4.1C12.1 2.5 10 1.5 7.5 1.5C5 1.5 2.9 2.5 1.3 4.1L2.7 5.5C3.9 4.3 5.6 3.6 7.5 3.6Z" opacity="0.3"/><path d="M7.5 6.7C8.8 6.7 10 7.2 10.9 8L12.3 6.6C11 5.4 9.3 4.6 7.5 4.6C5.7 4.6 4 5.4 2.7 6.6L4.1 8C5 7.2 6.2 6.7 7.5 6.7Z"/><circle cx="7.5" cy="10.5" r="1.5"/></svg>
            <div className="flex items-center">
              <div className="w-[22px] h-[11px] border border-white rounded-[3px] relative">
                <div className="absolute inset-[1.5px] right-[3px] bg-primary rounded-[1.5px]" />
              </div>
              <div className="w-[1.5px] h-[5px] bg-white rounded-r-full ml-[0.5px]" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10" id="hero-video-placeholder" data-testid="hero-video-placeholder">
          <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 ml-1">
                  <polygon points="5 3 19 12 5 21 5 3" fill="white" fillOpacity="0.4"/>
                </svg>
              </div>
              <span className="text-white/30 text-xs uppercase tracking-widest">Video Placeholder</span>
            </div>
          </div>
        </div>

        <div className="absolute top-[55px] left-0 right-0 z-20 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-black font-bold text-sm">Z</div>
              <div>
                <div className="text-white text-[13px] font-semibold leading-tight">Zatch Store</div>
                <div className="text-white/50 text-[10px]">2.7K viewers</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-wide">LIVE</div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zM12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/></svg>
                <span className="text-white text-[10px] font-medium">55K</span>
              </div>
              <button className="text-white/70">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-8">
          <div className="space-y-2.5 mb-4">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/40 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white/70 text-[11px] font-semibold">rahul_deals</span>
                <span className="text-[9px] text-primary/70 ml-1">Host</span>
                <p className="text-white/50 text-[10px] leading-tight">Check out these amazing deals! 🔥</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500/40 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white/70 text-[11px] font-semibold">sneha_m</span>
                <p className="text-white/50 text-[10px] leading-tight">What's the price? 💰</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-500/40 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white/70 text-[11px] font-semibold">priya_shops99</span>
                <p className="text-white/50 text-[10px] leading-tight">Can I bargain on this? 🤔</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <span className="text-white/30 text-[11px]">Comment...</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.6"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.6"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.6"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </div>
            </div>
          </div>
          
          <div className="mt-3 mx-auto w-[134px] h-[5px] bg-white/30 rounded-full" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-[15] pointer-events-none" />
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/20 blur-2xl rounded-full" />
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
  )
}
