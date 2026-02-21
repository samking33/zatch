import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Video, ShoppingBag, MessageSquareText, ArrowRight, Sparkles } from "lucide-react";
import { BargainSimulator } from "@/components/interactive/BargainSimulator";

const cards = [
  {
    title: "Live Shopping",
    subtitle: "Watch. Ask. Decide.",
    description: "No guessing from images. No waiting for replies. See products demonstrated in real-time and interact instantly.",
    color: "#EF4444",
    bg: "bg-red-500",
    icon: Video,
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=2069&auto=format&fit=crop",
    type: "video"
  },
  {
    title: "Buy Bits",
    subtitle: "Short Video Shopping",
    description: "Products become content. Fast, engaging reels designed to convert. Buy without leaving the video.",
    color: "#3B82F6",
    bg: "bg-blue-500",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
    type: "bits"
  },
  {
    title: "Zatching",
    subtitle: "Strategic Bargaining",
    description: "Your Price. Your Deal. Send a quote. Receive approval or counter. Close the deal instantly.",
    color: "#cafe38",
    bg: "bg-primary",
    icon: MessageSquareText,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop",
    type: "bargain"
  }
];

export function ThreeWays() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="features" className="bg-black relative pt-20 pb-32">
       {/* Ambient Light */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-primary/10 blur-[150px] pointer-events-none" />

       <div className="container mx-auto px-6 mb-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
               <Sparkles className="w-3 h-3 text-primary" />
               <span className="text-xs font-medium text-primary tracking-wide uppercase">Core Experience</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tighter mb-6">
              Three Ways to Shop.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">One Powerful Platform.</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Zatch is not just another marketplace. It is a live-powered, video-driven, negotiation-enabled commerce experience.
            </p>
          </motion.div>
       </div>

       <div className="container mx-auto px-6 max-w-6xl relative perspective-1000">
          {cards.map((card, index) => (
             <Card key={index} card={card} index={index} range={[index * 0.25, 1]} targetScale={1 - ((cards.length - index) * 0.05)} progress={scrollYProgress} />
          ))}
       </div>
    </section>
  );
}

function Card({ card, index, range, targetScale, progress }: any) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ 
           scale, 
           top: `calc(-5vh + ${index * 25}px)`,
        }}
        className="relative flex flex-col md:flex-row h-[600px] w-full rounded-[3rem] border border-white/10 bg-[#0A0A0A] overflow-hidden origin-top shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group hover:shadow-[0_50px_120px_-20px_rgba(0,0,0,0.6)] hover:border-white/15 transition-shadow transition-border duration-500 will-change-transform"
      >
        <div className="flex-1 p-12 flex flex-col justify-between z-10 relative">
           <div>
              <div className={`w-14 h-14 rounded-2xl ${card.bg}/10 flex items-center justify-center mb-8 border ${card.bg}/20`}>
                 <card.icon className="w-7 h-7" style={{ color: card.color }} />
              </div>
              <h3 className="text-4xl font-bold font-display mb-2 text-white">{card.title}</h3>
              <p className="text-xl text-white/60 mb-8 font-medium">{card.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
                 {card.description}
              </p>
           </div>
           
           <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors" style={{ color: card.color }}>
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
           </div>
        </div>

        <div className="flex-1 relative overflow-hidden bg-black/50">
           {card.type === 'bargain' ? (
              <div className="absolute inset-0 flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-black to-black">
                 <BargainSimulator />
              </div>
           ) : (
              <>
                 <img 
                    src={card.image} 
                    alt={card.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />
                 
                 <div className="absolute inset-0 p-8 flex items-end justify-end">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                       <div className={`w-3 h-3 rounded-full ${card.bg} animate-pulse`} />
                       <span className="text-white font-mono text-xs">LIVE PREVIEW</span>
                    </div>
                 </div>
              </>
           )}
        </div>
      </motion.div>
    </div>
  )
}

