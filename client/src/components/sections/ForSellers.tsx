import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Zap, DollarSign, MessageCircle, X, Check, Video, ChevronLeft, Phone, Camera, Paperclip, Mic, Play, Users, IndianRupee, ShieldCheck, Clock, TrendingUp, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

import avatarPriya from "@/assets/sellers/avatar-priya.png";
import avatarRahul from "@/assets/sellers/avatar-rahul.png";
import avatarSneha from "@/assets/sellers/avatar-sneha.png";
import avatarVikram from "@/assets/sellers/avatar-vikram.png";
import avatarMeera from "@/assets/sellers/avatar-meera.png";
import avatarArjun from "@/assets/sellers/avatar-arjun.png";
import liveStreamImg from "@/assets/sellers/live-stream-sarees.png";

function WhatsAppChat() {
  return (
    <div className="bg-[#111b21] rounded-2xl overflow-hidden border border-white/[0.05] flex flex-col h-full">
      {/* WhatsApp header */}
      <div className="px-3 py-2 bg-[#1f2c33] flex items-center gap-2 border-b border-white/[0.05]">
        <ChevronLeft className="w-4 h-4 text-[#00a884]" />
        <img src={avatarPriya} alt="Priya" className="w-8 h-8 rounded-full object-cover border border-white/10" />
        <div className="flex-1">
          <p className="text-[11px] text-white/90 font-semibold">Priya Sharma</p>
          <p className="text-[9px] text-white/30">last seen today at 2:14 PM</p>
        </div>
        <Phone className="w-4 h-4 text-[#00a884]/60" />
        <Camera className="w-4 h-4 text-[#00a884]/60" />
      </div>

      {/* Chat body */}
      <div
        className="flex-1 p-3 space-y-1.5 overflow-hidden"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'412\' height=\'412\' viewBox=\'0 0 412 412\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.012\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'3\'/%3E%3Ccircle cx=\'300\' cy=\'200\' r=\'2\'/%3E%3Ccircle cx=\'200\' cy=\'350\' r=\'2.5\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundColor: '#0b141a',
        }}
      >
        {/* Date stamp */}
        <div className="flex justify-center mb-2">
          <span className="text-[9px] text-white/30 bg-[#1f2c33]/80 px-3 py-0.5 rounded-md">TODAY</span>
        </div>

        {/* Incoming */}
        <div className="flex items-end gap-1.5">
          <img src={avatarPriya} alt="" className="w-5 h-5 rounded-full object-cover mb-1 shrink-0" />
          <div className="max-w-[72%] px-2.5 py-1.5 rounded-xl rounded-bl-sm bg-[#202c33] shadow-sm">
            <p className="text-[10.5px] text-white/90 leading-relaxed">Hi, is this saree still available? The maroon one you posted yesterday?</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[8px] text-white/25">2:14 PM</span>
            </div>
          </div>
        </div>

        {/* Outgoing */}
        <div className="flex justify-end">
          <div className="max-w-[72%] px-2.5 py-1.5 rounded-xl rounded-br-sm bg-[#005c4b] shadow-sm">
            <p className="text-[10.5px] text-white/90 leading-relaxed">Yes available! ₹1,200 with free shipping</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[8px] text-white/25">2:45 PM</span>
              <span className="text-[8px] text-[#53bdeb]">✓✓</span>
            </div>
          </div>
        </div>

        {/* Incoming */}
        <div className="flex items-end gap-1.5">
          <img src={avatarPriya} alt="" className="w-5 h-5 rounded-full object-cover mb-1 shrink-0" />
          <div className="max-w-[72%] px-2.5 py-1.5 rounded-xl rounded-bl-sm bg-[#202c33] shadow-sm">
            <p className="text-[10.5px] text-white/90 leading-relaxed">Last price please? 🙏</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[8px] text-white/25">2:46 PM</span>
            </div>
          </div>
        </div>

        {/* Outgoing */}
        <div className="flex justify-end">
          <div className="max-w-[72%] px-2.5 py-1.5 rounded-xl rounded-br-sm bg-[#005c4b] shadow-sm">
            <p className="text-[10.5px] text-white/90 leading-relaxed">₹1,100 final ma'am</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[8px] text-white/25">3:10 PM</span>
              <span className="text-[8px] text-[#53bdeb]">✓✓</span>
            </div>
          </div>
        </div>

        {/* Incoming */}
        <div className="flex items-end gap-1.5">
          <img src={avatarPriya} alt="" className="w-5 h-5 rounded-full object-cover mb-1 shrink-0" />
          <div className="max-w-[72%] px-2.5 py-1.5 rounded-xl rounded-bl-sm bg-[#202c33] shadow-sm">
            <p className="text-[10.5px] text-white/90 leading-relaxed">₹800 possible? I'll buy 2 if you do that price</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[8px] text-white/25">3:11 PM</span>
            </div>
          </div>
        </div>

        {/* Outgoing */}
        <div className="flex justify-end">
          <div className="max-w-[72%] px-2.5 py-1.5 rounded-xl rounded-br-sm bg-[#005c4b] shadow-sm">
            <p className="text-[10.5px] text-white/90 leading-relaxed">No ma'am, minimum ₹1,000. Material cost itself is high 😅</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[8px] text-white/25">3:30 PM</span>
              <span className="text-[8px] text-[#53bdeb]">✓✓</span>
            </div>
          </div>
        </div>

        {/* Incoming */}
        <div className="flex items-end gap-1.5">
          <img src={avatarPriya} alt="" className="w-5 h-5 rounded-full object-cover mb-1 shrink-0" />
          <div className="max-w-[72%] px-2.5 py-1.5 rounded-xl rounded-bl-sm bg-[#202c33] shadow-sm">
            <p className="text-[10.5px] text-white/90 leading-relaxed">Ok let me think... will get back</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[8px] text-white/25">3:31 PM</span>
            </div>
          </div>
        </div>

        {/* Outgoing with pending ticks */}
        <div className="flex justify-end">
          <div className="max-w-[72%] px-2.5 py-1.5 rounded-xl rounded-br-sm bg-[#005c4b] shadow-sm relative">
            <p className="text-[10.5px] text-white/90 leading-relaxed">Hello? Still interested? 😊</p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span className="text-[8px] text-white/25">5:15 PM</span>
              <span className="text-[8px] text-white/30">✓✓</span>
            </div>
          </div>
        </div>

        {/* No response indicator */}
        <div className="flex justify-center pt-2">
          <span className="text-[8px] text-white/15 bg-[#1f2c33]/50 px-3 py-0.5 rounded-full">⏳ No response since 5:15 PM</span>
        </div>
      </div>

      {/* Input bar */}
      <div className="px-2 py-2 bg-[#1f2c33] flex items-center gap-2 border-t border-white/[0.05]">
        <div className="w-7 h-7 rounded-full bg-[#2a3942] flex items-center justify-center shrink-0">
          <span className="text-[12px]">😊</span>
        </div>
        <Paperclip className="w-4 h-4 text-white/25 shrink-0" />
        <div className="flex-1 h-8 rounded-full bg-[#2a3942] px-3 flex items-center">
          <span className="text-[10px] text-white/20">Type a message...</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#00a884] flex items-center justify-center shrink-0">
          <Mic className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </div>
  );
}

function UnreadChats() {
  const chats = [
    { name: "Rahul K.", msg: "What's the price for blue one?", time: "12m", count: 3, avatar: avatarRahul },
    { name: "Sneha D.", msg: "Payment sent where? UPI?", time: "25m", count: 1, avatar: avatarSneha },
    { name: "Vikram P.", msg: "Still available??? Hello??", time: "1h", count: 7, avatar: avatarVikram },
    { name: "Meera S.", msg: "Can you ship to Mumbai?", time: "2h", count: 2, avatar: avatarMeera },
    { name: "Arjun R.", msg: "Last price? I'll buy now", time: "3h", count: 1, avatar: avatarArjun },
  ];

  return (
    <div className="space-y-2 overflow-hidden hidden md:block">
      {/* WhatsApp-style list header */}
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-[10px] text-[#00a884]/60 font-bold uppercase tracking-wider">Unread Chats</span>
        <span className="text-[9px] text-red-400/50">47 pending</span>
      </div>
      {chats.map((n, i) => (
        <motion.div
          key={i}
          initial={{ x: -10, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.08 + 0.3 }}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-[#111b21]/80 border border-white/[0.04] hover:bg-[#1f2c33]/50 transition-colors"
        >
          <img src={n.avatar} alt={n.name} className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-white/70 font-semibold truncate">{n.name}</p>
              <span className="text-[8px] text-white/20 shrink-0">{n.time}</span>
            </div>
            <p className="text-[10px] text-white/25 truncate">{n.msg}</p>
          </div>
          <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
            <span className="text-[9px] text-white font-bold">{n.count}</span>
          </div>
        </motion.div>
      ))}
      <div className="text-center pt-1">
        <span className="text-[9px] text-red-400/30 italic">+ 42 more unread conversations...</span>
      </div>
    </div>
  );
}

function ZatchLiveStream() {
  const [viewers, setViewers] = useState(342);
  useEffect(() => {
    const i = setInterval(() => setViewers(v => v + Math.floor(Math.random() * 3) - 1), 8000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="bg-gradient-to-br from-[#0a1a0f] to-[#050d08] rounded-2xl border border-[#cafe38]/15 overflow-hidden">
      <div className="aspect-[16/10] relative overflow-hidden">
        <img src={liveStreamImg} alt="Live saree selling" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Live badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/90 backdrop-blur-sm shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] text-white font-bold">LIVE</span>
        </div>

        {/* Viewer count */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
          <Users className="w-3 h-3 text-[#cafe38]" />
          <span className="text-[10px] text-white font-bold">{viewers}</span>
        </div>

        {/* Live chat overlay */}
        <div className="absolute bottom-3 left-3 right-3 space-y-1">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 w-fit">
            <img src={avatarMeera} alt="" className="w-4 h-4 rounded-full object-cover" />
            <span className="text-[9px] text-white/80">Beautiful collection! 😍</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 w-fit">
            <img src={avatarRahul} alt="" className="w-4 h-4 rounded-full object-cover" />
            <span className="text-[9px] text-white/80">Can I Zatch the red one? 🔴</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-[11px] text-white/80 font-semibold">Silk Sarees Collection - Starting ₹899</p>
        <p className="text-[10px] text-white/30 mt-0.5">Live now · 12 items listed</p>
      </div>
    </div>
  );
}

function ZatchNegotiationCard() {
  return (
    <div className="bg-[#0a0f0a] rounded-2xl border border-[#cafe38]/10 p-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[#cafe38]/60 font-bold uppercase tracking-wider">Auto-Negotiation</span>
        <span className="text-[9px] text-white/20 bg-white/5 px-2 py-0.5 rounded-full">Active</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <img src={avatarPriya} alt="" className="w-5 h-5 rounded-full object-cover" />
            <span className="text-[10px] text-white/60">Buyer offered</span>
          </div>
          <span className="text-[11px] text-white/80 font-bold">₹750</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#cafe38]/20 flex items-center justify-center"><Zap className="w-2.5 h-2.5 text-[#cafe38]" /></div>
            <span className="text-[10px] text-[#cafe38]/60">Zatch&trade; countered</span>
          </div>
          <span className="text-[11px] text-[#cafe38] font-bold">₹899</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex items-center justify-between py-1.5 bg-[#cafe38]/5 rounded-lg px-2 border border-[#cafe38]/10"
        >
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3 text-[#cafe38]" />
            <span className="text-[10px] text-[#cafe38]/80 font-semibold">Deal Closed</span>
          </div>
          <span className="text-[11px] text-[#cafe38] font-bold">₹850</span>
        </motion.div>
      </div>
    </div>
  );
}

function ZatchPaymentCard() {
  return (
    <div className="bg-[#0a0f0a] rounded-2xl border border-[#cafe38]/10 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-[#cafe38]/60 font-bold uppercase tracking-wider">Payments</span>
        <div className="flex items-center gap-1 text-[9px] text-[#cafe38]/80 bg-[#cafe38]/10 px-2 py-0.5 rounded-full border border-[#cafe38]/20">
          <ShieldCheck className="w-2.5 h-2.5" /> Secure
        </div>
      </div>
      {[
        { name: "Priya M.", amount: "₹2,400", time: "2m ago", avatar: avatarPriya },
        { name: "Rahul K.", amount: "₹4,500", time: "5m ago", avatar: avatarRahul },
        { name: "Sneha D.", amount: "₹1,200", time: "8m ago", avatar: avatarSneha },
      ].map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3 + 0.5 }}
          className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0"
        >
          <div className="flex items-center gap-2">
            <img src={p.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
            <span className="text-[10px] text-white/50">{p.name}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#cafe38] font-bold">{p.amount}</span>
            <span className="text-[8px] text-white/20 ml-1.5">{p.time}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ForSellers({ onJoinWaitlist }: { onJoinWaitlist?: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  const handleMouseDown = useCallback(() => setIsDragging(true), []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { if (isDragging) handleSliderMove(e.clientX); };
    const handleTouchMove = (e: TouchEvent) => { if (isDragging) handleSliderMove(e.touches[0].clientX); };
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, handleSliderMove]);

  return (
    <section id="sellers" ref={ref} className="py-20 md:py-28 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 md:mb-24 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#cafe38]" />
              <span className="text-[11px] font-bold text-[#cafe38] tracking-[0.4em] uppercase" data-testid="text-sellers-tag">For Sellers</span>
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-[4.5rem] font-bold font-display tracking-tight leading-[0.95]" data-testid="text-sellers-heading">
              <span className="text-white">Your DMs</span><br />
              <span className="text-white">Are Not a</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cafe38] via-[#cafe38] to-[#cafe38]/50">Sales System.</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:text-right"
          >
            <p className="text-base md:text-lg text-white/30 leading-relaxed max-w-md lg:ml-auto">
              Drag the slider to see how Zatch&trade; transforms the way you sell - from DM chaos to automated deals.
            </p>
          </motion.div>
        </div>

        {/* The Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div
            ref={sliderRef}
            className="relative w-full max-w-6xl mx-auto rounded-[2rem] overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-[0_0_80px_rgba(0,0,0,0.8)] select-none"
            style={{ aspectRatio: '16/9' }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* Browser Chrome */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#1a1a1a]/90 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-4 z-30">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-white/[0.06] border border-white/[0.06] text-[10px] text-white/30 font-mono flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" />
                  seller-dashboard.zatch.in
                </div>
              </div>
            </div>

            {/* OLD WAY (Left/Background layer) */}
            <div className="absolute inset-0 pt-10 bg-gradient-to-br from-[#1a0808] via-[#0f0505] to-[#080303]">
              <div className="absolute inset-0 pt-10 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,0,0,0.1) 20px, rgba(255,0,0,0.1) 21px)' }} />

              <div className="p-4 md:p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-red-500/70" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-400/80">The Old Way</h4>
                    <p className="text-[9px] text-red-400/30 uppercase tracking-widest">Manual Selling via DMs</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                      <span className="text-[9px] text-red-400/60 font-bold">47 unread</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden">
                  <WhatsAppChat />
                  <UnreadChats />
                </div>
              </div>
            </div>

            {/* ZATCH WAY (Right/Foreground layer - clipped) */}
            <div
              className="absolute inset-0 pt-10 bg-gradient-to-br from-[#040d08] via-[#030a06] to-[#030303]"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <div className="p-4 md:p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#cafe38]/10 border border-[#cafe38]/20 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-[#cafe38]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#cafe38]/90">The Zatch&trade; Way</h4>
                    <p className="text-[9px] text-[#cafe38]/30 uppercase tracking-widest">Automated Live Selling</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded-full bg-[#cafe38]/10 border border-[#cafe38]/20">
                      <span className="text-[9px] text-[#cafe38]/80 font-bold">All automated</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden">
                  <div className="space-y-3">
                    <ZatchLiveStream />
                    <ZatchPaymentCard />
                  </div>
                  <div className="space-y-3 hidden md:block">
                    <ZatchNegotiationCard />

                    <div className="bg-[#0a0f0a] rounded-2xl border border-[#cafe38]/10 p-3">
                      <span className="text-[10px] text-[#cafe38]/60 font-bold uppercase tracking-wider">Today's Summary</span>
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {[
                          { label: "Sales", value: "₹24.5K", icon: TrendingUp },
                          { label: "Orders", value: "18", icon: IndianRupee },
                          { label: "Time Saved", value: "4.2h", icon: Clock },
                        ].map((s, i) => (
                          <div key={i} className="text-center py-2 rounded-xl bg-[#cafe38]/5 border border-[#cafe38]/10">
                            <s.icon className="w-3 h-3 text-[#cafe38]/50 mx-auto mb-1" />
                            <p className="text-[13px] text-[#cafe38] font-bold">{s.value}</p>
                            <p className="text-[8px] text-white/20 uppercase tracking-wider">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#0a0f0a] rounded-2xl border border-[#cafe38]/10 p-3">
                      <span className="text-[10px] text-[#cafe38]/60 font-bold uppercase tracking-wider">Activity Feed</span>
                      <div className="mt-2 space-y-2">
                        {[
                          "Auto-negotiation closed at ₹850",
                          "Payment received from Priya M.",
                          "New viewer milestone: 500+",
                        ].map((a, i) => (
                          <div key={i} className="flex items-center gap-2 py-1">
                            <div className="w-1 h-1 rounded-full bg-[#cafe38]/50" />
                            <span className="text-[10px] text-white/35">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDER HANDLE */}
            <div
              className="absolute top-10 bottom-0 z-40 cursor-col-resize"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-px h-full bg-white/30 relative">
                <motion.div
                  className="absolute top-0 w-px h-full bg-gradient-to-b from-red-500/50 via-white/60 to-[#cafe38]/50"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-16 rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center gap-0.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:border-white/40 hover:scale-110 transition-all duration-300 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-4 h-4 text-white/50" />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-6 whitespace-nowrap">
                  <span className="text-[10px] text-red-400/60 font-bold uppercase tracking-widest bg-[#0a0505]/80 backdrop-blur-sm px-2 py-1 rounded-md border border-red-500/10">Old Way</span>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 left-6 whitespace-nowrap">
                  <span className="text-[10px] text-[#cafe38]/60 font-bold uppercase tracking-widest bg-[#050a05]/80 backdrop-blur-sm px-2 py-1 rounded-md border border-[#cafe38]/10">Zatch</span>
                </div>
              </div>
            </div>

            {/* Drag Hint */}
            <AnimatePresence>
              {!hasInteracted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10"
                >
                  <motion.div animate={{ x: [-8, 8, -8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <GripVertical className="w-3.5 h-3.5 text-white/60" />
                  </motion.div>
                  <span className="text-[11px] text-white/50 font-medium">Drag to compare</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {[
            { value: "3x", label: "More Sales", color: "text-[#cafe38]" },
            { value: "2 min", label: "Avg. Close Time", color: "text-[#cafe38]" },
            { value: "0", label: "Manual Follow-ups", color: "text-[#cafe38]" },
            { value: "100%", label: "Payment Tracked", color: "text-[#cafe38]" },
          ].map((s, i) => (
            <div key={i} className="text-center py-5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <span className={`text-2xl md:text-3xl font-bold font-display ${s.color}`}>{s.value}</span>
              <p className="text-[10px] text-white/25 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { icon: Video, title: "Content to Revenue", desc: "Every live. Every reel. Monetized instantly." },
              { icon: MessageCircle, title: "Built-In Negotiation", desc: "Automated bargaining. No more DM juggling." },
              { icon: Zap, title: "Instant Payments", desc: "UPI and token flow handled automatically." },
              { icon: DollarSign, title: "Low Commission", desc: "You keep more of what you earn. Always." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <SpotlightCard className="group">
                    <div className="p-6 h-full flex flex-col items-start">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-[#cafe38]/10 group-hover:border-[#cafe38]/30 transition-all duration-500">
                        <Icon className="w-4 h-4 text-white/30 group-hover:text-[#cafe38] transition-colors duration-500" />
                      </div>
                      <h4 className="text-sm font-bold text-white/90 mb-1.5">{item.title}</h4>
                      <p className="text-white/30 text-[13px] leading-relaxed">{item.desc}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 md:mt-20 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#cafe38]/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Button
              size="lg"
              onClick={onJoinWaitlist}
              className="relative bg-[#cafe38] text-black hover:bg-[#cafe38]/90 font-bold px-10 h-14 rounded-full text-base shadow-[0_0_40px_rgba(202,254,56,0.2)] hover:shadow-[0_0_60px_rgba(202,254,56,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group"
              data-testid="button-seller-waitlist"
            >
              Start Selling Today <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-white/20">No website needed · Setup in 2 minutes</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
