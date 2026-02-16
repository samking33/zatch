import { Video, ShoppingBag, MessageSquareText } from "lucide-react";

export function ThreeWays() {
  return (
    <section id="features" className="py-32 bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-6">
            Three Ways to Shop. <br />
            <span className="text-primary">One Powerful Platform.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Zatch is not just another marketplace. It is a live powered, video driven, negotiation enabled commerce experience.
          </p>
        </div>

        <div className="space-y-32">
          {/* Feature 1 */}
          <div className="group grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-8 border border-red-500/20">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute opacity-75" />
                <div className="w-3 h-3 rounded-full bg-red-500 relative" />
              </div>
              <h3 className="text-4xl font-bold font-display mb-4">Live Shopping</h3>
              <h4 className="text-xl font-medium text-white/60 mb-8">Watch. Ask. Decide.</h4>
              
              <ul className="space-y-4 mb-8 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  See products demonstrated in real time.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Interact with sellers instantly.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Ask questions before you buy.
                </li>
              </ul>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Value to Buyers</p>
                <p className="text-sm text-muted-foreground">Clarity and trust before payment.</p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
               <div className="absolute inset-0 bg-red-500/20 blur-[100px] rounded-full opacity-20" />
               <div className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 overflow-hidden group-hover:border-red-500/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay" />
                  <div className="absolute bottom-8 left-8 right-8">
                     <div className="flex gap-2 mb-4">
                        <div className="px-3 py-1 bg-red-600 rounded-full text-xs font-bold text-white">LIVE</div>
                        <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium text-white">1.2k watching</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
               <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-20" />
               <div className="relative aspect-[4/5] rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 overflow-hidden group-hover:border-blue-500/30 transition-all duration-500 transform md:rotate-[-2deg]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video size={64} className="text-white/20" />
                  </div>
               </div>
            </div>
            <div>
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20">
                <Video />
              </div>
              <h3 className="text-4xl font-bold font-display mb-4">Buy Bits</h3>
              <h4 className="text-xl font-medium text-white/60 mb-8">Short Video Shopping.</h4>
              
              <ul className="space-y-4 mb-8 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Products become content.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Watch quick demos. Understand in seconds.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Buy without leaving the video.
                </li>
              </ul>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Value to Buyers</p>
                <p className="text-sm text-muted-foreground">Faster decisions and relevant discovery.</p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 border border-primary/20">
                <MessageSquareText />
              </div>
              <h3 className="text-4xl font-bold font-display mb-4">Zatching</h3>
              <h4 className="text-xl font-medium text-white/60 mb-8">Strategic Bargaining.</h4>
              
              <ul className="space-y-4 mb-8 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Send a quote. Receive approval or counter.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Close the deal instantly.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  This is not discount coupons. This is real negotiation.
                </li>
              </ul>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Value to Buyers</p>
                <p className="text-sm text-muted-foreground">Personalized pricing.</p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
               <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-20" />
               <div className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 overflow-hidden group-hover:border-primary/30 transition-all duration-500 flex flex-col items-center justify-center p-8">
                  
                  {/* Chat UI Mockup */}
                  <div className="w-full max-w-xs space-y-4">
                    <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none self-start mr-8 backdrop-blur-md">
                      <p className="text-xs text-white/60 mb-1">Buyer Offer</p>
                      <p className="text-lg font-bold">₹1,200</p>
                    </div>
                    <div className="bg-primary/20 border border-primary/20 p-4 rounded-2xl rounded-tr-none self-end ml-8 backdrop-blur-md text-right">
                      <p className="text-xs text-primary mb-1">Seller Counter</p>
                      <p className="text-lg font-bold text-white">₹1,350</p>
                    </div>
                    <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-2xl text-center backdrop-blur-md mt-6">
                      <p className="text-green-400 font-bold tracking-wide">DEAL LOCKED 🔒</p>
                    </div>
                  </div>

               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
