import { Shield, UserCheck, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrustProps {
  onStartSelling?: () => void;
}

export function Trust({ onStartSelling }: TrustProps) {
  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold font-display tracking-tight mb-4">Built on Trust.</h2>
          <p className="text-xl text-muted-foreground">Commerce Should Feel Safe.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Lock, title: "Secure Payments", desc: "UPI powered. Token protected. Every transaction verified." },
            { icon: UserCheck, title: "Verified Sellers", desc: "Real people. Real businesses. Transparent profiles." },
            { icon: Shield, title: "Controlled Negotiation", desc: "Structured quote system. No spam. No chaos." },
            { icon: FileText, title: "Order Transparency", desc: "Live tracking. Clear timelines. Dispute support." },
          ].map((item, i) => (
            <div key={i} className="border-l border-white/10 pl-6">
              <item.icon className="w-8 h-8 text-white/40 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-white/5 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tighter mb-8 leading-tight">
              The Future Is Live. <br />
              <span className="text-primary">Are You In?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              This Is Where Commerce Is Going. Live. Video-first. Negotiable. <br />
              Be early. Not late.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold px-10 h-14 rounded-full text-lg w-full sm:w-auto" onClick={() => window.open("https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share", "_blank")}>
                Download Zatch
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onStartSelling}
                className="border-white/20 text-white hover:bg-white/10 font-bold px-10 h-14 rounded-full text-lg w-full sm:w-auto"
              >
                Start Selling Today
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/30">
              Available on iOS and Android &bull; Simple onboarding &bull; No website needed
            </p>
            <p className="mt-4 text-xs text-white/20 italic">
              Interactive does not mean risky. It means transparent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
