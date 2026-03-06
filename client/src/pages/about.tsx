import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, Globe } from "lucide-react";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import rakshitImg from "@assets/Untitled_design_(1)_1771950553421.png";
import luckyImg from "@/assets/lucky.jpeg";
import rigvedImg from "@/assets/rigved.jpeg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const { isFinePointer } = useDeviceCapabilities();

  const team = [
    {
      name: "Rakshit Gade",
      role: "Founder & CEO",
      bio: "Rakshit leads the vision and strategy behind Zatch\u2122. With experience across product, business analysis, and enterprise systems, he focuses on building scalable platforms that solve real behavioral problems in digital commerce. He believes the next evolution of shopping in India will be content-led, community-driven, and negotiation-enabled.",
      initials: "RG",
      photo: rakshitImg,
      photoPosition: "center 16%",
    },
    {
      name: "Rigved Kaleru",
      role: "Co-founder & CPTO",
      bio: "Rigved leads technology and product architecture at Zatch\u2122. He is responsible for building the live streaming infrastructure, transaction systems, and scalable backend that powers real-time interaction. His focus is on creating a seamless, high-performance platform optimized for India's mobile-first users.",
      initials: "RK",
      photo: rigvedImg,
      photoPosition: "center 14%",
    },
    {
      name: "Lucky Preetham Rayi",
      role: "Chief Marketing Officer",
      bio: "Lucky leads growth, brand strategy, and creator ecosystem development. He focuses on building community, onboarding sellers, and shaping Zatch\u2122 into a movement rather than just an app. His work centers on connecting culture, commerce, and content.",
      initials: "LP",
      photo: luckyImg,
      photoPosition: "center 17%",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#cafe38]/5 rounded-full blur-[200px] pointer-events-none" />

        {/* Hero */}
        <div className="container mx-auto px-6 mb-32 relative z-10">
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-[#cafe38]" />
              <span className="text-xs font-medium text-[#cafe38] tracking-wide uppercase">About Zatch</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tighter mb-8 leading-[0.9]">
              Building the <br />
              <span className="text-[#cafe38]">Live Commerce</span> <br />
              Movement.
            </h1>
            <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl">
              Zatch is not just building another marketplace. We are building a live commerce ecosystem designed for India.
            </p>
          </motion.div>
        </div>

        {/* What is Zatch */}
        <section className="py-20 border-y border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div {...fadeUp}>
              <h2 className="text-sm font-bold text-[#cafe38] tracking-widest uppercase mb-6">What is Zatch</h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                Zatch is a live and short-video shopping app built for how people actually buy. Watch sellers explain products on video, interact in real time, bargain instantly, and shop with confidence.
              </p>
              <p className="text-lg text-white/50 leading-relaxed mb-6">
                Most online shopping relies on static images and text that hide the real value of a product. Zatch fixes this by letting sellers demonstrate, explain, and sell through live video and short pitches - just like offline.
              </p>
              <p className="text-lg text-white/50 leading-relaxed mb-8">
                Discover products through short videos, join live shopping sessions, ask questions, and negotiate prices using Zatch's three-step bargaining flow called "Zatch it." Complete purchases with proper checkout and tracking.
              </p>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] w-fit">
                <Globe className="w-4 h-4 text-[#cafe38]" />
                <span className="text-sm text-white/60">Supports Hindi, Telugu, and English</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tagline Block */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div {...fadeUp}>
              <p className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white leading-tight">
                Catch the product.<br />
                Match the price.<br />
                Snatch the deal.<br />
                <span className="text-[#cafe38]">Just Zatch it.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 border-y border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
            <motion.div {...fadeUp}>
              <h2 className="text-sm font-bold text-[#cafe38] tracking-widest uppercase mb-6">Our Vision</h2>
              <h3 className="text-3xl font-bold text-white mb-6">Making commerce feel human again.</h3>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                To become India's leading live commerce ecosystem where buying and selling feel human again.
              </p>
              <ul className="space-y-3 text-white/40">
                <li className="flex items-start gap-3"><span className="text-[#cafe38] mt-1">&#x2022;</span> Shopping is interactive</li>
                <li className="flex items-start gap-3"><span className="text-[#cafe38] mt-1">&#x2022;</span> Content drives commerce</li>
                <li className="flex items-start gap-3"><span className="text-[#cafe38] mt-1">&#x2022;</span> Pricing is dynamic</li>
                <li className="flex items-start gap-3"><span className="text-[#cafe38] mt-1">&#x2022;</span> Sellers build communities, not just listings</li>
              </ul>
              <p className="text-white/40 mt-6">The future of commerce is live, visual, and negotiable.</p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-sm font-bold text-[#cafe38] tracking-widest uppercase mb-6">Our Mission</h2>
              <h3 className="text-3xl font-bold text-white mb-6">Empowering sellers, delighting buyers.</h3>
              <p className="text-white/50 text-lg leading-relaxed mb-4">
                To empower Indian sellers to monetize video and close sales faster. To give buyers confidence through live interaction and transparent negotiation. To remove the friction of DMs, manual follow-ups, and static catalogs.
              </p>
              <p className="text-white/40 leading-relaxed">
                We are building a system where one live session can replace hundreds of manual conversations. One short video can convert instantly. One negotiation can close in seconds. Commerce should feel alive.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why We Started */}
        <section className="py-24 container mx-auto px-6 max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="text-sm font-bold text-[#cafe38] tracking-widest uppercase mb-6">Why We Started</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white mb-8">
              Indian shopping has always been conversational.
            </h3>
            <p className="text-xl text-white/50 leading-relaxed mb-6">
              In physical markets, people talk. They ask questions. They negotiate. They build trust face to face.
            </p>
            <p className="text-xl text-white/50 leading-relaxed mb-6">
              Digital commerce removed that interaction.
            </p>
            <p className="text-xl text-white/60 leading-relaxed font-medium">
              Zatch brings it back - in a scalable, structured way. We combine live selling, short video discovery, and strategic bargaining into one unified platform built for India's mobile-first generation.
            </p>
          </motion.div>
        </section>

        {/* Founding Team */}
        <section className="py-32 border-t border-white/5 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#cafe38]/[0.03] rounded-full blur-[150px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div {...fadeUp} className="text-center mb-20">
              <h2 className="text-sm font-bold text-[#cafe38] tracking-widest uppercase mb-4">The Team</h2>
              <h3 className="text-4xl md:text-6xl font-bold font-display tracking-tight">
                Meet the Founders
              </h3>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">
                Zatch is built by founders who combine product, technology, and growth expertise.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              {team.map((member, i) => {
                const isActive =
                  hoveredMember !== null ? hoveredMember === i : selectedMember === i;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative h-[460px] sm:h-[520px] md:h-[590px] overflow-hidden rounded-[1.8rem] border border-white/[0.1] bg-[#060606] transition-all duration-500 cursor-pointer ${isFinePointer ? "hover:border-white/[0.2] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]" : ""}`}
                    onMouseEnter={() => {
                      if (!isFinePointer) return;
                      setHoveredMember(i);
                    }}
                    onMouseLeave={() => {
                      if (!isFinePointer) return;
                      setHoveredMember(null);
                    }}
                    onClick={() => setSelectedMember(i)}
                    onFocus={() => setHoveredMember(i)}
                    onBlur={() => setHoveredMember(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedMember(i);
                      }
                    }}
                    tabIndex={0}
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ objectPosition: member.photoPosition }}
                      className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                        isActive ? "scale-105" : "scale-100"
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/94 via-black/30 to-black/12" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/12 bg-black/45 px-3 py-1.5 backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-[#cafe38] animate-pulse" />
                      <span className="text-[11px] font-medium tracking-wide text-white/80">{member.role}</span>
                    </div>

                    <motion.div
                      animate={{ y: isActive ? 0 : 205 }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/82 px-6 py-5 backdrop-blur-xl"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <div className="w-7 h-px bg-[#cafe38]/45" />
                        <span className="text-[10px] font-mono tracking-widest text-[#cafe38]/65 uppercase">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold font-display tracking-tight text-white">{member.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#cafe38]/70">
                        {member.role}
                      </p>

                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          height: isActive ? "auto" : 0,
                          marginTop: isActive ? 12 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm leading-relaxed text-white/58">{member.bio}</p>
                      </motion.div>

                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <motion.div {...fadeUp}>
              <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tighter mb-8 leading-tight">
                Zatch is not just building another marketplace.
              </h2>
              <p className="text-2xl text-white/50 mb-8">
                We are building a <span className="text-[#cafe38] font-medium">live commerce movement</span> designed for India.
              </p>
              <p className="text-3xl font-bold font-display text-white">
                Catch it. Match it. Snatch it.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
