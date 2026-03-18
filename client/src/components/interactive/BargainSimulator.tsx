import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Check, X } from "lucide-react";

export function BargainSimulator() {
  const [offer, setOffer] = useState(1200);
  const [status, setStatus] = useState<"idle" | "thinking" | "accepted" | "rejected">("idle");
  const timeoutsRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const offerRef = useRef(1200);

  const originalPrice = 1500;
  const minPrice = 1000;
  const maxPrice = 1500;
  const lowOffer = 1080;
  const highOffer = 1360;

  const handleOffer = (val: number[]) => {
    setOffer(val[0]);
    offerRef.current = val[0];
    setStatus("idle");
  };

  const clearQueuedSteps = () => {
    for (const timeoutId of timeoutsRef.current) {
      window.clearTimeout(timeoutId);
    }
    timeoutsRef.current = [];
  };

  const stopOfferAnimation = () => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const queueStep = (callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
  };

  const animateOfferTo = (targetOffer: number, duration: number) => {
    stopOfferAnimation();

    const startOffer = offerRef.current;
    const delta = targetOffer - startOffer;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextOffer =
        Math.round((startOffer + delta * easedProgress) / 10) * 10;

      offerRef.current = nextOffer;
      setOffer(nextOffer);

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(tick);
        return;
      }

      offerRef.current = targetOffer;
      setOffer(targetOffer);
      animationFrameRef.current = null;
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);
  };

  const submitOffer = (nextOffer: number) => {
    setStatus("thinking");
    queueStep(() => {
      if (nextOffer >= 1300) {
        setStatus("accepted");
      } else {
        setStatus("rejected");
      }
    }, 1200);
  };

  useEffect(() => {
    const runDemo = () => {
      stopOfferAnimation();
      clearQueuedSteps();
      setStatus("idle");
      setOffer(1200);
      offerRef.current = 1200;

      queueStep(() => {
        animateOfferTo(lowOffer, 1200);
      }, 700);

      queueStep(() => {
        submitOffer(lowOffer);
      }, 1500);

      queueStep(() => {
        setStatus("idle");
        animateOfferTo(highOffer, 1400);
      }, 3400);

      queueStep(() => {
        submitOffer(highOffer);
      }, 4300);

      queueStep(() => {
        runDemo();
      }, 6800);
    };

    runDemo();

    return () => {
      stopOfferAnimation();
      clearQueuedSteps();
    };
  }, []);

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
           value={[offer]}
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
        onClick={() => submitOffer(offer)}
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
