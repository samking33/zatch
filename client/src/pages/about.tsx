import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Linkedin, Twitter, ArrowRight, Sparkles, Video, MessageSquareText, ShoppingBag, Globe } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  const team = [
    {
      name: "Rakshit Gade",
      role: "Founder & CEO",
      bio: "Rakshit leads the vision and strategy behind Zatch\u2122. With experience across product, business analysis, and enterprise systems, he focuses on building scalable platforms that solve real behavioral problems in digital commerce. He believes the next evolution of shopping in India will be content-led, community-driven, and negotiation-enabled.",
      initials: "RG",
    },
    {
      name: "Rigved Kaleru",
      role: "Co-founder & CPTO",
      bio: "Rigved leads technology and product architecture at Zatch\u2122. He is responsible for building the live streaming infrastructure, transaction systems, and scalable backend that powers real-time interaction. His focus is on creating a seamless, high-performance platform optimized for India's mobile-first users.",
      initials: "RK",
    },
    {
      name: "Lucky Preetham Rayi",
      role: "Chief Marketing Officer",
      bio: "Lucky leads growth, brand strategy, and creator ecosystem development. He focuses on building community, onboarding sellers, and shaping Zatch\u2122 into a movement rather than just an app. His work centers on connecting culture, commerce, and content.",
      initials: "LP",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#39FF14]/5 rounded-full blur-[200px] pointer-events-none" />

        {/* Hero */}
        <div className="container mx-auto px-6 mb-32 relative z-10">
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-[#39FF14]" />
              <span className="text-xs font-medium text-[#39FF14] tracking-wide uppercase">About Zatch&trade;</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tighter mb-8 leading-[0.9]">
              Building the <br />
              <span className="text-[#39FF14]">Live Commerce</span> <br />
              Movement.
            </h1>
            <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl">
              Zatch&trade; is not just building another marketplace. We are building a live commerce ecosystem designed for India.
            </p>
          </motion.div>
        </div>

        {/* What is Zatch */}
        <section className="py-20 border-y border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div {...fadeUp}>
              <h2 className="text-sm font-bold text-[#39FF14] tracking-widest uppercase mb-6">What is Zatch&trade;</h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                Zatch&trade; is a live and short-video shopping app built for how people actually buy. Watch sellers explain products on video, interact in real time, bargain instantly, and shop with confidence.
              </p>
              <p className="text-lg text-white/50 leading-relaxed mb-6">
                Most online shopping relies on static images and text that hide the real value of a product. Zatch&trade; fixes this by letting sellers demonstrate, explain, and sell through live video and short pitches &mdash; just like offline.
              </p>
              <p className="text-lg text-white/50 leading-relaxed mb-8">
                Discover products through short videos, join live shopping sessions, ask questions, and negotiate prices using Zatch&trade;'s three-step bargaining flow called "Zatch it." Complete purchases with proper checkout and tracking.
              </p>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] w-fit">
                <Globe className="w-4 h-4 text-[#39FF14]" />
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
                <span className="text-[#39FF14]">Just Zatch&trade; it.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 border-y border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
            <motion.div {...fadeUp}>
              <h2 className="text-sm font-bold text-[#39FF14] tracking-widest uppercase mb-6">Our Vision</h2>
              <h3 className="text-3xl font-bold text-white mb-6">Making commerce feel human again.</h3>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                To become India's leading live commerce ecosystem where buying and selling feel human again.
              </p>
              <ul className="space-y-3 text-white/40">
                <li className="flex items-start gap-3"><span className="text-[#39FF14] mt-1">&#x2022;</span> Shopping is interactive</li>
                <li className="flex items-start gap-3"><span className="text-[#39FF14] mt-1">&#x2022;</span> Content drives commerce</li>
                <li className="flex items-start gap-3"><span className="text-[#39FF14] mt-1">&#x2022;</span> Pricing is dynamic</li>
                <li className="flex items-start gap-3"><span className="text-[#39FF14] mt-1">&#x2022;</span> Sellers build communities, not just listings</li>
              </ul>
              <p className="text-white/40 mt-6">The future of commerce is live, visual, and negotiable.</p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-sm font-bold text-[#39FF14] tracking-widest uppercase mb-6">Our Mission</h2>
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
            <h2 className="text-sm font-bold text-[#39FF14] tracking-widest uppercase mb-6">Why We Started</h2>
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
              Zatch&trade; brings it back &mdash; in a scalable, structured way. We combine live selling, short video discovery, and strategic bargaining into one unified platform built for India's mobile-first generation.
            </p>
          </motion.div>
        </section>

        {/* Founding Team */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-16">
              <h2 className="text-sm font-bold text-[#39FF14] tracking-widest uppercase mb-4">The Team</h2>
              <h3 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
                Meet the Founders
              </h3>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">
                Zatch&trade; is built by founders who combine product, technology, and growth expertise.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group"
                >
                  <div className="relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.06] p-8 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#39FF14]/20 to-[#39FF14]/5 border border-[#39FF14]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-2xl font-bold text-[#39FF14] font-display">{member.initials}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-[#39FF14] font-medium text-sm mb-5">{member.role}</p>
                    <p className="text-sm text-white/40 leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <motion.div {...fadeUp}>
              <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tighter mb-8 leading-tight">
                Zatch&trade; is not just building another marketplace.
              </h2>
              <p className="text-2xl text-white/50 mb-8">
                We are building a <span className="text-[#39FF14] font-medium">live commerce movement</span> designed for India.
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
