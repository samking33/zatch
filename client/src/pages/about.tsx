import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Linkedin, Twitter, ArrowRight, Sparkles, Video, MessageSquareText, ShoppingBag, Globe } from "lucide-react";
import rakshitImg from "@/assets/rakshit.png";
import luckyImg from "@/assets/lucky.jpeg";

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
      photo: rakshitImg,
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
      photo: luckyImg,
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
        <section className="py-32 border-t border-white/5 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/[0.03] rounded-full blur-[150px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div {...fadeUp} className="text-center mb-20">
              <h2 className="text-sm font-bold text-[#39FF14] tracking-widest uppercase mb-4">The Team</h2>
              <h3 className="text-4xl md:text-6xl font-bold font-display tracking-tight">
                Meet the Founders
              </h3>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">
                Zatch&trade; is built by founders who combine product, technology, and growth expertise.
              </p>
            </motion.div>

            <div className="space-y-16 max-w-6xl mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <div className={`relative rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-700 ${member.photo ? '' : ''}`}>
                    <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}>
                      {member.photo ? (
                        <div className="relative w-full md:w-[380px] lg:w-[420px] shrink-0 aspect-[4/5] md:aspect-auto overflow-hidden">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-${i % 2 === 0 ? 'r' : 'l'} from-transparent via-transparent to-black/60 hidden md:block`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                            <span className="text-[11px] text-white/80 font-medium tracking-wide">{member.role}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full md:w-[380px] lg:w-[420px] shrink-0 aspect-[4/5] md:aspect-auto overflow-hidden bg-gradient-to-br from-[#39FF14]/[0.08] to-transparent flex items-center justify-center">
                          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[#39FF14]/20 to-[#39FF14]/5 border border-[#39FF14]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <span className="text-5xl md:text-6xl font-bold text-[#39FF14] font-display">{member.initials}</span>
                          </div>
                          <div className={`absolute inset-0 bg-gradient-to-${i % 2 === 0 ? 'r' : 'l'} from-transparent via-transparent to-black/60 hidden md:block`} />
                          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                            <span className="text-[11px] text-white/80 font-medium tracking-wide">{member.role}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex-1 p-8 md:p-10 lg:p-14 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-px bg-[#39FF14]/40" />
                          <span className="text-[11px] text-[#39FF14]/60 font-mono tracking-widest uppercase">0{i + 1}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white font-display tracking-tight mb-2">{member.name}</h3>
                        <p className="text-[#39FF14] font-semibold text-sm mb-6 md:hidden">{member.role}</p>
                        <p className="text-base md:text-lg text-white/40 leading-relaxed">{member.bio}</p>

                        <div className="mt-8 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-[#39FF14]/10 hover:border-[#39FF14]/20 transition-all duration-300 cursor-pointer">
                            <Linkedin className="w-4 h-4 text-white/40 hover:text-white transition-colors" />
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-[#39FF14]/10 hover:border-[#39FF14]/20 transition-all duration-300 cursor-pointer">
                            <Twitter className="w-4 h-4 text-white/40 hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
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
