import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", target: "hero", type: "scroll" },
  { name: "How It Works", target: "features", type: "scroll" },
  { name: "Buyers", target: "buyers", type: "scroll" },
  { name: "Sellers", target: "sellers", type: "scroll" },
  { name: "About", target: "/about", type: "link" },
  { name: "FAQ", target: "faq", type: "scroll" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [location, setLocation] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (!isHome) return;
      const scrollLinks = NAV_LINKS.filter(l => l.type === "scroll");
      let current = "hero";
      for (const link of scrollLinks) {
        const el = document.getElementById(link.target);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = link.target;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navigate = useCallback((link: typeof NAV_LINKS[0]) => {
    setMobileMenuOpen(false);

    if (link.type === "link") {
      setLocation(link.target);
      window.scrollTo({ top: 0 });
      return;
    }

    if (!isHome) {
      setLocation("/");
      setTimeout(() => {
        const el = document.getElementById(link.target);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
      return;
    }

    if (link.target === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(link.target);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [isHome, setLocation]);

  const isActive = (link: typeof NAV_LINKS[0]) => {
    if (link.type === "link") return location === link.target;
    return isHome && activeSection === link.target;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-black/60 to-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => { setLocation("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-2xl font-bold font-display tracking-tighter flex items-center gap-1.5 relative z-50 group"
            data-testid="link-home"
          >
            <span className="text-white group-hover:text-[#39FF14] transition-colors duration-300">ZATCH</span>
            <span className="text-[#39FF14] text-[10px] align-top font-medium">&trade;</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5 bg-white/[0.04] backdrop-blur-xl rounded-xl border border-white/[0.06] px-1.5 py-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link)}
                className="relative px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-lg"
                data-testid={`nav-${link.target}`}
              >
                <span className={`relative z-10 ${
                  isActive(link) ? "text-white" : "text-white/50 hover:text-white/80"
                } transition-colors duration-200`}>
                  {link.name}
                </span>
                {isActive(link) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/[0.1] rounded-lg border border-white/[0.08]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => navigate({ name: "Download", target: "download", type: "scroll" })}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#39FF14] text-black text-[13px] font-bold rounded-xl hover:bg-[#39FF14]/90 transition-all duration-200 shadow-[0_0_20px_rgba(57,255,20,0.2)] hover:shadow-[0_0_30px_rgba(57,255,20,0.35)]"
              data-testid="nav-download"
            >
              <Download className="w-3.5 h-3.5" />
              Get App
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => navigate({ name: "Download", target: "download", type: "scroll" })}
              className="px-4 py-2 bg-[#39FF14] text-black text-xs font-bold rounded-lg shadow-[0_0_12px_rgba(57,255,20,0.2)]"
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
                  onClick={() => navigate(link)}
                  className={`text-left text-3xl font-bold font-display py-3 transition-colors ${
                    isActive(link) ? "text-[#39FF14]" : "text-white/60 hover:text-white"
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
                onClick={() => navigate({ name: "Download", target: "download", type: "scroll" })}
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
