import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, DollarSign, MessageCircle, X, Check, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

// Import generated textures
import shatteredGlass from "@/assets/textures/shattered-glass.png";
import circuitPattern from "@/assets/textures/circuit-pattern.png";
import energyCable from "@/assets/textures/energy-cable.png";

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
            <h2 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-4">FOR SELLERS</h2>
            <h3 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6">
              Your DMs Are Not <br />
              <span className="text-[#C7F04F] drop-shadow-[0_0_15px_rgba(199,240,79,0.5)]">a Sales System.</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop managing conversations. Start closing deals.
            </p>
          </motion.div>
        </div>

        {/* Comparison Section - Matches Image EXACTLY */}
        <div className="grid md:grid-cols-2 gap-0 mb-24 max-w-5xl mx-auto relative items-center">
          
          {/* Energy Beam Connector (Desktop) - Positioned between cards */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-20 w-32 h-24 pointer-events-none flex items-center justify-center">
             <div className="relative w-full h-full">
                {/* Glowing tube/cable effect */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-black/50 backdrop-blur-sm border-y border-white/10" />
                
                {/* Inner Energy Beam */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-[#C7F04F] shadow-[0_0_20px_#C7F04F] animate-pulse">
                   <div className="absolute inset-0 bg-white/50 blur-[2px]" />
                </div>
                
                {/* Lightning Arcs */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100">
                   <path d="M0,50 Q25,35 50,50 T100,50" fill="none" stroke="#C7F04F" strokeWidth="2" className="animate-pulse opacity-80 filter drop-shadow-[0_0_5px_#C7F04F]">
                      <animate attributeName="d" values="M0,50 Q25,45 50,50 T100,50; M0,50 Q25,55 50,50 T100,50; M0,50 Q25,45 50,50 T100,50" dur="0.1s" repeatCount="indefinite" />
                   </path>
                </svg>
             </div>
          </div>

          {/* The Pain (Reality) - Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative h-[500px] p-10 rounded-[2.5rem] bg-[#1a0505] border border-red-900/30 overflow-hidden md:mr-4"
          >
            {/* Dark Red Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-black pointer-events-none" />
            
            {/* Shattered Glass Texture - Centered & Realistic */}
            <div className="absolute top-10 right-10 w-64 h-64 opacity-60 mix-blend-overlay pointer-events-none">
               <img src={shatteredGlass} alt="" className="w-full h-full object-contain brightness-150 contrast-125" />
            </div>
            
            {/* Glitch Effect - Chromatic Aberration */}
            <div className="absolute top-20 left-0 w-full h-1 bg-cyan-500/50 mix-blend-color-dodge opacity-0 group-hover:opacity-100 animate-[glitch_2s_infinite_steps(2)] pointer-events-none" />
            <div className="absolute top-40 right-0 w-full h-1 bg-red-500/50 mix-blend-color-dodge opacity-0 group-hover:opacity-100 animate-[glitch_3s_infinite_steps(2)] pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
               <div className="w-10 h-10 rounded-full bg-[#2a1010] flex items-center justify-center mb-6 border border-red-500/20">
                  <X className="w-4 h-4 text-red-500" />
               </div>
               
               <h4 className="text-3xl font-bold text-white mb-2">The Old Way</h4>
               <p className="text-red-400 font-medium mb-12">Chaos & Manual Work</p>
               
               <ul className="space-y-6 mt-auto">
                 {[
                   "Closing one sale takes 15+ mins",
                   "Endless DM back & forth",
                   "Chasing payments manually",
                   "Ghosted by buyers constantly"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-white/50">
                     <div className="w-5 h-5 rounded-full bg-[#2a1010] flex items-center justify-center shrink-0 border border-red-900/30">
                       <X className="w-2.5 h-2.5 text-red-500" />
                     </div>
                     <span className="text-lg font-light">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </motion.div>

          {/* The Gain (Zatch) - Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative h-[500px] p-10 rounded-[2.5rem] bg-[#0a1105] border-[2px] border-[#C7F04F] overflow-hidden shadow-[0_0_50px_-10px_rgba(199,240,79,0.3)] md:ml-4"
          >
            {/* Green Glow Inner */}
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(199,240,79,0.1)] rounded-[2.5rem] pointer-events-none" />

            {/* Circuit Pattern - Faint Background */}
            <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
               <img src={circuitPattern} alt="" className="w-full h-full object-cover mix-blend-screen opacity-40" />
            </div>

            {/* Comet Streak - The "Swoosh" Effect */}
            <div className="absolute top-[30%] left-[-10%] w-[120%] h-[100px] pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path d="M0,80 Q200,80 400,20" fill="none" stroke="url(#cometGradient)" strokeWidth="3" className="filter drop-shadow-[0_0_5px_#C7F04F]" />
                  <defs>
                     <linearGradient id="cometGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#C7F04F" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#fff" />
                     </linearGradient>
                  </defs>
               </svg>
               {/* Glowing Head of Comet */}
               <div className="absolute top-[20%] right-[0%] w-20 h-20 bg-[#C7F04F] rounded-full blur-[30px] opacity-40 animate-pulse" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
               <div className="w-10 h-10 rounded-full bg-[#C7F04F] flex items-center justify-center mb-6 border border-[#C7F04F] shadow-[0_0_15px_#C7F04F]">
                  <Check className="w-5 h-5 text-black font-bold" />
               </div>
               
               <h4 className="text-3xl font-bold text-white mb-2">The Zatch Way</h4>
               <p className="text-[#C7F04F] font-medium mb-12">Automated & Instant</p>
               
               <ul className="space-y-6 mt-auto">
                 {[
                   "One live stream = Hundreds of potential sales",
                   "Negotiate instantly with auto-counter offers",
                   "Payments collected inside the app",
                   "Zero manual tracking needed"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-white">
                     <div className="w-5 h-5 rounded-full bg-[#C7F04F] flex items-center justify-center shrink-0 shadow-[0_0_10px_#C7F04F]">
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
