import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Bolt, Download } from "lucide-react";
import zatchLogo from "@/assets/zatch-logo.png";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";

type CompareCard = {
  id: string;
  title: string;
  summary: string;
  details: { label: string; value: string }[];
  tone: "old" | "zatch";
};

const COMPARE_CARDS: CompareCard[] = [
  {
    id: "old-way",
    title: "Old Way",
    summary: "Manual conversations break when buyer volume increases.",
    details: [
      { label: "Leads", value: "Scattered in DMs" },
      { label: "Tracking", value: "Manual follow-up" },
      { label: "Outcome", value: "No clear close" },
    ],
    tone: "old",
  },
  {
    id: "zatch-way",
    title: "Zatch Way",
    summary: "One structured live flow from first message to final close.",
    details: [
      { label: "Leads", value: "One live system" },
      { label: "Tracking", value: "Real-time updates" },
      { label: "Outcome", value: "Clearer path to close" },
    ],
    tone: "zatch",
  },
];

function cardToneClasses(tone: CompareCard["tone"]) {
  if (tone === "old") {
    return {
      root: "border-rose-500/18 bg-[#120507]",
      icon: "border-rose-400/25 bg-rose-500/10 text-rose-200",
      title: "text-rose-100",
      summary: "text-white/64",
      detailBorder: "border-rose-400/12",
      detailLabel: "text-rose-100/40",
      detailValue: "text-rose-50",
    };
  }

  return {
    root: "border-[#cafe38]/20 bg-[#081006]",
    icon: "border-[#cafe38]/26 bg-[#cafe38]/10 text-[#dcff88]",
    title: "text-[#efffb7]",
    summary: "text-white/66",
    detailBorder: "border-[#cafe38]/12",
    detailLabel: "text-[#efffb7]/40",
    detailValue: "text-[#f4ffc9]",
  };
}

export function DealEngineMobile({ onStartSelling }: { onStartSelling?: () => void }) {
  return (
    <section id="sellers" className="relative overflow-hidden bg-[#030303] py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-14 right-[-68px] h-48 w-48 rounded-full bg-[#cafe38]/8 blur-[90px]" />
        <div className="absolute bottom-[-90px] left-[-100px] h-52 w-52 rounded-full bg-rose-500/8 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-lg px-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-[#cafe38]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#cafe38]" data-testid="text-sellers-tag">
              For Sellers
            </span>
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.42, delay: 0.05 }}
            className="text-3xl font-bold font-display leading-[0.95] tracking-tight"
            data-testid="text-sellers-heading"
          >
            <span className="text-white">Your DMs Are Not a </span>
            <span className="bg-gradient-to-r from-[#cafe38] via-[#dfff88] to-[#cafe38]/55 bg-clip-text text-transparent">
              Sales System.
            </span>
          </motion.h3>
        </motion.div>

        <div className="mb-8 space-y-4">
          {COMPARE_CARDS.map((card, index) => {
            const tone = cardToneClasses(card.tone);
            const Icon = card.tone === "old" ? AlertTriangle : Bolt;
            const showLogo = card.tone === "zatch";

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.08 + index * 0.1 }}
                className={`rounded-[24px] border px-5 py-5 shadow-[0_18px_36px_rgba(0,0,0,0.22)] ${tone.root}`}
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {showLogo ? (
                      <img src={zatchLogo} alt="Zatch" className="h-8 w-8 shrink-0 rounded-lg object-contain" />
                    ) : (
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border ${tone.icon}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className={`text-base font-semibold ${tone.title}`}>{card.title}</p>
                      <p className={`mt-1 text-[13px] leading-5 ${tone.summary}`}>{card.summary}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-0.5">
                  {card.details.map((detail, detailIndex) => (
                    <div
                      key={detail.label}
                      className={`flex items-center justify-between gap-4 py-3 ${detailIndex < card.details.length - 1 ? `border-b ${tone.detailBorder}` : ""}`}
                    >
                      <span className={`text-[11px] font-medium uppercase tracking-[0.16em] ${tone.detailLabel}`}>
                        {detail.label}
                      </span>
                      <span className={`text-right text-[13px] font-medium ${tone.detailValue}`}>{detail.value}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.38, delay: 0.1 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={onStartSelling}
            className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#cafe38] text-sm font-bold text-black shadow-[0_10px_24px_rgba(202,254,56,0.2)]"
            data-testid="button-start-selling-mobile"
          >
            <span>Start Selling</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <a
            href={PLAYSTORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#cafe38]/20 bg-[#0b1208] text-sm font-bold text-[#e7ff9d]"
            data-testid="link-download-zatch-mobile"
          >
            <Download className="h-4 w-4" />
            <span>Download Zatch</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
