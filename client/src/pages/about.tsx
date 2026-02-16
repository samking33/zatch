import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Linkedin, Twitter, Globe, ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Rakshit Gade",
      role: "Founder & CEO",
      bio: "Focuses on building scalable platforms that solve real behavioral problems in digital commerce. Believes the next evolution is content-led and community-driven.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Rigved Kaleru",
      role: "Co-founder & CPTO",
      bio: "Leads technology and product architecture. Responsible for the live streaming infrastructure and scalable backend that powers real-time interaction.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Lucky Preetham Rayi",
      role: "Chief Marketing Officer",
      bio: "Leads growth and creator ecosystem. Focuses on building community and connecting culture, commerce, and content.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="pt-32 pb-20 relative overflow-hidden">
        {/* Hero Section */}
        <div className="container mx-auto px-6 mb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
             <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter mb-8 leading-[0.9]">
               Building the <br />
               <span className="text-primary">Live Commerce</span> <br />
               Movement.
             </h1>
             <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl">
               Zatch is not just building another marketplace. We are building a live commerce ecosystem designed for India.
             </p>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <section className="py-20 border-y border-white/5 bg-white/[0.02]">
           <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
              <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
              >
                 <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-6">Our Vision</h2>
                 <h3 className="text-3xl font-bold text-white mb-6">Making commerce feel human again.</h3>
                 <p className="text-muted-foreground text-lg leading-relaxed">
                    We envision a marketplace where shopping is interactive, content drives commerce, and sellers build communities. The future of commerce is live, visual, and negotiable.
                 </p>
              </motion.div>
              
              <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
              >
                 <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-6">Our Mission</h2>
                 <h3 className="text-3xl font-bold text-white mb-6">Empowering sellers, delighting buyers.</h3>
                 <p className="text-muted-foreground text-lg leading-relaxed">
                    To empower Indian sellers to monetize video and close sales faster. To give buyers confidence through live interaction. One live session can replace hundreds of manual conversations.
                 </p>
              </motion.div>
           </div>
        </section>

        {/* Founders */}
        <section className="py-32 container mx-auto px-6">
           <h2 className="text-5xl font-bold font-display tracking-tight mb-16 text-center">Meet the Team</h2>
           
           <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                 <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="group relative"
                 >
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 bg-white/5 border border-white/10">
                       <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                       
                       <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                             <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                                <Linkedin className="w-4 h-4" />
                             </a>
                             <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                                <Twitter className="w-4 h-4" />
                             </a>
                          </div>
                       </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                       {member.bio}
                    </p>
                 </motion.div>
              ))}
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
