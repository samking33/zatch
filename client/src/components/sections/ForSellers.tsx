import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, DollarSign, MessageCircle, X, Check, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

// Import generated textures
import shatteredGlass from "@/assets/textures/shattered-glass.png";
import circuitPattern from "@/assets/textures/circuit-pattern.png";

export function ForSellers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sellers" ref={ref} className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] left-[10%] w-2 h-2 bg-primary rounded-full blur-[2px]"
         />
         <motion.div 
            animate={{ y: [0, -150, 0], opacity: [0, 0.3, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute top-[60%] right-[15%] w-1 h-1 bg-white rounded-full blur-[1px]"
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">For Sellers</h2>
            <h3 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6">
              Your DMs Are Not <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-shine bg-[length:200%_auto]">a Sales System.</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop managing conversations. Start closing deals.
            </p>
          </motion.div>
        </div>

        {/* Comparison Section - Redesigned */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto relative">
          
          {/* Energy Beam Connector (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-24 pointer-events-none">
             <div className="absolute inset-0 bg-primary/20 blur-[20px] animate-pulse" />
             <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                <path d="M0,50 Q25,40 50,50 T100,50" fill="none" stroke="#C7F04F" strokeWidth="2" className="animate-pulse shadow-[0_0_10px_#C7F04F]">
                   <animate attributeName="d" values="M0,50 Q25,45 50,50 T100,50; M0,50 Q25,55 50,50 T100,50; M0,50 Q25,45 50,50 T100,50" dur="0.2s" repeatCount="indefinite" />
                </path>
                <circle cx="50" cy="50" r="4" fill="#fff" className="animate-ping" />
             </svg>
          </div>

          {/* The Pain (Reality) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative p-10 rounded-[2.5rem] bg-red-950/20 border border-red-900/40 overflow-hidden hover:bg-red-950/30 transition-all duration-500"
          >
            {/* Shattered Glass Texture */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
               <img src={shatteredGlass} alt="" className="w-full h-full object-cover grayscale contrast-150" />
            </div>
            
            {/* Glitch Effect on Hover */}
            <div className="absolute inset-0 bg-red-500/5 mix-blend-color-dodge opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-100 pointer-events-none" />

            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 text-red-500 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <X className="w-6 h-6" />
               </div>
               <h4 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-100" style={{ textShadow: '2px 0 rgba(255,0,0,0.5), -2px 0 rgba(0,255,255,0.3)' }}>The Old Way</h4>
               <p className="text-red-400 font-medium mb-8">Chaos & Manual Work</p>
               
               <ul className="space-y-6">
                 {[
                   "Closing one sale takes 15+ mins",
                   "Endless DM back & forth",
                   "Chasing payments manually",
                   "Ghosted by buyers constantly"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-white/60 group-hover:text-white/80 transition-colors">
                     <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                       <X className="w-3 h-3 text-red-500" />
                     </div>
                     <span className="text-lg">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </motion.div>

          {/* The Gain (Zatch) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative p-10 rounded-[2.5rem] bg-black border border-primary/50 overflow-hidden shadow-[0_0_40px_-10px_rgba(199,240,79,0.2)] hover:shadow-[0_0_60px_-10px_rgba(199,240,79,0.4)] transition-all duration-500"
          >
            {/* Circuit Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
               <img src={circuitPattern} alt="" className="w-full h-full object-cover opacity-50 mix-blend-screen" />
            </div>

            {/* Comet Streak Animation */}
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_80deg,rgba(199,240,79,0.3)_180deg,transparent_180deg)] animate-[spin_4s_linear_infinite] opacity-50" />
            
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-6 text-black border border-primary shadow-[0_0_20px_rgba(199,240,79,0.6)]">
                  <Check className="w-6 h-6 font-bold" />
               </div>
               <h4 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(199,240,79,0.5)]">The Zatch Way</h4>
               <p className="text-primary font-medium mb-8 drop-shadow-[0_0_5px_rgba(199,240,79,0.8)]">Automated & Instant</p>
               
               <ul className="space-y-6">
                 {[
                   "One live stream = Hundreds of potential sales",
                   "Negotiate instantly with auto-counter offers",
                   "Payments collected inside the app",
                   "Zero manual tracking needed"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-white group-hover:translate-x-2 transition-transform duration-300">
                     <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(199,240,79,0.8)]">
                       <Check className="w-3 h-3 text-black font-bold" />
                     </div>
                     <span className="text-lg font-medium">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid with Spotlight Effect */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Video, title: "Content to Revenue", desc: "Every live. Every reel. Monetized instantly." },
            { icon: MessageCircle, title: "Built-In Negotiation", desc: "Automated bargaining. No more DM juggling." },
            { icon: Zap, title: "Instant Payments", desc: "UPI and token flow handled automatically." },
            { icon: DollarSign, title: "Low Commission", desc: "You keep more of what you earn. Always." },
          ].map((item, i) => {
            const Icon = item.icon; 
            return (
              <SpotlightCard key={i} className="group">
                <div className="p-8 h-full flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-colors duration-300">
                    <Icon className="w-7 h-7 text-white group-hover:text-black transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </SpotlightCard>
            )
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center relative"
        >
          {/* Floating Elements around CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          
          <Button size="lg" className="relative bg-white text-black hover:bg-primary hover:text-black font-bold px-10 h-16 rounded-full text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(199,240,79,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group">
            Start Selling Today <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-6 text-sm text-white/40">No website needed • Setup in 2 minutes</p>
        </motion.div>
      </div>
    </section>
  );
}
