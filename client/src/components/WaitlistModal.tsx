import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: "buyer" | "seller";
}

export function WaitlistModal({ isOpen, onClose, defaultRole = "buyer" }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>(defaultRole);
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState(0);

  const mutation = useMutation({
    mutationFn: async (data: { email: string; name: string; role: string }) => {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      return res.json();
    },
    onSuccess: (data) => {
      setPosition(data.position);
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutation.mutate({ email, name, role });
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail("");
    setName("");
    mutation.reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md z-[9999]"
          >
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_rgba(199,240,79,0.1)]">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                data-testid="button-close-waitlist"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display" data-testid="text-waitlist-title">Get Early Access</h3>
                    <p className="text-white/50 mt-2 text-sm">Be among the first to experience India's live bargain marketplace.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                        data-testid="input-email"
                      />
                    </div>

                    <div className="flex gap-2">
                      {["buyer", "seller"].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`flex-1 h-10 rounded-xl text-sm font-medium transition-all duration-300 border ${role === r ? "bg-primary/20 border-primary/50 text-primary" : "bg-white/5 border-white/10 text-white/40 hover:text-white/60"}`}
                          data-testid={`button-role-${r}`}
                        >
                          I'm a {r === "buyer" ? "Buyer" : "Seller"}
                        </button>
                      ))}
                    </div>

                    <Button
                      type="submit"
                      disabled={mutation.isPending || !email}
                      className="w-full h-12 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      data-testid="button-submit-waitlist"
                    >
                      {mutation.isPending ? "Joining..." : "Join the Waitlist"}
                      {!mutation.isPending && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>

                    {mutation.isError && (
                      <p className="text-red-400 text-xs text-center" data-testid="text-waitlist-error">{mutation.error.message}</p>
                    )}
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 border border-primary/30">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display mb-2" data-testid="text-waitlist-success">You're In!</h3>
                  <p className="text-white/50 text-sm mb-2">You're #{position} on the waitlist.</p>
                  <p className="text-white/30 text-xs">We'll notify you when Zatch launches.</p>
                  <Button
                    onClick={handleClose}
                    className="mt-6 bg-white/10 text-white hover:bg-white/20 rounded-xl"
                    data-testid="button-close-success"
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
