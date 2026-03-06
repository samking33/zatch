import { motion } from "framer-motion";
import { AlertTriangle, Bolt, Gauge, RadioTower, Target } from "lucide-react";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";

type CompareCard = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  points: string[];
  metrics: { label: string; value: string }[];
  tone: "old" | "zatch";
};

const COMPARE_CARDS: CompareCard[] = [
  {
    id: "old-way",
    title: "Old Way",
    tag: "Legacy",
    summary: "Manual conversations break when buyer volume increases.",
    points: [
      "Leads scattered across DM threads",
      "Follow-ups depend on memory",
      "No clear close or status visibility",
    ],
    metrics: [
      { label: "Speed", value: "Slow" },
      { label: "Tracking", value: "Manual" },
      { label: "Close Rate", value: "Unclear" },
    ],
    tone: "old",
  },
  {
    id: "zatch-way",
    title: "Zatch Way",
    tag: "System",
    summary: "One structured live flow from first message to final close.",
    points: [
      "Buyer intent stays in one system",
      "Negotiations are tracked in real time",
      "Every deal path ends with clarity",
    ],
    metrics: [
      { label: "Speed", value: "Fast" },
      { label: "Tracking", value: "Live" },
      { label: "Close Rate", value: "Higher" },
    ],
    tone: "zatch",
  },
];

function cardToneClasses(tone: CompareCard["tone"]) {
  if (tone === "old") {
    return {
      root: "border-rose-500/25 bg-[linear-gradient(150deg,rgba(31,10,13,0.95),rgba(16,6,8,0.92))]",
      icon: "text-rose-300 border-rose-400/30 bg-rose-500/10",
      title: "text-rose-200",
      chip: "border-rose-500/20 bg-rose-950/35 text-rose-100",
      dot: "bg-rose-300/80",
      meta: "text-rose-200/75",
    };
  }

  return {
    root: "border-[#cafe38]/30 bg-[linear-gradient(150deg,rgba(12,33,11,0.95),rgba(6,17,7,0.92))]",
    icon: "text-[#ddff89] border-[#cafe38]/35 bg-[#cafe38]/12",
    title: "text-[#e7ff9d]",
    chip: "border-[#cafe38]/25 bg-[#cafe38]/10 text-[#eaffaa]",
    dot: "bg-[#cafe38]",
    meta: "text-[#d8ff84]/80",
  };
}

export function DealEngineMobile({ onStartSelling }: { onStartSelling?: () => void }) {
  return (
    <section id="sellers" className="py-16 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 right-[-68px] h-56 w-56 rounded-full bg-[#cafe38]/10 blur-[85px]" />
        <div className="absolute bottom-[-88px] left-[-110px] h-64 w-64 rounded-full bg-rose-500/10 blur-[110px]" />
      </div>

      <div className="container mx-auto px-5 max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-[#cafe38]" />
          <span className="text-[11px] font-bold text-[#cafe38] tracking-[0.4em] uppercase" data-testid="text-sellers-tag">
            For Sellers
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.42, delay: 0.05 }}
          className="text-3xl font-bold font-display tracking-tight leading-[0.95] mb-8"
          data-testid="text-sellers-heading"
        >
          <span className="text-white">Your DMs Are Not a </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cafe38] to-[#cafe38]/50">Sales System.</span>
        </motion.h3>

        <div className="space-y-4 mb-8">
          {COMPARE_CARDS.map((card, index) => {
            const tone = cardToneClasses(card.tone);
            const Icon = card.tone === "old" ? AlertTriangle : Bolt;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.08 + index * 0.1 }}
                className={`rounded-2xl border p-4 shadow-[0_20px_40px_rgba(0,0,0,0.28)] ${tone.root}`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-full border flex items-center justify-center ${tone.icon}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className={`text-sm font-semibold ${tone.title}`}>{card.title}</span>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full border border-white/15 text-white/55 uppercase tracking-[0.16em]">
                    {card.tag}
                  </span>
                </div>

                <p className="text-[12px] leading-relaxed text-white/75 mb-3">{card.summary}</p>

                <ul className="space-y-2 mb-3">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[11px] leading-relaxed text-white/70">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${tone.dot}`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-3 gap-2">
                  {card.metrics.map((metric) => (
                    <div key={metric.label} className={`rounded-lg border px-2 py-2 ${tone.chip}`}>
                      <p className="text-[9px] uppercase tracking-wide text-white/60">{metric.label}</p>
                      <p className="text-[11px] font-semibold mt-0.5">{metric.value}</p>
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
            className="w-full h-12 rounded-xl bg-[#cafe38] text-black font-bold text-sm shadow-[0_10px_24px_rgba(202,254,56,0.22)]"
            data-testid="button-start-selling-mobile"
          >
            Start Selling
          </button>
          <a
            href={PLAYSTORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-xl bg-[#0b1507] border border-[#cafe38]/35 text-[#dfff88] font-bold text-sm flex items-center justify-center gap-2"
            data-testid="link-download-zatch-mobile"
          >
            <Gauge className="w-4 h-4" />
            Download Zatch
            <RadioTower className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="flex items-center justify-center gap-4 mt-6 text-[10px] text-white/35"
        >
          <span className="flex items-center gap-1.5">
            <Target className="w-3 h-3 text-[#cafe38]/70" />
            Clearer deal flow
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span className="text-white/45">Built for live selling</span>
        </motion.div>
      </div>
    </section>
  );
}
