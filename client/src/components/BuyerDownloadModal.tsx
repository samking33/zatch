import { AnimatePresence, motion } from "framer-motion";
import { X, Download } from "lucide-react";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

interface BuyerDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLAYSTORE_URL =
  "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";
const QR_IMAGE_URL = "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://zatch.shop";

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
                  ? "Install the app to start shopping live."
                  : "Scan this QR code to install the app and start shopping live."}
              </p>

              {!isMobileViewport ? (
                <div className="mx-auto mt-6 w-[190px] rounded-2xl bg-white p-3 shadow-2xl">
                  <img
                    src={QR_IMAGE_URL}
                    alt="Download Zatch QR code"
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              ) : null}

              <a
                href={PLAYSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mx-auto inline-flex items-center gap-2 rounded-lg border border-[#cafe38]/50 bg-[#cafe38]/18 font-bold text-[#d8ff5c] transition-colors hover:bg-[#cafe38]/28 ${
                  isMobileViewport
                    ? "mt-6 min-w-[220px] justify-center px-5 py-3 text-sm"
                    : "mt-5 px-4 py-2 text-xs"
                }`}
                data-testid="button-buyer-download-app"
              >
                <Download className="h-3.5 w-3.5" />
                Download App
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
