import { Link, useLocation } from "wouter";
import { Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import zatchLogo from "@/assets/zatch-logo.png";

export function Footer() {
  const [location, setLocation] = useLocation();

  const navigateToSection = (target: string) => {
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 200);
    } else {
      const el = document.getElementById(target);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4" data-testid="text-footer-brand">
              <img src={zatchLogo} alt="Zatch" className="w-9 h-9 rounded-lg" />
              <h3 className="text-2xl font-bold font-display tracking-tighter">
                ZATCH<span className="text-[#cafe38] text-xs align-top">&trade;</span>
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              India's live bargain marketplace. Live shopping. Video discovery. Strategic negotiation.
            </p>
            <p className="text-muted-foreground text-xs mb-6">
              Download the app and experience interactive commerce.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#cafe38] hover:bg-[#cafe38]/90 text-black px-6 py-3 rounded-lg font-bold text-sm transition-all w-full text-center mb-6"
              data-testid="button-footer-download"
            >
              Download Zatch&trade;
            </a>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#cafe38]/20 hover:text-[#cafe38] transition-colors cursor-pointer" data-testid="link-instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="font-bold mb-6 text-white">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><button onClick={() => navigateToSection("features")} className="hover:text-[#cafe38] transition-colors text-left" data-testid="link-footer-features">How It Works</button></li>
              <li><button onClick={() => navigateToSection("buyers")} className="hover:text-[#cafe38] transition-colors text-left" data-testid="link-footer-buyers">For Buyers</button></li>
              <li><button onClick={() => navigateToSection("sellers")} className="hover:text-[#cafe38] transition-colors text-left" data-testid="link-footer-sellers">For Sellers</button></li>
              <li><button onClick={() => navigateToSection("faq")} className="hover:text-[#cafe38] transition-colors text-left" data-testid="link-footer-faq">FAQs</button></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-[#cafe38] transition-colors" data-testid="link-footer-about">About Us</Link></li>
              <li><button onClick={() => navigateToSection("sellers")} className="hover:text-[#cafe38] transition-colors text-left" data-testid="link-footer-start-selling">Start Selling</button></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-bold mb-6 text-white">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-[#cafe38] transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#cafe38] transition-colors" data-testid="link-footer-terms">Terms & Conditions</Link></li>
              <li><Link href="/returns" className="hover:text-[#cafe38] transition-colors" data-testid="link-footer-returns">Return & Refund Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-[#cafe38] transition-colors" data-testid="link-footer-shipping">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Column 5: Support */}
          <div>
            <h4 className="font-bold mb-6 text-white">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="mailto:support@zatch.shop" className="hover:text-[#cafe38] transition-colors" data-testid="link-footer-support">Contact Support</a></li>
              <li className="text-xs pt-2 text-[#cafe38]" data-testid="text-support-email">support@zatch.shop</li>
              <li className="text-xs text-white/30 mt-2">Average response: under 24 hours</li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p data-testid="text-copyright">&copy; 2025 Zatch&trade;. All rights reserved.</p>
          <p data-testid="text-company">A product of Just Emagine Pvt Ltd</p>
        </div>
      </div>
    </footer>
  );
}
