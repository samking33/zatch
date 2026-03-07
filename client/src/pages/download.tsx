import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Play, Star } from "lucide-react";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-28 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-primary/5 blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight mb-5 md:mb-6">
                Get Zatch <br />
                <span className="text-stroke-primary text-transparent">On Your Phone.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
                Scan the QR code or click below to start your live shopping experience.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
             {/* QR Code Card */}
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               id="qr-download"
               className="bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group md:hover:border-primary/30 transition-all duration-500"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 bg-white p-3 md:p-4 rounded-3xl mb-6 md:mb-8 shadow-2xl relative z-10">
                   {/* Placeholder for QR Code */}
                   <div className="w-full h-full border-2 border-dashed border-black/20 flex items-center justify-center bg-zinc-50 rounded-xl overflow-hidden">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zatch.shop" 
                        alt="Download Zatch" 
                        className="w-full h-full object-cover mix-blend-multiply opacity-80"
                      />
                   </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Scan to Download</h3>
                <p className="text-muted-foreground text-sm">Open your camera app and point it here.</p>
             </motion.div>

             {/* App Store Links */}
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="space-y-4 md:space-y-6"
             >
                <a href="#qr-download" className="block group">
                   <div className="bg-[#1A1A1A] hover:bg-[#252525] border border-white/10 rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-6 transition-all duration-300 md:group-hover:scale-105 group-hover:border-primary/50">
                      <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                         <span className="text-3xl"></span>
                      </div>
                      <div>
                         <p className="text-xs text-white/60 uppercase tracking-widest mb-1">For iPhone</p>
                         <h3 className="text-xl md:text-2xl font-bold text-white">Scan the QR Code</h3>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                         <ArrowRight className="text-primary" />
                      </div>
                   </div>
                </a>

                <a href={PLAYSTORE_URL} target="_blank" rel="noopener noreferrer" className="block group">
                   <div className="bg-[#1A1A1A] hover:bg-[#252525] border border-white/10 rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-6 transition-all duration-300 md:group-hover:scale-105 group-hover:border-primary/50">
                      <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                         <Play className="w-8 h-8 fill-white text-white" />
                      </div>
                      <div>
                         <p className="text-xs text-white/60 uppercase tracking-widest mb-1">Get it on</p>
                         <h3 className="text-xl md:text-2xl font-bold text-white">Google Play</h3>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                         <ArrowRight className="text-primary" />
                      </div>
                   </div>
                </a>

                <div className="pt-8 border-t border-white/10 mt-8">
                   <div className="flex items-center gap-4 text-white/60 text-sm">
                      <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[10px] text-white">
                               <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            </div>
                         ))}
                      </div>
                      <p>Join 10,000+ early users</p>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
