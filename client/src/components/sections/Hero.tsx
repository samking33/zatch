import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.png"; 
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0] as any, // Cast to any to bypass strict type checking for bezier curve array
      },
    }),
  };

  return (
    <section ref={targetRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/90 z-10" />
        <motion.div style={{ opacity, scale }} className="absolute inset-0">
           <img 
            src={heroBg} 
            alt="Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10 pointer-events-none" />
        
        {/* Floating Particles/Glows */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-10"
        />
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-10"
        />
      </div>

      <div className="container relative z-30 px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            style={{ y }}
            className="text-center lg:text-left relative"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl group cursor-default hover:bg-white/10 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-primary tracking-widest uppercase">India's First Live Bargain Marketplace</span>
            </motion.div>
            
            {/* Headline */}
            <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tight leading-[0.9] mb-8">
              <motion.span custom={1} variants={textVariants} initial="hidden" animate="visible" className="block text-white">Watch it <span className="text-stroke-primary text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">live.</span></motion.span>
              <motion.span custom={2} variants={textVariants} initial="hidden" animate="visible" className="block text-white/30 italic font-serif">Shop videos.</motion.span>
              <motion.span custom={3} variants={textVariants} initial="hidden" animate="visible" className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#C7F04F] to-emerald-400">Zatch your price.</motion.span>
            </h1>
            
            <motion.p 
              custom={4} 
              variants={textVariants} 
              initial="hidden" 
              animate="visible"
              className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Zatch blends live shopping, video discovery, and strategic bargaining, built for the way India actually shops.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              custom={5} 
              variants={textVariants} 
              initial="hidden" 
              animate="visible"
              className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-green-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <Button size="lg" className="relative bg-primary text-black hover:bg-primary/90 font-bold px-8 h-16 rounded-full text-lg w-full sm:w-auto shadow-2xl transition-all hover:scale-105 active:scale-95">
                  Download App <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 px-6 text-sm text-muted-foreground group cursor-pointer">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <Play className="w-4 h-4 ml-1 fill-current" />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wider mb-0.5">Watch</p>
                  <p className="text-white font-bold group-hover:text-primary transition-colors">How it works</p>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              custom={6}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mt-16 flex flex-wrap justify-center lg:justify-start gap-8 text-sm font-medium text-white/40"
            >
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <ShieldCheck className="w-5 h-5 text-primary" /> 
                <span>No Ads</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <ShieldCheck className="w-5 h-5 text-primary" /> 
                <span>No Algorithms</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <ShieldCheck className="w-5 h-5 text-primary" /> 
                <span>Real Deals</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Phone Mockup Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 30, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative hidden lg:block perspective-1000"
          >
             {/* Floating Elements behind */}
             <motion.div 
               animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl backdrop-blur-md border border-white/10 z-0"
             />
             <motion.div 
               animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 -left-20 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full backdrop-blur-md border border-white/10 z-0"
             />

             {/* Main Phone Container */}
             <motion.div 
                whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative z-10 w-[380px] mx-auto h-[760px] rounded-[3.5rem] border-[12px] border-zinc-900 bg-black shadow-2xl overflow-hidden ring-1 ring-white/20"
             >
                {/* Screen Content */}
                <div className="absolute inset-0 bg-zinc-900">
                  {/* Live Stream Simulation */}
                  <div className="relative h-full w-full">
                     {/* Video Background Placeholder */}
                     <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-black">
                        <div className="w-full h-full opacity-60 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
                     
                     {/* UI Overlay */}
                     <div className="absolute top-14 left-6 right-6 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full border-2 border-primary p-0.5">
                              <div className="w-full h-full rounded-full bg-zinc-700 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop')] bg-cover" />
                           </div>
                           <div>
                              <p className="text-white font-bold text-sm">SneakerHead_Ind</p>
                              <div className="flex items-center gap-1">
                                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                 <span className="text-white/80 text-xs">Live</span>
                              </div>
                           </div>
                        </div>
                        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                           <span className="text-white text-xs font-bold">👀 1.2k</span>
                        </div>
                     </div>

                     {/* Comments Stream */}
                     <div className="absolute bottom-32 left-6 right-6 space-y-3">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                          className="flex items-center gap-2"
                        >
                           <div className="w-6 h-6 rounded-full bg-blue-500" />
                           <p className="text-white/90 text-sm"><span className="font-bold text-white">Rahul:</span> Show the side view?</p>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5 }}
                          className="flex items-center gap-2"
                        >
                           <div className="w-6 h-6 rounded-full bg-pink-500" />
                           <p className="text-white/90 text-sm"><span className="font-bold text-white">Priya:</span> Price is 🔥</p>
                        </motion.div>
                     </div>

                     {/* Action Area */}
                     <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex items-center justify-between gap-4">
                           <div>
                              <p className="text-white/50 text-xs uppercase font-bold">Current Ask</p>
                              <p className="text-primary text-xl font-bold">₹2,499</p>
                           </div>
                           <Button className="flex-1 bg-primary text-black font-bold h-12 rounded-xl hover:scale-105 transition-transform">
                              ZATCH DEAL
                           </Button>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20" />
             </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
