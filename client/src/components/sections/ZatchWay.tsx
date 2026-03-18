import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, MessageCircle, Send, ShoppingBag, Sparkles } from "lucide-react";

import screenCatalogue from "@assets/zatch-way/screen-catalogue.jpg";
import screenBargain from "@assets/zatch-way/screen-bargain.jpg";
import screenOffer from "@assets/zatch-way/screen-offer.jpg";
import liveSareeImg from "@/assets/buyers/live-silk-saree.png";

const BUY_VIDEO_SRC = "/buy.mp4";

const screens = [
  {
    type: "live",
    step: "01",
    title: "Browse & Pick",
    desc: "Explore live catalogues from real sellers",
  },
  {
    type: "image",
    image: screenBargain,
    step: "02",
    title: "Set Your Price",
    desc: "Slide to your bargain price - no awkward DMs",
  },
  {
    type: "image",
    image: screenOffer,
    step: "03",
    title: "Deal Done",
    desc: "Accept the seller's offer and pay instantly",
  },
];

function ZatchWayLiveScreen() {
  const chatMessages = [
    { user: "Meera", text: "Is this pure silk?" },
    { user: "Rahul", text: "₹800 possible?" },
    { user: "Priya", text: "Beautiful color! 😍" },
  ];

  return (
    <div className="w-full aspect-[9/19] relative bg-gradient-to-b from-[#1a0a20] via-[#0f0515] to-black">
      <div className="absolute inset-0">
        <video
          src={BUY_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={liveSareeImg}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 z-10" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent z-10" />
      </div>

      <div className="relative z-20 pt-8 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">SS</span>
          </div>
          <div>
            <p className="text-[11px] text-white font-semibold">Silk Stories</p>
            <p className="text-[9px] text-white/40">Live now</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/90">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[9px] text-white font-bold">LIVE</span>
          <span className="text-[9px] text-white/80 ml-0.5">482</span>
        </div>
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-[9px] text-white/50">2.4k</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-[9px] text-white/50">89</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <span className="text-[9px] text-white/50">Buy</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <div className="mb-3 space-y-1.5">
          {chatMessages.map((msg, i) => (
            <motion.div
              key={msg.user}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4 + 0.5 }}
              className="flex items-start gap-2"
            >
              <div className="px-2.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm max-w-[80%]">
                <span className="text-[10px] text-purple-300 font-semibold">{msg.user} </span>
                <span className="text-[10px] text-white/70">{msg.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-white font-semibold">Banarasi Silk Saree</p>
              <p className="text-[10px] text-white/40">Pure silk · Free shipping</p>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-white font-bold">₹2,499</p>
              <p className="text-[9px] text-white/30 line-through">₹3,999</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-9 rounded-full bg-white/10 backdrop-blur-sm px-3 flex items-center border border-white/10">
            <span className="text-[10px] text-white/30">Ask the seller...</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center">
            <Send className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ZatchWay() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full blur-[200px]"
          style={{
            background: "radial-gradient(circle, rgba(202,254,56,0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#cafe38]" />
            <span className="text-[11px] font-bold text-[#cafe38] tracking-[0.4em] uppercase" data-testid="text-zatch-way-tag">
              The Zatch Way
            </span>
            <div className="w-8 h-px bg-[#cafe38]" />
          </div>
          <h3
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[0.95]"
            data-testid="text-zatch-way-heading"
          >
            Three steps.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cafe38] to-[#cafe38]/60">
              That's it.
            </span>
          </h3>
          <p className="text-white/30 text-sm md:text-base mt-4 max-w-md mx-auto">
            No DMs. No confusion. No ghosting. Just swipe, bargain, and buy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.step}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center group"
              data-testid={`card-zatch-step-${screen.step}`}
            >
              <div className="relative w-full max-w-[280px] md:max-w-none">
                <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.08] bg-black shadow-[0_8px_60px_rgba(0,0,0,0.6)] group-hover:border-[#cafe38]/20 transition-all duration-700">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-10" />

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[5px] bg-white/10 rounded-b-lg mt-[8px] z-20" />

                  {screen.type === "live" ? (
                    <ZatchWayLiveScreen />
                  ) : (
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full aspect-[9/19] object-cover object-top"
                      loading="lazy"
                      data-testid={`img-zatch-screen-${screen.step}`}
                    />
                  )}

                  <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.05] pointer-events-none" />
                </div>

                <div
                  className="absolute -inset-2 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                  style={{ background: "radial-gradient(circle, rgba(202,254,56,0.06) 0%, transparent 70%)" }}
                />
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono text-[#cafe38]/40 tracking-widest">{screen.step}</span>
                  <div className="w-4 h-px bg-[#cafe38]/20" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white font-display mb-1" data-testid={`text-step-title-${screen.step}`}>
                  {screen.title}
                </h4>
                <p className="text-white/30 text-xs md:text-sm max-w-[200px] mx-auto">
                  {screen.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center justify-center mt-12 max-w-3xl mx-auto"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-white/[0.06]" />
          <div className="mx-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#cafe38]/30" />
            <span className="text-[10px] font-mono text-white/15 tracking-[0.3em] uppercase">Simple by design</span>
            <div className="w-2 h-2 rounded-full bg-[#cafe38]/30" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/[0.06] to-white/[0.06]" />
        </motion.div>
      </div>
    </section>
  );
}
