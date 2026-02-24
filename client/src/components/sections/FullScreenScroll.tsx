import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function FullScreenScroll() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

  return (
    <section ref={container} className="relative h-[160vh] bg-black">
       <div className="sticky top-0 h-screen overflow-hidden">
          <BackgroundParallax progress={smoothProgress} />
          
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
             <div className="container mx-auto px-6 text-center">
                <motion.div style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}>
                   <h2 className="text-6xl md:text-8xl font-bold font-display tracking-tight text-white mb-6" style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.3)' }}>
                      Shopping was meant to be <span className="text-stroke-primary text-transparent" style={{ WebkitTextStroke: '1.5px #cafe38' }}>Social.</span>
                   </h2>
                </motion.div>

                <motion.div 
                   style={{ 
                      opacity: useTransform(smoothProgress, [0.2, 0.4, 0.6], [0, 1, 0]),
                      scale: useTransform(smoothProgress, [0.2, 0.4], [0.8, 1])
                   }}
                   className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
                >
                   <p className="text-4xl md:text-6xl font-light text-white leading-tight">
                      In real markets, you talk.<br/>
                      <span className="text-white/40">You negotiate.</span>
                   </p>
                </motion.div>

                <motion.div 
                   style={{ 
                      opacity: useTransform(smoothProgress, [0.6, 0.8], [0, 1]),
                      y: useTransform(smoothProgress, [0.6, 0.8], [50, 0])
                   }}
                   className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
                >
                   <h3 className="text-5xl md:text-7xl font-bold font-display text-primary mb-8">
                      Zatch brings it back.
                   </h3>
                   <div className="flex justify-center gap-4">
                      {["No Middlemen", "No Algorithms", "No Pay-to-Win"].map((item, i) => (
                         <div key={i} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80">
                            {item}
                         </div>
                      ))}
                   </div>
                </motion.div>
             </div>
          </div>
       </div>
    </section>
  );
}

function BackgroundParallax({ progress }: { progress: any }) {
   return (
      <div className="absolute inset-0 w-full h-full">
         <motion.div 
            style={{ 
               scale: useTransform(progress, [0, 1], [1, 1.5]),
               rotate: useTransform(progress, [0, 1], [0, 15])
            }}
            className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" 
         />
         <motion.div 
            style={{ 
               scale: useTransform(progress, [0, 1], [1, 1.2]),
               x: useTransform(progress, [0, 1], [0, -200])
            }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" 
         />
      </div>
   )
}
