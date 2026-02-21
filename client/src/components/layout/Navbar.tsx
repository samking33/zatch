import { useState, useEffect, useCallback } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", target: "hero" },
  { name: "How It Works", target: "features" },
  { name: "Buyers", target: "buyers" },
  { name: "Sellers", target: "sellers" },
  { name: "FAQ", target: "faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map(l => l.target);
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((target: string) => {
    setMobileMenuOpen(false);
    if (target === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(target);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.04] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="text-2xl font-bold font-display tracking-tighter flex items-center gap-1.5 relative z-50 group"
            data-testid="link-home"
          >
            <span className="text-white group-hover:text-[#39FF14] transition-colors duration-300">ZATCH</span>
            <span className="text-[#39FF14] text-[10px] align-top font-medium">TM</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.target)}
                className="relative px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-lg group"
                data-testid={`nav-${link.target}`}
              >
                <span className={`relative z-10 ${
                  activeSection === link.target ? "text-white" : "text-white/40 group-hover:text-white/70"
                } transition-colors duration-200`}>
                  {link.name}
                </span>
                {activeSection === link.target && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/[0.06] rounded-lg border border-white/[0.06]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            ))}

            <div className="w-px h-5 bg-white/[0.08] mx-2" />

            <button
              onClick={() => scrollTo("download")}
              className="flex items-center gap-2 px-5 py-2 bg-[#39FF14] text-black text-[13px] font-bold rounded-lg hover:bg-[#39FF14]/90 transition-all duration-200 shadow-[0_0_20px_rgba(57,255,20,0.15)] hover:shadow-[0_0_30px_rgba(57,255,20,0.25)]"
              data-testid="nav-download"
            >
              <Download className="w-3.5 h-3.5" />
              Get App
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => scrollTo("download")}
              className="px-4 py-2 bg-[#39FF14] text-black text-xs font-bold rounded-lg"
              data-testid="nav-download-mobile"
            >
              Get App
            </button>
            <button
              className="text-white relative z-50 p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col pt-28 px-8"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  onClick={() => scrollTo(link.target)}
                  className={`text-left text-3xl font-bold font-display py-3 transition-colors ${
                    activeSection === link.target ? "text-[#39FF14]" : "text-white/60 hover:text-white"
                  }`}
                  data-testid={`nav-mobile-${link.target}`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <button
                onClick={() => scrollTo("download")}
                className="w-full flex items-center justify-center gap-2 bg-[#39FF14] text-black font-bold py-4 text-lg rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.2)]"
              >
                <Download className="w-5 h-5" />
                Download App
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
