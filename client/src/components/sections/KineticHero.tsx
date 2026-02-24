import { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface StreamData {
  seller: string;
  initials: string;
  product: string;
  price: string;
  viewers: number;
  bgColor: string;
  accentColor: string;
  category: string;
  emoji: string;
}

const STREAM_DATA: StreamData[] = [
  { seller: "Priya's Closet", initials: "PC", product: "Silk Banarasi Saree", price: "₹2,400", viewers: 342, bgColor: "#8b1a4a", accentColor: "#ff6b9d", category: "Fashion", emoji: "👗" },
  { seller: "TechBro Store", initials: "TB", product: "Wireless Earbuds Pro", price: "₹1,299", viewers: 891, bgColor: "#1a3a6b", accentColor: "#4d9fff", category: "Tech", emoji: "🎧" },
  { seller: "Sneaker Nation", initials: "SN", product: "Air Jordan Retro 4", price: "₹8,999", viewers: 1247, bgColor: "#2d1a4a", accentColor: "#a855f7", category: "Sneakers", emoji: "👟" },
  { seller: "Glow Studio", initials: "GS", product: "Korean Skincare Set", price: "₹899", viewers: 567, bgColor: "#4a1a3a", accentColor: "#f472b6", category: "Beauty", emoji: "✨" },
  { seller: "Riya Boutique", initials: "RB", product: "Anarkali Suit Set", price: "₹1,850", viewers: 234, bgColor: "#6b1a2d", accentColor: "#fb7185", category: "Fashion", emoji: "👘" },
  { seller: "Gadget Hub", initials: "GH", product: "Smart Watch Ultra", price: "₹3,499", viewers: 723, bgColor: "#0d3b4a", accentColor: "#22d3ee", category: "Tech", emoji: "⌚" },
  { seller: "Sole Street", initials: "SS", product: "Nike Dunk Low Panda", price: "₹6,499", viewers: 956, bgColor: "#1a2d4a", accentColor: "#818cf8", category: "Sneakers", emoji: "🏀" },
  { seller: "Herbal Essence", initials: "HE", product: "Natural Face Serum", price: "₹450", viewers: 189, bgColor: "#1a4a2d", accentColor: "#34d399", category: "Beauty", emoji: "🌿" },
  { seller: "Meera Designs", initials: "MD", product: "Chikankari Kurta", price: "₹1,200", viewers: 412, bgColor: "#4a3a1a", accentColor: "#fbbf24", category: "Fashion", emoji: "🧵" },
  { seller: "Pixel Perfect", initials: "PP", product: "Bluetooth Speaker", price: "₹799", viewers: 345, bgColor: "#1a2a4a", accentColor: "#60a5fa", category: "Tech", emoji: "🔊" },
  { seller: "Kick Vault", initials: "KV", product: "Adidas Yeezy 350", price: "₹12,999", viewers: 2103, bgColor: "#3d2a1a", accentColor: "#fb923c", category: "Sneakers", emoji: "🔥" },
  { seller: "Luxe Lashes", initials: "LL", product: "Mink Lash Bundle", price: "₹599", viewers: 278, bgColor: "#4a1a4a", accentColor: "#e879f9", category: "Beauty", emoji: "💄" },
  { seller: "Silk Route", initials: "SR", product: "Pashmina Shawl", price: "₹3,200", viewers: 156, bgColor: "#2d1a3d", accentColor: "#c084fc", category: "Fashion", emoji: "🧣" },
  { seller: "Phone Zone", initials: "PZ", product: "iPhone 15 Case", price: "₹349", viewers: 445, bgColor: "#1a3d2d", accentColor: "#4ade80", category: "Tech", emoji: "📱" },
  { seller: "Street Kicks", initials: "SK", product: "New Balance 550", price: "₹5,999", viewers: 678, bgColor: "#3d1a2d", accentColor: "#f43f5e", category: "Sneakers", emoji: "💫" },
  { seller: "Aura Beauty", initials: "AB", product: "Vitamin C Cream", price: "₹350", viewers: 321, bgColor: "#1a4a4a", accentColor: "#2dd4bf", category: "Beauty", emoji: "🫧" },
  { seller: "Desi Drapes", initials: "DD", product: "Cotton Saree Set", price: "₹950", viewers: 198, bgColor: "#5a1a1a", accentColor: "#f87171", category: "Fashion", emoji: "🪷" },
  { seller: "Electro Mart", initials: "EM", product: "Gaming Mouse RGB", price: "₹1,599", viewers: 534, bgColor: "#0d2d4a", accentColor: "#38bdf8", category: "Tech", emoji: "🖱️" },
  { seller: "Hype Feet", initials: "HF", product: "Travis Scott AJ1", price: "₹15,499", viewers: 3201, bgColor: "#2d2d1a", accentColor: "#a3e635", category: "Sneakers", emoji: "⭐" },
  { seller: "Rose Petal", initials: "RP", product: "Perfume Gift Set", price: "₹1,100", viewers: 267, bgColor: "#4a2d1a", accentColor: "#f59e0b", category: "Beauty", emoji: "🌹" },
  { seller: "Weave Wonder", initials: "WW", product: "Handloom Dupatta", price: "₹680", viewers: 143, bgColor: "#1a4a1a", accentColor: "#22c55e", category: "Fashion", emoji: "🎨" },
  { seller: "Charge Up", initials: "CU", product: "65W Fast Charger", price: "₹499", viewers: 412, bgColor: "#1a1a4a", accentColor: "#6366f1", category: "Tech", emoji: "⚡" },
  { seller: "Sole Society", initials: "SO", product: "Puma RS-X Bold", price: "₹4,299", viewers: 389, bgColor: "#4a1a1a", accentColor: "#ef4444", category: "Sneakers", emoji: "🏃" },
  { seller: "Skin First", initials: "SF", product: "Sunscreen SPF 50+", price: "₹275", viewers: 567, bgColor: "#2d4a1a", accentColor: "#84cc16", category: "Beauty", emoji: "☀️" },
];

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createStreamCanvas(data: StreamData): string {
  const c = document.createElement("canvas");
  c.width = 270;
  c.height = 480;
  const ctx = c.getContext("2d")!;

  const bgGrad = ctx.createLinearGradient(0, 0, 0, 480);
  bgGrad.addColorStop(0, data.bgColor);
  bgGrad.addColorStop(0.5, shiftColor(data.bgColor, -20));
  bgGrad.addColorStop(1, "#000000");
  ctx.fillStyle = bgGrad;
  roundRect(ctx, 0, 0, 270, 480, 12);
  ctx.fill();

  ctx.fillStyle = data.accentColor + "08";
  ctx.beginPath();
  ctx.arc(135, 200, 120, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = data.accentColor + "12";
  ctx.beginPath();
  ctx.arc(135, 200, 80, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "80px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = data.accentColor + "30";
  ctx.fillText(data.emoji, 135, 190);

  ctx.fillStyle = "#ff000000";
  roundRect(ctx, 10, 10, 60, 22, 11);
  ctx.fillStyle = "#ff0000";
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 10px 'Space Grotesk', Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("● LIVE", 40, 21);

  ctx.fillStyle = "#00000060";
  roundRect(ctx, 200, 10, 60, 22, 11);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 9px 'Space Grotesk', Inter, system-ui, sans-serif";
  ctx.fillText(formatViewers(data.viewers), 230, 21);

  ctx.fillStyle = "#00000060";
  roundRect(ctx, 10, 40, 130, 28, 14);
  ctx.fill();

  ctx.fillStyle = data.accentColor;
  ctx.beginPath();
  ctx.arc(24, 54, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 7px 'Space Grotesk', Inter, system-ui, sans-serif";
  ctx.fillText(data.initials, 24, 55);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 10px 'Space Grotesk', Inter, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(data.seller, 38, 54);

  const bottomGrad = ctx.createLinearGradient(0, 360, 0, 480);
  bottomGrad.addColorStop(0, "transparent");
  bottomGrad.addColorStop(0.3, "#00000080");
  bottomGrad.addColorStop(1, "#000000cc");
  ctx.fillStyle = bottomGrad;
  ctx.fillRect(0, 360, 270, 120);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px 'Space Grotesk', Inter, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(data.product, 14, 420);

  ctx.fillStyle = "#cafe38";
  ctx.font = "bold 16px 'Space Grotesk', Inter, system-ui, sans-serif";
  ctx.fillText(data.price, 14, 445);

  ctx.fillStyle = "#ffffff50";
  ctx.font = "10px 'Space Grotesk', Inter, system-ui, sans-serif";
  ctx.fillText(data.category, 14, 465);

  ctx.fillStyle = "#cafe38";
  roundRect(ctx, 170, 425, 86, 30, 15);
  ctx.fill();
  ctx.fillStyle = "#000000";
  ctx.font = "bold 11px 'Space Grotesk', Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Bargain", 213, 444);

  return c.toDataURL();
}

function shiftColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function formatViewers(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

export function KineticHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

  const [streamImages, setStreamImages] = useState<string[]>([]);

  useEffect(() => {
    const images = STREAM_DATA.map((data) => createStreamCanvas(data));
    setStreamImages(images);
  }, []);

  const gridItems = useMemo(() => {
    if (streamImages.length === 0) return [];
    return Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      image: streamImages[i % streamImages.length],
      randomX: (Math.random() - 0.5) * 200,
      randomY: -100 - Math.random() * 300,
      randomRotate: (Math.random() - 0.5) * 30,
      scale: 0.8 + Math.random() * 0.4,
    }));
  }, [streamImages]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="h-[130vh] relative bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">

        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 p-1">
          {gridItems.map((item) => (
            <GridItem
              key={item.id}
              item={item}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
           style={{
              opacity: useTransform(smoothProgress, [0, 0.3], [1, 0]),
              scale: useTransform(smoothProgress, [0, 0.3], [1, 1.2]),
              filter: useTransform(smoothProgress, [0, 0.15], ["brightness(1) contrast(1)", "brightness(1.5) contrast(1.2)"]),
           }}
           className="absolute z-20 pointer-events-none text-center mix-blend-difference"
        >
           <h1 className="text-[12vw] font-bold font-display leading-[0.8] tracking-tighter text-white" data-testid="text-hero-heading">
              CATCH IT<br/>
              MATCH IT<br/>
              <span className="relative inline-block text-primary italic pr-4">
                <span className="relative z-10">ZATCH</span>
                <span className="absolute top-1/2 -left-20 w-full h-[2px] bg-primary/50 -translate-y-1/2 blur-[1px]" />
                <span className="absolute top-[30%] -left-32 w-3/4 h-[1px] bg-primary/30 blur-[0.5px]" />
                <span className="absolute top-[70%] -left-24 w-4/5 h-[1.5px] bg-primary/40 blur-[0.5px]" />
                <span className="absolute inset-0 translate-x-1 translate-y-0 opacity-50 mix-blend-screen blur-[1px] skew-x-12 scale-x-110 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10"></span>
              </span> IT
           </h1>
        </motion.div>

        <motion.div
           style={{ opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]) }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm uppercase tracking-widest animate-pulse pointer-events-none z-30"
           data-testid="text-scroll-cta"
        >
           Scroll to Explore
        </motion.div>

      </div>
    </section>
  );
}

function GridItem({ item, scrollYProgress }: any) {
  const y = useTransform(scrollYProgress, [0, 1], [0, item.randomY + "%"]);
  const x = useTransform(scrollYProgress, [0, 1], [0, item.randomX + "%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, item.randomRotate]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.div
      style={{ y, x, rotate, scale, opacity }}
      className="relative w-full h-full overflow-hidden grayscale brightness-[0.25] opacity-40 hover:grayscale-0 hover:brightness-100 hover:opacity-90 hover:z-10 hover:scale-125 hover:rounded-lg hover:shadow-xl hover:ring-2 hover:ring-primary transition-all duration-300"
    >
       <img
         src={item.image}
         alt="Stream"
         className="w-full h-full object-cover aspect-[9/16]"
         loading="lazy"
       />
    </motion.div>
  )
}
