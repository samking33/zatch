import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function JoinBuyerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white mb-4 text-center">
            Join as a <span className="text-primary">Buyer</span>
          </h1>
          <p className="text-white/50 text-lg text-center mb-10 max-w-lg mx-auto">
            Fill out the form below to get early access to Zatch as a buyer.
          </p>
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden bg-white/5 border border-white/10 min-h-[600px] flex items-center justify-center">
            <p className="text-white/30 text-lg">Google Form will be embedded here</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
