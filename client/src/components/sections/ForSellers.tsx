import { ArrowRight, Zap, TrendingUp, DollarSign, MessageCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ForSellers() {
  return (
    <section id="sellers" className="py-32 bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">For Sellers</h2>
          <h3 className="text-5xl md:text-6xl font-bold font-display tracking-tight mb-6">Your DMs Are Not a Sales System.</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop managing conversations. Start closing deals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="p-10 rounded-3xl bg-red-500/5 border border-red-500/10">
            <h4 className="text-2xl font-bold text-white mb-6">The Reality</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">❌ On social media, closing one sale takes 15 mins.</li>
              <li className="flex items-center gap-3">❌ Reply. Explain. Negotiate. Chase payment.</li>
              <li className="flex items-center gap-3">❌ Half the time, the buyer disappears.</li>
            </ul>
          </div>

          <div className="p-10 rounded-3xl bg-primary/5 border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
            <h4 className="text-2xl font-bold text-white mb-6">The Upgrade</h4>
            <ul className="space-y-4 text-white">
              <li className="flex items-center gap-3"><span className="text-primary">✔</span> Go live once. Sell to many.</li>
              <li className="flex items-center gap-3"><span className="text-primary">✔</span> Negotiate instantly via Zatch.</li>
              <li className="flex items-center gap-3"><span className="text-primary">✔</span> Get paid inside the app.</li>
            </ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Video, title: "Content to Revenue", desc: "Every live. Every reel. Monetized." },
            { icon: MessageCircle, title: "Built-In Negotiation", desc: "No more DM juggling." },
            { icon: Zap, title: "Instant Payments", desc: "UPI and token flow handled." },
            { icon: DollarSign, title: "Low Commission", desc: "You keep more of what you earn." },
          ].map((item, i) => {
            const Icon = item.icon; 
            return (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold px-8 h-12 rounded-full">
            Start Selling Today <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
