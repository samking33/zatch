import { CheckCircle2 } from "lucide-react";

export function ForBuyers() {
  return (
    <section id="buyers" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">For Buyers</h2>
            <h3 className="text-5xl font-bold font-display tracking-tight mb-8">Shop Like You Mean It.</h3>
            
            <div className="space-y-8">
              {[
                { title: "See It Live", desc: "Watch real sellers. Ask instantly. Buy confidently." },
                { title: "Discover Fast", desc: "Short videos. No endless scrolling. Instant checkout." },
                { title: "Set Your Price", desc: "Send an offer. Get a response. Lock the deal." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 text-2xl font-light italic text-white/80">
              "Less guessing. More winning."
            </p>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-video rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50" />
              {/* Abstract decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-primary/30 animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-20 h-20 rounded-full bg-primary/20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
