import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <main className="pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tighter mb-5 md:mb-6 text-white">
              Shipping Policy
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed">
              Learn how shipping works on the Zatch™ platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border-b border-white/5 pb-10 md:pb-12 mb-10 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 md:mb-6">Seller-Managed Shipping</h2>
            <p className="text-white/50 text-sm sm:text-base leading-7">
              Currently, sellers on Zatch™ have full control over their shipping process, including setting their own shipping charges based on their preferred courier, location, packaging, and delivery speed. This allows sellers to manage logistics in a way that best suits their business and customers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 md:mb-6">Integrated Zatch™ Shipping - Coming Soon</h2>
            <p className="text-white/50 text-sm sm:text-base leading-7 mb-4">
              We are actively developing our own integrated Zatch™ shipping service to make the process easier, faster, and more reliable. Once launched, it will offer seamless order fulfillment, simplified logistics management, and competitive shipping rates.
            </p>
            <p className="text-white/50 text-sm sm:text-base leading-7 mb-6 md:mb-8">
              This upcoming feature will help sellers save time, improve delivery efficiency, and provide a smoother, more convenient experience for both sellers and buyers. Key benefits will include:
            </p>
            <ul className="space-y-3 text-white/50 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <span className="text-[#cafe38] mt-1">&#x2022;</span>
                Seamless order fulfillment
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#cafe38] mt-1">&#x2022;</span>
                Competitive shipping rates
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#cafe38] mt-1">&#x2022;</span>
                Real-time tracking
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#cafe38] mt-1">&#x2022;</span>
                Standardized delivery timelines
              </li>
            </ul>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
