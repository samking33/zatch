import { Link } from "wouter";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold font-display tracking-tighter mb-4">
              ZATCH<span className="text-primary text-xs align-top">TM</span>
            </h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              India’s live bargain marketplace. Live shopping. Video discovery. Strategic negotiation.
            </p>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all w-full text-center mb-6">
              Download Zatch
            </button>
            <div className="flex gap-4">
              {/* Mock App Store Icons */}
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer">
                <Twitter size={16} />
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer">
                <Instagram size={16} />
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer">
                <Linkedin size={16} />
              </div>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="font-bold mb-6 text-white">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#buyers" className="hover:text-primary transition-colors">For Buyers</a></li>
              <li><a href="#sellers" className="hover:text-primary transition-colors">For Sellers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Column 3: Sellers */}
          <div>
            <h4 className="font-bold mb-6 text-white">Sellers</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Start Selling</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Seller Guidelines</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-bold mb-6 text-white">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Token Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dispute Resolution</a></li>
            </ul>
          </div>

          {/* Column 5: Support */}
          <div>
            <h4 className="font-bold mb-6 text-white">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              <li className="text-xs pt-2 text-primary">support@zatch.shop</li>
              <li className="text-xs text-white/40 mt-2">Avg. response: &lt; 24h</li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 Zatch™. All rights reserved.</p>
          <p>A product of Just Emagine Pvt Ltd</p>
        </div>
      </div>
    </footer>
  );
}
