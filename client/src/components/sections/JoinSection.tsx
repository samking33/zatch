import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShoppingCart, Store } from "lucide-react";

interface JoinSectionProps {
  onJoinBuyer?: () => void;
}

export function JoinSection({ onJoinBuyer }: JoinSectionProps) {
  return (
    <section className="relative py-20 md:py-28 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(202,254,56,0.04)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white mb-4">
            Ready to <span className="text-primary">Join?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Whether you want to discover deals or sell your products - there's a place for you on Zatch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            type="button"
            onClick={onJoinBuyer}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-semibold text-lg cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(202,254,56,0.3)]"
            data-testid="button-join-buyer"
          >
            <ShoppingCart className="w-5 h-5" />
            Join as Buyer
          </motion.button>

          <Link href="/join/seller">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold text-lg cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(202,254,56,0.15)] hover:bg-primary/5"
            >
              <Store className="w-5 h-5" />
              Join as Seller
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
