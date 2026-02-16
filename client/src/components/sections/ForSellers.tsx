import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, DollarSign, MessageCircle, X, Check, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function ForSellers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sellers" ref={ref} className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

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
              <span className="text-stroke-primary text-transparent">a Sales System.</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop managing conversations. Start closing deals.
            </p>
          </motion.div>
        </div>

        {/* Comparison Section - Redesigned */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
          {/* The Pain (Reality) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative p-10 rounded-[2.5rem] bg-red-950/10 border border-red-900/20 overflow-hidden hover:bg-red-950/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 text-red-500 border border-red-500/20">
                  <X className="w-6 h-6" />
               </div>
               <h4 className="text-3xl font-bold text-white mb-2">The Old Way</h4>
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
            className="group relative p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 overflow-hidden hover:bg-primary/10 transition-all duration-500 shadow-[0_0_50px_-12px_rgba(199,240,79,0.1)] hover:shadow-[0_0_80px_-20px_rgba(199,240,79,0.3)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-6 text-black border border-primary shadow-lg shadow-primary/20">
                  <Check className="w-6 h-6 font-bold" />
               </div>
               <h4 className="text-3xl font-bold text-white mb-2">The Zatch Way</h4>
               <p className="text-primary font-medium mb-8">Automated & Instant</p>
               
               <ul className="space-y-6">
                 {[
                   "One live stream = Hundreds of potential sales",
                   "Negotiate instantly with auto-counter offers",
                   "Payments collected inside the app",
                   "Zero manual tracking needed"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-white group-hover:translate-x-2 transition-transform duration-300">
                     <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(199,240,79,0.5)]">
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
