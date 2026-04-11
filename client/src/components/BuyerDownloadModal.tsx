import { AnimatePresence, motion } from "framer-motion";
import { Download, Play, X } from "lucide-react";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { APP_STORE_URL, DOWNLOAD_PAGE_QR_URL, PLAYSTORE_URL } from "@/lib/app-links";

interface BuyerDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BuyerDownloadModal({ isOpen, onClose }: BuyerDownloadModalProps) {
  const { isMobileViewport } = useDeviceCapabilities();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
            className="fixed left-1/2 top-1/2 z-[9999] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative rounded-3xl border border-white/12 bg-[#0a0a0a] p-7 text-center shadow-[0_0_80px_rgba(199,240,79,0.1)]">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
                data-testid="button-close-buyer-download-modal"
              >
                <X className="h-4 w-4 text-white/70" />
              </button>

              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#cafe38]/75">
                For Buyers
              </p>
              <h3 className="mt-3 text-2xl font-bold font-display text-white">
                Download Zatch App
              </h3>
              <p className="mt-2 text-sm text-white/45">
                {isMobileViewport
                  ? "Choose your store and start shopping live."
                  : "Scan this QR code or choose a store below to install the app and start shopping live."}
              </p>

              {!isMobileViewport ? (
                <div className="mx-auto mt-6 w-[190px] rounded-2xl bg-white p-3 shadow-2xl">
                  <img
                    src={DOWNLOAD_PAGE_QR_URL}
                    alt="Download Zatch QR code"
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              ) : null}

              <div className={`mt-6 grid gap-3 ${isMobileViewport ? "grid-cols-1" : "grid-cols-2"}`}>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-lg border border-[#cafe38]/50 bg-[#cafe38]/18 font-bold text-[#d8ff5c] transition-colors hover:bg-[#cafe38]/28 ${
                    isMobileViewport ? "px-5 py-3 text-sm" : "px-4 py-2 text-xs"
                  }`}
                  data-testid="button-buyer-download-app"
                >
                  <Download className="h-3.5 w-3.5" />
                  App Store
                </a>
                <a
                  href={PLAYSTORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 font-bold text-white/75 transition-colors hover:bg-white/10 ${
                    isMobileViewport ? "px-5 py-3 text-sm" : "px-4 py-2 text-xs"
                  }`}
                  data-testid="button-buyer-download-android"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Google Play
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
