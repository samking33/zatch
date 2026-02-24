import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function JoinSellerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white mb-4 text-center">
            Join as a <span className="text-primary">Seller</span>
          </h1>
          <p className="text-white/50 text-lg text-center mb-10 max-w-lg mx-auto">
            Fill out the form below to register as a seller on Zatch.
          </p>
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSftMpAYkGKMCmL8uo1FTTooA-w_ejrzcySRizeFan4_CCsHbg/viewform?embedded=true"
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Join as Seller"
              className="w-full"
            >
              Loading...
            </iframe>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
