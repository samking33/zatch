import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold font-display tracking-tighter flex items-center gap-2">
            ZATCH<span className="text-primary text-xs align-top">TM</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#buyers" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            For Buyers
          </a>
          <a href="#sellers" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            For Sellers
          </a>
          <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:text-primary rounded-full px-6">
            Login
          </Button>
          <Button className="bg-primary text-black hover:bg-primary/90 rounded-full font-bold px-6 shadow-[0_0_20px_rgba(199,240,79,0.3)] hover:shadow-[0_0_30px_rgba(199,240,79,0.5)] transition-all">
            Download App
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5">
          <a href="#features" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
            How It Works
          </a>
          <a href="#buyers" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
            For Buyers
          </a>
          <a href="#sellers" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
            For Sellers
          </a>
          <div className="flex flex-col gap-4 mt-4">
            <Button variant="outline" className="w-full border-white/10">
              Login
            </Button>
            <Button className="w-full bg-primary text-black font-bold">
              Download App
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
