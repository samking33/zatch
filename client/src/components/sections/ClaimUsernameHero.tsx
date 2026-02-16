import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ClaimUsernameHero() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (username.length > 2) {
      const timer = setTimeout(() => {
        setStatus("checking");
        setTimeout(() => {
          setStatus(Math.random() > 0.2 ? "available" : "taken");
        }, 800);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setStatus("idle");
    }
  }, [username]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
      {/* Chaos Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-2000"></div>
      </div>

      <div className="container relative z-10 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <div className="inline-block border border-primary/30 bg-primary/5 backdrop-blur-md px-4 py-1.5 rounded-none transform -rotate-2 mb-8">
             <span className="font-mono text-primary text-sm tracking-widest uppercase font-bold">⚠️ Limited Early Access</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-bold font-display tracking-tighter leading-[0.85] mb-6 text-white mix-blend-difference">
            DONT BE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic">JUST A USER.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto mb-12 font-light">
            The next generation of commerce is identity-first. <br/>
            <span className="text-white font-medium">Secure your OG handle before the masses arrive.</span>
          </p>
        </motion.div>

        {/* The Hook: Username Claim */}
        <div className="max-w-md mx-auto relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-primary via-white to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
           
           <div className="relative bg-black border border-white/10 p-2 rounded-lg flex flex-col gap-2">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2"
                  >
                     <div className="flex-1 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-lg">@</span>
                        <Input 
                           value={username}
                           onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                           placeholder="your_handle" 
                           className="pl-10 h-16 bg-transparent border-none text-2xl font-bold text-white placeholder:text-white/20 focus-visible:ring-0 font-mono"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                           {status === "checking" && <Loader2 className="animate-spin text-muted-foreground" />}
                           {status === "available" && <div className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Available</div>}
                           {status === "taken" && <div className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Taken</div>}
                        </div>
                     </div>
                     <Button 
                        disabled={status !== "available"}
                        onClick={() => setStep(2)}
                        className="h-16 px-8 bg-white text-black hover:bg-primary font-bold text-lg rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        CLAIM
                     </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2"
                  >
                     <Input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email to lock it" 
                        type="email"
                        className="h-16 bg-transparent border-none text-xl font-medium text-white placeholder:text-white/20 focus-visible:ring-0 px-6"
                     />
                     <Button 
                        className="h-16 px-8 bg-primary text-black hover:bg-white font-bold text-lg rounded transition-all flex items-center gap-2"
                     >
                        LOCK IT <Check className="w-5 h-5" />
                     </Button>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
           
           {/* Social Proof / Urgency Ticker */}
           <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span>142 people are checking usernames right now</span>
           </div>
        </div>

        {/* Floating "Raw" Elements */}
        <motion.div 
           animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-20 right-[10%] hidden lg:block"
        >
           <div className="bg-black/80 backdrop-blur border border-white/20 p-4 rounded max-w-[200px] text-left transform rotate-6">
              <p className="text-xs text-white/50 mb-1 font-mono">LIVE FEED</p>
              <p className="text-sm text-primary font-bold">@sara_x just claimed her spot!</p>
           </div>
        </motion.div>
        
        <motion.div 
           animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute bottom-40 left-[10%] hidden lg:block"
        >
           <div className="bg-black/80 backdrop-blur border border-white/20 p-4 rounded max-w-[200px] text-left transform -rotate-3">
              <div className="flex items-center gap-2 mb-2">
                 <AlertCircle className="w-4 h-4 text-red-500" />
                 <p className="text-xs text-white/50 font-mono">SYSTEM ALERT</p>
              </div>
              <p className="text-sm text-white font-bold">Beta access closing in 4h 23m</p>
           </div>
        </motion.div>

      </div>
      
      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover mix-blend-overlay"></div>
    </section>
  );
}
