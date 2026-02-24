import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Heart, ShoppingBag, MessageCircle, Send, Star, ChevronDown, ArrowRight, Eye, Zap, Tag, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

import liveSareeImg from "@/assets/buyers/live-silk-saree.png";
import productKurti from "@/assets/buyers/product-kurti.png";
import productJhumkas from "@/assets/buyers/product-jhumkas.png";
import productPalazzo from "@/assets/buyers/product-palazzo.png";

const FEATURES = [
  {
    id: "live",
    tag: "01",
    title: "See It Live",
    desc: "Watch real sellers demonstrate products. Ask questions in real-time. Buy with total confidence - no guessing.",
    accent: "from-purple-500/20 to-pink-500/20",
    borderAccent: "border-purple-500/30",
  },
  {
    id: "discover",
    tag: "02",
    title: "Discover Fast",
    desc: "Swipe through short product videos like reels. No endless scrolling - find what you love and checkout in seconds.",
    accent: "from-blue-500/20 to-cyan-500/20",
    borderAccent: "border-blue-500/30",
  },
  {
    id: "bargain",
    tag: "03",
    title: "Set Your Price",
    desc: "Send an offer on anything. The seller's AI responds instantly. Lock the deal at a price that works for you.",
    accent: "from-[#cafe38]/20 to-emerald-500/20",
    borderAccent: "border-[#cafe38]/30",
  },
];

function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 280, height: 580 }}>
      <div className="absolute inset-0 rounded-[3rem] bg-[#1a1a1a] border-[3px] border-[#2a2a2a] shadow-[0_0_80px_rgba(0,0,0,0.8),0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1a1a] rounded-b-2xl z-30 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#333]" />
          <div className="w-12 h-3 rounded-full bg-[#222]" />
        </div>
        <div className="absolute inset-[3px] rounded-[2.7rem] overflow-hidden bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}

function LiveScreen() {
  const [liked, setLiked] = useState(false);
  const [chatMessages] = useState([
    { user: "Meera", text: "Is this pure silk?", time: "now" },
    { user: "Rahul", text: "₹800 possible?", time: "1m" },
    { user: "Priya", text: "Beautiful color! 😍", time: "2m" },
  ]);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#1a0a20] via-[#0f0515] to-black">
      {/* Live stream background */}
      <div className="absolute inset-0">
        <img src={liveSareeImg} alt="Live saree selling" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 z-10" />
      </div>

      {/* Top bar */}
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

      {/* Side actions */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5">
        <motion.button
          onClick={() => setLiked(!liked)}
          whileTap={{ scale: 0.8 }}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${liked ? 'bg-red-500/20' : 'bg-white/10'} backdrop-blur-sm`}>
            <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </div>
          <span className="text-[9px] text-white/50">2.4k</span>
        </motion.button>
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

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        {/* Chat messages */}
        <div className="mb-3 space-y-1.5">
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
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

        {/* Product card */}
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

        {/* Input */}
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

function DiscoverScreen() {
  const products = [
    { name: "Designer Kurti Set", price: "₹1,299", rating: "4.8", views: "12K", img: productKurti },
    { name: "Handmade Jhumkas", price: "₹449", rating: "4.9", views: "8.5K", img: productJhumkas },
    { name: "Cotton Palazzo Set", price: "₹899", rating: "4.7", views: "15K", img: productPalazzo },
  ];

  return (
    <div className="w-full h-full bg-black relative pt-8">
      <div className="px-4 pt-2 pb-3 flex items-center justify-between">
        <h4 className="text-[14px] text-white font-bold">Discover</h4>
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full bg-white/10 text-[9px] text-white/60 font-medium">Trending</div>
          <div className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-[9px] text-blue-400 font-medium">For You</div>
        </div>
      </div>

      <div className="px-4 space-y-3 overflow-hidden">
        {products.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 + 0.3 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="aspect-[16/9] relative flex items-center justify-center overflow-hidden">
              <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </motion.div>
              </div>
              <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                <Eye className="w-2.5 h-2.5 text-white/60" />
                <span className="text-[9px] text-white/60">{p.views}</span>
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                <Clock className="w-2.5 h-2.5 text-white/60" />
                <span className="text-[9px] text-white/60">0:30</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-white font-semibold">{p.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-2.5 h-2.5 text-yellow-400" fill="currentColor" />
                      <span className="text-[9px] text-white/60">{p.rating}</span>
                    </div>
                  </div>
                  <span className="text-[14px] text-white font-bold">{p.price}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom nav hint */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <ChevronDown className="w-4 h-4 text-white/20" />
          <span className="text-[8px] text-white/15 uppercase tracking-widest">Scroll for more</span>
        </motion.div>
      </div>
    </div>
  );
}

function BargainScreen() {
  const [price, setPrice] = useState(2499);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => { setStage(2); setPrice(1800); }, 2000),
      setTimeout(() => setStage(3), 3200),
      setTimeout(() => { setStage(4); setPrice(1999); }, 4200),
      setTimeout(() => setStage(5), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#050d08] to-black relative pt-8">
      <div className="px-4 pt-2 pb-3">
        <h4 className="text-[14px] text-white font-bold">Make an Offer</h4>
        <p className="text-[10px] text-white/30 mt-0.5">Banarasi Silk Saree</p>
      </div>

      <div className="px-4">
        {/* Product */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] mb-6">
          <div className="w-14 h-14 rounded-xl bg-[#cafe38]/10 border border-[#cafe38]/20 flex items-center justify-center">
            <Tag className="w-5 h-5 text-[#cafe38]/60" />
          </div>
          <div className="flex-1">
            <p className="text-[12px] text-white font-semibold">Banarasi Silk Saree</p>
            <p className="text-[10px] text-white/30">Listed at ₹2,499</p>
          </div>
        </div>

        {/* Price display */}
        <div className="text-center mb-6">
          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Current Offer</p>
          <motion.p
            key={price}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold text-[#cafe38] font-display"
          >
            ₹{price.toLocaleString()}
          </motion.p>
          <div className="w-full h-1.5 bg-white/[0.05] rounded-full mt-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#cafe38]/60 to-[#cafe38] rounded-full"
              animate={{ width: `${(price / 2499) * 100}%` }}
              transition={{ type: "spring", bounce: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[8px] text-white/15">₹0</span>
            <span className="text-[8px] text-white/15">₹2,499</span>
          </div>
        </div>

        {/* Negotiation thread */}
        <div className="space-y-2.5">
          <AnimatePresence>
            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="px-3 py-2 rounded-2xl rounded-br-md bg-[#cafe38]/10 border border-[#cafe38]/20 max-w-[75%]">
                  <p className="text-[10px] text-white/60">Your offer</p>
                  <p className="text-[13px] text-[#cafe38] font-bold">₹1,800</p>
                </div>
              </motion.div>
            )}
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="px-3 py-2 rounded-2xl rounded-bl-md bg-white/[0.05] border border-white/[0.08] max-w-[75%]">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Zap className="w-2.5 h-2.5 text-[#cafe38]" />
                    <p className="text-[10px] text-[#cafe38]/60">Auto-counter</p>
                  </div>
                  <p className="text-[13px] text-white font-bold">₹2,100</p>
                </div>
              </motion.div>
            )}
            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="px-3 py-2 rounded-2xl rounded-br-md bg-[#cafe38]/10 border border-[#cafe38]/20 max-w-[75%]">
                  <p className="text-[10px] text-white/60">Your counter</p>
                  <p className="text-[13px] text-[#cafe38] font-bold">₹1,999</p>
                </div>
              </motion.div>
            )}
            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="px-3 py-2 rounded-2xl rounded-bl-md bg-white/[0.05] border border-white/[0.08] max-w-[75%]">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Zap className="w-2.5 h-2.5 text-[#cafe38]" />
                    <p className="text-[10px] text-[#cafe38]/60">Auto-counter</p>
                  </div>
                  <p className="text-[13px] text-white font-bold">₹1,999 ✓</p>
                </div>
              </motion.div>
            )}
            {stage >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="mt-3 p-3 rounded-2xl bg-[#cafe38]/10 border border-[#cafe38]/30 text-center"
              >
                <Sparkles className="w-5 h-5 text-[#cafe38] mx-auto mb-1" />
                <p className="text-[12px] text-[#cafe38] font-bold">Deal Locked at ₹1,999!</p>
                <p className="text-[9px] text-white/30 mt-0.5">You saved ₹500 (20% off)</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function ForBuyers({ onJoinWaitlist }: { onJoinWaitlist?: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState(0);
  const [phoneKey, setPhoneKey] = useState(0);

  const handleFeatureChange = (idx: number) => {
    setActiveFeature(idx);
    setPhoneKey(prev => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => {
        const next = (prev + 1) % 3;
        setPhoneKey(k => k + 1);
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const screens = [<LiveScreen />, <DiscoverScreen />, <BargainScreen />];

  return (
    <section id="buyers" ref={ref} className="py-20 md:py-28 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#cafe38]" />
              <span className="text-[11px] font-bold text-[#cafe38] tracking-[0.4em] uppercase" data-testid="text-buyers-tag">For Buyers</span>
            </div>

            <h3 className="text-4xl sm:text-5xl md:text-[4rem] font-bold font-display tracking-tight leading-[0.95] mb-6" data-testid="text-buyers-heading">
              <span className="text-white">Shop Like</span><br />
              <span className="text-white">You </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cafe38] to-[#cafe38]/60">Mean It.</span>
            </h3>

            <p className="text-base text-white/30 leading-relaxed max-w-md mb-12">
              A shopping experience built for how India actually buys - live, social, and on your terms.
            </p>

            {/* Feature Selector */}
            <div className="space-y-0">
              {FEATURES.map((f, i) => (
                <motion.button
                  key={f.id}
                  onClick={() => handleFeatureChange(i)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className={`w-full text-left py-5 border-b border-white/[0.04] last:border-0 transition-all duration-500 group relative ${activeFeature === i ? '' : 'opacity-40 hover:opacity-70'}`}
                  data-testid={`button-feature-${f.id}`}
                >
                  {activeFeature === i && (
                    <motion.div
                      layoutId="activeFeature"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#cafe38]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <div className="pl-5">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] text-[#cafe38]/40 font-mono">{f.tag}</span>
                      <h4 className={`text-lg font-bold tracking-tight transition-colors duration-300 ${activeFeature === i ? 'text-white' : 'text-white/60'}`}>
                        {f.title}
                      </h4>
                    </div>
                    <AnimatePresence mode="wait">
                      {activeFeature === i && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[13px] text-white/35 leading-relaxed overflow-hidden"
                        >
                          {f.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Progress bar for auto-cycle */}
                  {activeFeature === i && (
                    <div className="absolute bottom-0 left-5 right-0 h-[1px] bg-white/[0.04] overflow-hidden">
                      <motion.div
                        className="h-full bg-[#cafe38]/30"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        key={phoneKey}
                      />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-5"
            >
              <Button
                size="lg"
                onClick={onJoinWaitlist}
                className="bg-white/[0.06] text-white hover:bg-white/10 border border-white/[0.08] hover:border-white/15 font-bold px-8 h-12 rounded-full text-sm transition-all duration-300 hover:scale-105 active:scale-95 group"
                data-testid="button-buyer-waitlist"
              >
                Join as Buyer <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <span className="text-[13px] text-white/15 italic">"Less guessing. More winning."</span>
            </motion.div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Ambient glow behind phone */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ${
              activeFeature === 0 ? 'bg-purple-500/10' : activeFeature === 1 ? 'bg-blue-500/10' : 'bg-[#cafe38]/8'
            }`} />

            {/* Floating accent elements */}
            <motion.div
              className="absolute top-10 right-0 lg:right-10 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-[10px] text-white/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cafe38]" />
                Live experience
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-16 left-0 lg:left-5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-[10px] text-white/30 flex items-center gap-1.5">
                <ShoppingBag className="w-3 h-3 text-[#cafe38]/60" />
                Instant checkout
              </span>
            </motion.div>

            <PhoneFrame>
              <AnimatePresence mode="wait">
                <motion.div
                  key={phoneKey}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  {screens[activeFeature]}
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
