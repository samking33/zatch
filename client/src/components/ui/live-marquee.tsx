import Marquee from "@/components/ui/marquee";

export function LiveMarquee() {
  return (
    <div className="bg-primary text-black py-3 overflow-hidden border-y border-black font-bold tracking-widest uppercase text-sm z-20 relative">
      <Marquee pauseOnHover className="[--duration:20s]">
        <span className="mx-4">• LIVE SHOPPING REINVENTED</span>
        <span className="mx-4">• ZATCH YOUR PRICE</span>
        <span className="mx-4">• NO ADS</span>
        <span className="mx-4">• REAL SELLERS</span>
        <span className="mx-4">• INSTANT NEGOTIATION</span>
        <span className="mx-4">• INDIA'S FIRST LIVE BARGAIN MARKETPLACE</span>
      </Marquee>
    </div>
  );
}
