import { motion } from "framer-motion";
import { ArrowRight, Play, ShoppingBag, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.png"; // We will generate this
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10" />
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-20" />
      </div>

      <div className="container relative z-30 px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">India's First Live Bargain Marketplace</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6">
              Watch it live. <br />
              <span className="text-white/40">Shop videos.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Zatch your price.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Zatch blends live shopping, video discovery, and strategic bargaining, built for the way India actually shops.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold px-8 h-14 rounded-full text-lg w-full sm:w-auto shadow-[0_0_20px_rgba(199,240,79,0.3)] hover:shadow-[0_0_40px_rgba(199,240,79,0.4)] transition-all">
                Download App <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-4 px-6 text-sm text-muted-foreground">
                <div className="w-24 h-24 bg-white p-2 rounded-lg">
                  {/* Placeholder for QR Code */}
                  <div className="w-full h-full border-2 border-dashed border-black/20 flex items-center justify-center text-xs text-center text-black font-mono">
                    QR CODE
                  </div>
                </div>
                <div className="text-left hidden sm:block">
                  <p>Scan to</p>
                  <p className="text-white font-bold">Download</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-medium text-white/40">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> No Ads</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> No Algorithms</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Real Deals</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
             {/* Abstract Mobile UI representation */}
             <div className="relative w-[350px] mx-auto h-[700px] rounded-[3rem] border-8 border-white/5 bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden ring-1 ring-white/10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/20" />
                
                {/* Simulated App Interface */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
                  <div className="flex gap-1">
                    <div className="w-8 h-1 bg-white/20 rounded-full" />
                    <div className="w-8 h-1 bg-white/20 rounded-full" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md" />
                </div>

                {/* Content Elements */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-24">
                  <div className="flex items-end gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black" />
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-white/20 rounded mb-2" />
                      <div className="h-3 w-48 bg-white/10 rounded" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex justify-between items-center">
                        <span className="text-sm text-white/60">Current Bid</span>
                        <span className="text-xl font-bold text-primary">₹1,250</span>
                     </div>
                     <Button className="w-full bg-primary text-black font-bold h-12 rounded-xl">
                        Zatch Deal
                     </Button>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-1/3 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg animate-bounce duration-1000">
                   <span className="text-2xl">🔥</span>
                </div>
                <div className="absolute top-1/4 left-4 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg" style={{ animationDuration: '3s' }}>
                   <span className="text-2xl">💬</span>
                </div>

             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
