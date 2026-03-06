import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <main className="pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tighter mb-5 md:mb-6 text-white">
              Return &amp; Refund Policy
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed">
              Understand how returns and refunds work on the Zatch™ platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border-b border-white/5 pb-10 md:pb-12 mb-10 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 md:mb-6">Return Policy</h2>
            <p className="text-white/50 text-sm sm:text-base leading-7 mb-4">
              Currently, returns are not available on our platform, and all purchases are considered final. We understand that a return option is important for a confident shopping experience, and we are actively working on introducing a returns feature soon.
            </p>
            <p className="text-white/50 text-sm sm:text-base leading-7 mb-4">
              Since we do not store or manage any inventory, all products are shipped directly by sellers. In case returns are introduced, the returned goods will go back to the respective seller.
            </p>
            <p className="text-white/50 text-sm sm:text-base leading-7 mb-5 md:mb-6">
              Until then, we encourage buyers to review product details, descriptions, and seller information carefully before making a purchase.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-white/[0.04] border border-white/[0.06] w-full sm:w-fit">
              <span className="text-white/70">If you face any issues with your order, contact us at</span>
              <a
                href="mailto:support@zatch.shop"
                className="text-[#cafe38] font-medium hover:underline"
                data-testid="link-return-support-email"
              >
                support@zatch.shop
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 md:mb-6">Refund Policy</h2>
            <p className="text-white/50 text-sm sm:text-base leading-7 mb-4">
              Our refund policy is currently under development and will be introduced soon to provide a more structured and transparent experience.
            </p>
            <p className="text-white/50 text-sm sm:text-base leading-7 mb-4">
              If a buyer reports that a product is unsatisfactory and the issue is reviewed and approved, the refund process will be initiated accordingly. In such cases, the amount will be settled with the seller as part of the resolution process, and the complete refund handling may take up to 2–3 weeks.
            </p>
            <p className="text-white/50 text-sm sm:text-base leading-7">
              We are working on making this process faster, clearer, and more convenient for both buyers and sellers in the upcoming updates.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
