import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <main className="pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tighter mb-5 md:mb-6 text-white">
              Terms &amp; Conditions
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed">
              Please review the terms that govern your use of the Zatch™ platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 sm:p-8 md:p-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 md:mb-6">Coming Soon</h2>
            <p className="text-white/50 text-sm sm:text-base leading-7 mb-5 md:mb-6">
              Our Terms &amp; Conditions are currently being finalized to ensure they fully reflect the Zatch™ platform experience and comply with all applicable regulations.
            </p>
            <p className="text-white/50 text-sm sm:text-base leading-7 mb-6 md:mb-8">
              We are working to publish a comprehensive set of terms that cover platform usage, seller obligations, buyer rights, payment processing, dispute resolution, and more.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-white/[0.04] border border-white/[0.06] w-full sm:w-fit">
              <span className="text-white/70">Have questions? Reach out to us at</span>
              <a
                href="mailto:support@zatch.shop"
                className="text-[#cafe38] font-medium hover:underline"
                data-testid="link-support-email"
              >
                support@zatch.shop
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
