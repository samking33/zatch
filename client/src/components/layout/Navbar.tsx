import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "How It Works", href: "/#features" },
    { name: "Sellers", href: "/#sellers" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold font-display tracking-tighter flex items-center gap-2 relative z-50 group">
            <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-300">ZATCH</span>
            <span className="text-primary text-xs align-top">TM</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
             <Link key={link.name} href={link.href}>
                <a className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? 'text-white' : 'text-muted-foreground'}`}>
                   {link.name}
                </a>
             </Link>
          ))}
          
          <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:text-primary rounded-full px-6 transition-transform hover:scale-105 active:scale-95">
            Login
          </Button>
          
          <Link href="/download">
             <Button className="bg-primary text-black hover:bg-primary/90 rounded-full font-bold px-6 shadow-[0_0_20px_rgba(199,240,79,0.3)] hover:shadow-[0_0_30px_rgba(199,240,79,0.5)] transition-all hover:scale-105 active:scale-95 group">
                Download App <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white relative z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-40 flex flex-col pt-32 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                 <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1), duration: 0.4 }}
                 >
                    <Link href={link.href}>
                       <a 
                          className="text-4xl font-bold font-display text-white hover:text-primary transition-colors block py-2" 
                          onClick={() => setMobileMenuOpen(false)}
                       >
                          {link.name}
                       </a>
                    </Link>
                 </motion.div>
              ))}
              
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="mt-8 flex flex-col gap-4"
              >
                <Button variant="outline" className="w-full border-white/10 py-6 text-lg rounded-xl">
                  Login
                </Button>
                <Link href="/download">
                   <Button className="w-full bg-primary text-black font-bold py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(199,240,79,0.2)]">
                     Download App
                   </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
