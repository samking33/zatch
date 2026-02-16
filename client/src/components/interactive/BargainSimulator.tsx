import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Check, X } from "lucide-react";

export function BargainSimulator() {
  const [offer, setOffer] = useState(1200);
  const [status, setStatus] = useState<"idle" | "thinking" | "accepted" | "rejected">("idle");
  
  const originalPrice = 1500;
  const minPrice = 1000;
  const maxPrice = 1500;

  const handleOffer = (val: number[]) => {
    setOffer(val[0]);
    setStatus("idle");
  };

  const submitOffer = () => {
    setStatus("thinking");
    setTimeout(() => {
      if (offer >= 1300) {
        setStatus("accepted");
      } else {
        setStatus("rejected");
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-primary/30 transition-all">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Original Price</p>
          <p className="text-2xl font-bold text-white line-through decoration-red-500/50">₹{originalPrice}</p>
        </div>
        <div className="text-right">
           <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Your Offer</p>
           <p className="text-4xl font-bold text-white tabular-nums">₹{offer}</p>
        </div>
      </div>

      <div className="mb-8 relative">
        <Slider 
           defaultValue={[1200]} 
           max={maxPrice} 
           min={minPrice} 
           step={10} 
           onValueChange={handleOffer}
           className="py-4 cursor-grab active:cursor-grabbing"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
           <span>₹{minPrice}</span>
           <span>₹{maxPrice}</span>
        </div>
      </div>

      <button 
        onClick={submitOffer}
        disabled={status === "thinking" || status === "accepted"}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all relative overflow-hidden ${
           status === "accepted" ? "bg-green-500 text-black" :
           status === "rejected" ? "bg-red-500 text-white" :
           "bg-white text-black hover:bg-primary"
        }`}
      >
         <span className="relative z-10 flex items-center justify-center gap-2">
            {status === "idle" && "Send Offer"}
            {status === "thinking" && "Negotiating..."}
            {status === "accepted" && <><Check className="w-5 h-5" /> Deal Locked!</>}
            {status === "rejected" && <><X className="w-5 h-5" /> Too Low!</>}
         </span>
      </button>

      {/* Confetti / Effect Overlay */}
      {status === "accepted" && (
         <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-green-500/20 backdrop-blur-[2px] flex items-center justify-center pointer-events-none"
         >
            <div className="text-6xl">🎉</div>
         </motion.div>
      )}
    </div>
  );
}
