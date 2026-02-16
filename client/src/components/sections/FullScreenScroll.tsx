import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function FullScreenScroll() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Abstract Background Flow */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-primary/5 blur-[120px] -translate-y-1/2 rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-8"
          >
            Shopping Was Meant To Be <span className="text-primary">Social.</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-2 text-xl md:text-2xl text-muted-foreground font-light"
          >
            <p>In real markets, you talk.</p>
            <p>You ask questions.</p>
            <p>You negotiate.</p>
            <p className="text-white font-medium">You build trust.</p>
            <p className="pt-4 text-base opacity-60">But online shopping removed all of that.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "No Middlemen", desc: "Direct connection.", delay: 0 },
            { title: "No Algorithms", desc: "Pure discovery.", delay: 0.2 },
            { title: "No Pay-to-Win", desc: "Real engagement.", delay: 0.4 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + item.delay, duration: 0.5 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-primary/20 transition-all group"
            >
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
