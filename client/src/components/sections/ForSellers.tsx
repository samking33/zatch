import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Zap, DollarSign, MessageCircle, X, Check, Video, Wifi, Battery, Signal, ChevronLeft, ChevronRight, Bell, Camera, Phone, Paperclip, Mic, Send, Play, Users, IndianRupee, ShieldCheck, Clock, TrendingUp, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

function FakeDMBubble({ text, time, isMe, unread }: { text: string; time: string; isMe?: boolean; unread?: boolean }) {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[75%] px-3 py-2 rounded-2xl ${isMe ? 'bg-[#005c4b] rounded-br-md' : 'bg-[#1f2c33] rounded-bl-md'} relative`}>
        <p className="text-[11px] text-white/90 leading-relaxed">{text}</p>
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[9px] text-white/30">{time}</span>
          {isMe && <span className="text-[9px] text-white/30">✓✓</span>}
        </div>
        {unread && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">!</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ZatchStreamCard() {
  const [viewers, setViewers] = useState(342);
  useEffect(() => {
    const i = setInterval(() => setViewers(v => v + Math.floor(Math.random() * 3) - 1), 2000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="bg-gradient-to-br from-[#0a1a0f] to-[#050d08] rounded-2xl border border-[#39FF14]/15 overflow-hidden">
      <div className="aspect-[16/10] bg-gradient-to-br from-[#0f1a10] to-[#080f08] relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 flex items-center justify-center">
          <Play className="w-6 h-6 text-[#39FF14] ml-1" fill="currentColor" />
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/90 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] text-white font-bold">LIVE</span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
          <Users className="w-3 h-3 text-[#39FF14]" />
          <span className="text-[10px] text-white font-bold">{viewers}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#39FF14]/60 rounded-full" animate={{ width: ['20%', '80%'] }} transition={{ duration: 20, repeat: Infinity }} />
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-[11px] text-white/80 font-semibold">Silk Sarees Collection — Starting ₹899</p>
        <p className="text-[10px] text-white/30 mt-0.5">Live now · 12 items listed</p>
      </div>
    </div>
  );
}

function ZatchNegotiationCard() {
  return (
    <div className="bg-[#0a0f0a] rounded-2xl border border-[#39FF14]/10 p-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[#39FF14]/60 font-bold uppercase tracking-wider">Auto-Negotiation</span>
        <span className="text-[9px] text-white/20 bg-white/5 px-2 py-0.5 rounded-full">Active</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"><span className="text-[8px]">👤</span></div>
            <span className="text-[10px] text-white/60">Buyer offered</span>
          </div>
          <span className="text-[11px] text-white/80 font-bold">₹750</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#39FF14]/20 flex items-center justify-center"><Zap className="w-2.5 h-2.5 text-[#39FF14]" /></div>
            <span className="text-[10px] text-[#39FF14]/60">Zatch countered</span>
          </div>
          <span className="text-[11px] text-[#39FF14] font-bold">₹899</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex items-center justify-between py-1.5 bg-[#39FF14]/5 rounded-lg px-2 border border-[#39FF14]/10"
        >
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3 text-[#39FF14]" />
            <span className="text-[10px] text-[#39FF14]/80 font-semibold">Deal Closed</span>
          </div>
          <span className="text-[11px] text-[#39FF14] font-bold">₹850</span>
        </motion.div>
      </div>
    </div>
  );
}

function ZatchPaymentCard() {
  return (
    <div className="bg-[#0a0f0a] rounded-2xl border border-[#39FF14]/10 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-[#39FF14]/60 font-bold uppercase tracking-wider">Payments</span>
        <div className="flex items-center gap-1 text-[9px] text-[#39FF14]/80 bg-[#39FF14]/10 px-2 py-0.5 rounded-full border border-[#39FF14]/20">
          <ShieldCheck className="w-2.5 h-2.5" /> Secure
        </div>
      </div>
      {[
        { name: "Priya M.", amount: "₹2,400", time: "2m ago" },
        { name: "Rahul K.", amount: "₹4,500", time: "5m ago" },
        { name: "Sneha D.", amount: "₹1,200", time: "8m ago" },
      ].map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3 + 0.5 }}
          className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#39FF14]/10 flex items-center justify-center text-[8px]">✓</div>
            <span className="text-[10px] text-white/50">{p.name}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#39FF14] font-bold">{p.amount}</span>
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
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

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
    <section id="sellers" ref={ref} className="py-32 md:py-40 bg-[#030303] relative overflow-hidden">
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
              <div className="w-8 h-px bg-[#39FF14]" />
              <span className="text-[11px] font-bold text-[#39FF14] tracking-[0.4em] uppercase" data-testid="text-sellers-tag">For Sellers</span>
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-[4.5rem] font-bold font-display tracking-tight leading-[0.95]" data-testid="text-sellers-heading">
              <span className="text-white">Your DMs</span><br />
              <span className="text-white">Are Not a</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] via-[#39FF14] to-[#39FF14]/50">Sales System.</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:text-right"
          >
            <p className="text-base md:text-lg text-white/30 leading-relaxed max-w-md lg:ml-auto">
              Drag the slider to see how Zatch transforms the way you sell — from DM chaos to automated deals.
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
              <div className="absolute inset-0 pt-10 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,0,0,0.1) 20px, rgba(255,0,0,0.1) 21px)', }} />

              <div className="p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
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

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                  {/* DM Thread */}
                  <div className="bg-[#111b21] rounded-2xl overflow-hidden border border-white/[0.05] flex flex-col">
                    <div className="px-3 py-2.5 bg-[#1f2c33] flex items-center gap-2 border-b border-white/[0.05]">
                      <ChevronLeft className="w-4 h-4 text-white/40" />
                      <div className="w-7 h-7 rounded-full bg-gray-600/30" />
                      <div className="flex-1">
                        <p className="text-[11px] text-white/80 font-semibold">Priya (Buyer)</p>
                        <p className="text-[9px] text-white/30">last seen 2h ago</p>
                      </div>
                      <Phone className="w-4 h-4 text-white/30" />
                      <Camera className="w-4 h-4 text-white/30" />
                    </div>
                    <div className="flex-1 p-3 space-y-0.5 overflow-hidden" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.015\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
                      <FakeDMBubble text="Hi, is this saree still available?" time="2:14 PM" />
                      <FakeDMBubble text="Yes available! ₹1,200" time="2:45 PM" isMe />
                      <FakeDMBubble text="Last price please?" time="2:46 PM" />
                      <FakeDMBubble text="₹1,100 final" time="3:10 PM" isMe />
                      <FakeDMBubble text="₹800 possible?" time="3:11 PM" />
                      <FakeDMBubble text="No ma'am, minimum ₹1,000" time="3:30 PM" isMe />
                      <FakeDMBubble text="Ok let me think..." time="3:31 PM" />
                      <FakeDMBubble text="Hello? Will you take it?" time="5:15 PM" isMe unread />
                      <div className="flex justify-center py-2">
                        <span className="text-[9px] text-white/20 bg-[#1f2c33] px-3 py-0.5 rounded-full">No response since 5:15 PM</span>
                      </div>
                    </div>
                    <div className="px-2 py-2 bg-[#1f2c33] flex items-center gap-2 border-t border-white/[0.05]">
                      <Paperclip className="w-4 h-4 text-white/30 shrink-0" />
                      <div className="flex-1 h-8 rounded-full bg-[#2a3942] px-3 flex items-center">
                        <span className="text-[10px] text-white/20">Type a message...</span>
                      </div>
                      <Mic className="w-4 h-4 text-white/30 shrink-0" />
                    </div>
                  </div>

                  {/* Notification Stack */}
                  <div className="space-y-3 overflow-hidden hidden md:block">
                    {[
                      { name: "Rahul K.", msg: "What's the price for blue one?", time: "12m", count: 3 },
                      { name: "Sneha D.", msg: "Payment sent where?", time: "25m", count: 1 },
                      { name: "Vikram P.", msg: "Still available??? Hello?", time: "1h", count: 7 },
                      { name: "Meera S.", msg: "Can you ship to Mumbai?", time: "2h", count: 2 },
                      { name: "Arjun R.", msg: "Last price? I'll buy now", time: "3h", count: 1 },
                    ].map((n, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-700/30 flex items-center justify-center text-[10px] text-white/30 shrink-0">
                          {n.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-white/60 font-semibold truncate">{n.name}</p>
                          <p className="text-[10px] text-white/25 truncate">{n.msg}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-[9px] text-white/20">{n.time}</span>
                          <div className="w-4 h-4 rounded-full bg-red-500/80 flex items-center justify-center">
                            <span className="text-[8px] text-white font-bold">{n.count}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div className="text-center pt-2">
                      <span className="text-[10px] text-red-400/40">+ 42 more unread conversations...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ZATCH WAY (Right/Foreground layer - clipped) */}
            <div
              className="absolute inset-0 pt-10 bg-gradient-to-br from-[#040d08] via-[#030a06] to-[#030303]"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <div className="p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-[#39FF14]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#39FF14]/90">The Zatch Way</h4>
                    <p className="text-[9px] text-[#39FF14]/30 uppercase tracking-widest">Automated Live Selling</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20">
                      <span className="text-[9px] text-[#39FF14]/80 font-bold">All automated</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
                  <div className="space-y-4">
                    <ZatchStreamCard />
                    <ZatchPaymentCard />
                  </div>
                  <div className="space-y-4 hidden md:block">
                    <ZatchNegotiationCard />

                    {/* Stats overview */}
                    <div className="bg-[#0a0f0a] rounded-2xl border border-[#39FF14]/10 p-3">
                      <span className="text-[10px] text-[#39FF14]/60 font-bold uppercase tracking-wider">Today's Summary</span>
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {[
                          { label: "Sales", value: "₹24.5K", icon: TrendingUp },
                          { label: "Orders", value: "18", icon: IndianRupee },
                          { label: "Time Saved", value: "4.2h", icon: Clock },
                        ].map((s, i) => (
                          <div key={i} className="text-center py-2 rounded-xl bg-[#39FF14]/5 border border-[#39FF14]/10">
                            <s.icon className="w-3 h-3 text-[#39FF14]/50 mx-auto mb-1" />
                            <p className="text-[13px] text-[#39FF14] font-bold">{s.value}</p>
                            <p className="text-[8px] text-white/20 uppercase tracking-wider">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent activity */}
                    <div className="bg-[#0a0f0a] rounded-2xl border border-[#39FF14]/10 p-3">
                      <span className="text-[10px] text-[#39FF14]/60 font-bold uppercase tracking-wider">Activity Feed</span>
                      <div className="mt-2 space-y-2">
                        {[
                          "Auto-negotiation closed at ₹850",
                          "Payment received from Priya M.",
                          "New viewer milestone: 500+",
                        ].map((a, i) => (
                          <div key={i} className="flex items-center gap-2 py-1">
                            <div className="w-1 h-1 rounded-full bg-[#39FF14]/50" />
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
                  className="absolute top-0 w-px h-full bg-gradient-to-b from-red-500/50 via-white/60 to-[#39FF14]/50"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-16 rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center gap-0.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:border-white/40 hover:scale-110 transition-all duration-300 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-4 h-4 text-white/50" />
                </div>

                {/* Labels */}
                <div className="absolute top-1/2 -translate-y-1/2 right-6 whitespace-nowrap">
                  <span className="text-[10px] text-red-400/60 font-bold uppercase tracking-widest bg-[#0a0505]/80 backdrop-blur-sm px-2 py-1 rounded-md border border-red-500/10">Old Way</span>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 left-6 whitespace-nowrap">
                  <span className="text-[10px] text-[#39FF14]/60 font-bold uppercase tracking-widest bg-[#050a05]/80 backdrop-blur-sm px-2 py-1 rounded-md border border-[#39FF14]/10">Zatch</span>
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
            { value: "3x", label: "More Sales", color: "text-[#39FF14]" },
            { value: "2 min", label: "Avg. Close Time", color: "text-[#39FF14]" },
            { value: "0", label: "Manual Follow-ups", color: "text-[#39FF14]" },
            { value: "100%", label: "Payment Tracked", color: "text-[#39FF14]" },
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
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-[#39FF14]/10 group-hover:border-[#39FF14]/30 transition-all duration-500">
                        <Icon className="w-4 h-4 text-white/30 group-hover:text-[#39FF14] transition-colors duration-500" />
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#39FF14]/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Button
              size="lg"
              onClick={onJoinWaitlist}
              className="relative bg-[#39FF14] text-black hover:bg-[#39FF14]/90 font-bold px-10 h-14 rounded-full text-base shadow-[0_0_40px_rgba(57,255,20,0.2)] hover:shadow-[0_0_60px_rgba(57,255,20,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group"
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
