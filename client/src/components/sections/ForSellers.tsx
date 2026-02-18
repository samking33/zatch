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
      
      {/* Floating Particles & Vertical Streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(5)].map((_, i) => (
           <motion.div
             key={`particle-${i}`}
             initial={{ y: "100%", opacity: 0 }}
             animate={{ y: "-100%", opacity: [0, 0.5, 0] }}
             transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear", delay: i * 3 }}
             className="absolute w-[1px] bg-gradient-to-t from-transparent via-primary/30 to-transparent"
             style={{ height: `${200 + i * 50}px`, left: `${10 + i * 20}%` }}
           />
         ))}
         <motion.div 
            animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] left-[10%] w-2 h-2 bg-primary rounded-full blur-[2px] shadow-[0_0_10px_#C7F04F]"
         />
         <motion.div 
            animate={{ y: [0, -150, 0], opacity: [0, 0.3, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute top-[60%] right-[15%] w-1 h-1 bg-white rounded-full blur-[1px] shadow-[0_0_10px_white]"
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4 drop-shadow-[0_0_10px_rgba(199,240,79,0.5)]">For Sellers</h2>
            <h3 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 relative z-10">
              <span className="block text-white drop-shadow-[0_0_25px_rgba(199,240,79,0.6)] [text-shadow:0_0_10px_rgba(255,255,255,0.8)]">Your DMs Are Not</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-shine bg-[length:200%_auto] drop-shadow-[0_0_35px_rgba(199,240,79,0.8)]">a Sales System.</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
              Stop managing conversations. Start closing deals.
            </p>
          </motion.div>
        </div>

        {/* Comparison Section - Redesigned */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-24 max-w-6xl mx-auto relative items-center z-10">
          
          {/* Energy Beam Connector (Desktop) - Updated to span full width and integrate */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[calc(100%+4rem)] h-[60px] items-center justify-center pointer-events-none">
             
             {/* Left Socket Interface (Red) - Positioned on the Left Card Edge */}
             <div className="absolute left-[calc(50%-theme(gap.16)/2-2rem)] md:left-[calc(50%-theme(gap.24)/2-2rem)] translate-x-1/2 h-16 w-8 bg-gradient-to-r from-red-950 to-red-900 border-l border-t border-b border-red-500/50 rounded-l-lg shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center z-30">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-10 bg-red-500/40 blur-[2px]" />
             </div>

             {/* The Glass Tube - Spanning the gap */}
             <div className="relative w-[calc(theme(gap.16)+1rem)] md:w-[calc(theme(gap.24)+1rem)] h-12 bg-black/40 border-t border-b border-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center z-20 shadow-inner">
                
                {/* Inner Glow/Reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none" />
                
                {/* Electric Arcs with Gradient */}
                <svg className="absolute inset-0 w-full h-full overflow-visible mix-blend-screen" viewBox="0 0 100 40" preserveAspectRatio="none">
                   <defs>
                      <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                         <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
                         <stop offset="50%" stopColor="#ffff00" /> {/* Yellow Transition */}
                         <stop offset="100%" stopColor="#C7F04F" /> {/* Green */}
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                         <feGaussianBlur stdDeviation="2" result="blur" />
                         <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                   </defs>
                   
                   {/* Main Bolt */}
                   <path d="M0,20 Q25,10 50,20 T100,20" fill="none" stroke="url(#beam-gradient)" strokeWidth="3" filter="url(#glow)">
                      <animate attributeName="d" 
                         values="M0,20 Q25,10 50,20 T100,20;
                                 M0,20 Q25,30 50,10 T100,20;
                                 M0,20 Q25,5 50,35 T100,20;
                                 M0,20 Q25,10 50,20 T100,20" 
                         dur="0.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="0.1s" repeatCount="indefinite" />
                   </path>

                   {/* Secondary Bolt (White core) */}
                   <path d="M0,20 Q25,30 50,20 T100,20" fill="none" stroke="#fff" strokeWidth="1" opacity="0.8">
                      <animate attributeName="d" 
                         values="M0,20 Q25,30 50,20 T100,20;
                                 M0,20 Q25,15 50,25 T100,20;
                                 M0,20 Q25,35 50,15 T100,20" 
                         dur="0.1s" repeatCount="indefinite" />
                   </path>
                </svg>

                {/* Connection Point Flares */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full blur-[10px] opacity-80 mix-blend-screen animate-pulse" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full blur-[10px] opacity-80 mix-blend-screen animate-pulse" />
             </div>

             {/* Right Socket Interface (Green) - Positioned on the Right Card Edge */}
             <div className="absolute right-[calc(50%-theme(gap.16)/2-2rem)] md:right-[calc(50%-theme(gap.24)/2-2rem)] -translate-x-1/2 h-16 w-8 bg-gradient-to-l from-green-950 to-green-900 border-r border-t border-b border-primary/30 rounded-r-lg shadow-[0_0_20px_rgba(199,240,79,0.2)] flex items-center justify-end z-30">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-10 bg-primary/40 blur-[2px]" />
             </div>
          </div>

          {/* The Pain (Reality) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative p-10 rounded-[2.5rem] bg-red-950/40 border border-red-900/60 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
          >
            {/* Shattered Glass Texture - Immersive Overlay */}
            <div className="absolute top-[-20%] right-[-20%] w-[120%] h-[120%] opacity-60 mix-blend-plus-lighter pointer-events-none z-0">
               <img src={shatteredGlass} alt="" className="w-full h-full object-contain rotate-12 scale-125" />
            </div>
            
            {/* Chromatic Aberration / Glitch Effect */}
            <div className="absolute inset-0 animate-glitch opacity-30 mix-blend-screen pointer-events-none bg-[url('/noise.png')] z-10" />
            <div className="absolute inset-0 border-2 border-red-500/20 rounded-[2.5rem] animate-pulse z-20" />

            <div className="relative z-30">
               <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6 text-yellow-400 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse">
                  <X className="w-6 h-6 drop-shadow-[0_0_8px_rgba(250,204,21,1)]" />
               </div>
               <h4 className="text-3xl font-bold text-yellow-300 mb-2 drop-shadow-[0_0_10px_rgba(253,224,71,0.6)]">The Old Way</h4>
               <p className="text-yellow-100/80 font-medium mb-8 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">Chaos & Manual Work</p>
               
               <ul className="space-y-6">
                 {[
                   "Closing one sale takes 15+ mins",
                   "Endless DM back & forth",
                   "Chasing payments manually",
                   "Ghosted by buyers constantly"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-yellow-300 transition-colors font-medium drop-shadow-[0_0_5px_rgba(253,224,71,0.5)]">
                     <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.5)] border border-red-500/30">
                       <X className="w-3 h-3 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,1)]" />
                     </div>
                     <span className="text-lg drop-shadow-sm">{item}</span>
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
            className="group relative p-10 rounded-[2.5rem] bg-black/80 border border-primary overflow-hidden shadow-[0_0_50px_-10px_rgba(199,240,79,0.3)] hover:shadow-[0_0_80px_-10px_rgba(199,240,79,0.5)] transition-all duration-500"
          >
            {/* Circuit Pattern */}
            <div className="absolute inset-0 opacity-40 pointer-events-none z-0">
               <img src={circuitPattern} alt="" className="w-full h-full object-cover mix-blend-color-dodge" />
            </div>

            {/* Digital Comet Streak Animation */}
            {/* Arcing path from right to left */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
              <path 
                id="comet-path"
                d="M 600,100 Q 300,50 50,150" 
                fill="none" 
                stroke="transparent"
              />
              <circle r="4" fill="#fff" className="blur-[1px]">
                <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
                   <mpath href="#comet-path" />
                </animateMotion>
              </circle>
              {/* Comet Head */}
               <circle r="3" fill="#C7F04F" className="shadow-[0_0_20px_#C7F04F]">
                <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
                   <mpath href="#comet-path" />
                </animateMotion>
              </circle>
              {/* Comet Trail */}
              <path d="M 600,100 Q 300,50 50,150" stroke="url(#gradient)" strokeWidth="2" fill="none" className="opacity-60">
                 <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="transparent" />
                       <stop offset="50%" stopColor="#C7F04F" />
                       <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                 </defs>
              </path>
            </svg>

            <div className="relative z-20">
               <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-black border border-primary shadow-[0_0_25px_rgba(199,240,79,0.6)]">
                  <Check className="w-6 h-6 font-bold text-primary drop-shadow-[0_0_5px_rgba(199,240,79,1)]" />
               </div>
               <h4 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(199,240,79,0.8)]">The Zatch Way</h4>
               <p className="text-primary font-medium mb-8 drop-shadow-[0_0_10px_rgba(199,240,79,0.8)]">Automated & Instant</p>
               
               <ul className="space-y-6">
                 {[
                   "One live stream = Hundreds of potential sales",
                   "Negotiate instantly with auto-counter offers",
                   "Payments collected inside the app",
                   "Zero manual tracking needed"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-white group-hover:translate-x-2 transition-transform duration-300">
                     <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(199,240,79,0.8)] border border-primary/50">
                       <Check className="w-3 h-3 text-primary font-bold drop-shadow-[0_0_5px_rgba(199,240,79,1)]" />
                     </div>
                     <span className="text-lg font-medium drop-shadow-md text-white shadow-black drop-shadow-sm">{item}</span>
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
