import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight, Home, Info, HelpCircle, Store, LogIn, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

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
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "How It Works", href: "/#features", icon: HelpCircle },
    { name: "Sellers", href: "/#sellers", icon: Store },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-transparent py-2" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold font-display tracking-tighter flex items-center gap-2 relative z-50 group mix-blend-difference">
            <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-300">ZATCH</span>
            <span className="text-primary text-xs align-top">TM</span>
          </a>
        </Link>

        {/* Desktop Dock Nav */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-auto md:top-2">
           <Dock className="bg-black/50 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl gap-2">
              {navLinks.map((link) => (
                 <DockItem key={link.name} className="aspect-square rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                    <DockLabel className="bg-black/80 text-white border-white/10">{link.name}</DockLabel>
                    <DockIcon>
                       <Link href={link.href}>
                          <link.icon className={`w-full h-full p-2 ${location === link.href ? 'text-primary' : 'text-white/60'}`} />
                       </Link>
                    </DockIcon>
                 </DockItem>
              ))}
              <div className="w-px h-8 bg-white/10 self-center mx-1" />
              <DockItem className="aspect-square rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                 <DockLabel className="bg-black/80 text-white border-white/10">Login</DockLabel>
                 <DockIcon>
                    <LogIn className="w-full h-full p-2 text-white/60" />
                 </DockIcon>
              </DockItem>
              <DockItem className="aspect-square rounded-full bg-primary hover:bg-primary/90 border border-primary/50 transition-colors shadow-[0_0_15px_rgba(199,240,79,0.3)]">
                 <DockLabel className="bg-black/80 text-white border-white/10">Download</DockLabel>
                 <DockIcon>
                    <Link href="/download">
                       <Download className="w-full h-full p-2 text-black font-bold" />
                    </Link>
                 </DockIcon>
              </DockItem>
           </Dock>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-4">
            <Link href="/download">
               <Button size="sm" className="bg-primary text-black font-bold rounded-full">
                  Get App
               </Button>
            </Link>
            <button
               className="text-white relative z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
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
                          className="text-4xl font-bold font-display text-white hover:text-primary transition-colors block py-2 flex items-center gap-4" 
                          onClick={() => setMobileMenuOpen(false)}
                       >
                          <link.icon className="w-8 h-8 opacity-50" />
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
