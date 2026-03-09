import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState, type FocusEvent } from "react";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";
const FACE_SIZE = 232;
const BASE_DEPTH = FACE_SIZE / 2;
const EXPLODE_DEPTH = 120;

type FaceConfig = {
  id: string;
  label: string;
  toneClass: string;
  baseRotation: string;
  spreadX: number;
  spreadY: number;
  spreadZ: number;
};

const FACES: FaceConfig[] = [
  {
    id: "front",
    label: "Live",
    toneClass: "from-[#d4ff64]/35 to-[#95c72d]/30 border-[#d4ff64]/45",
    baseRotation: "rotateY(0deg)",
    spreadX: 0,
    spreadY: 0,
    spreadZ: 130,
  },
  {
    id: "back",
    label: "Shop",
    toneClass: "from-[#a7d63f]/30 to-[#6d9824]/30 border-[#bce651]/40",
    baseRotation: "rotateY(180deg)",
    spreadX: 0,
    spreadY: 0,
    spreadZ: 130,
  },
  {
    id: "left",
    label: "Bid",
    toneClass: "from-[#7ab92a]/25 to-[#4e7f18]/30 border-[#8fcf36]/38",
    baseRotation: "rotateY(-90deg)",
    spreadX: -115,
    spreadY: -12,
    spreadZ: 80,
  },
  {
    id: "right",
    label: "Close",
    toneClass: "from-[#e8ff9c]/25 to-[#9fcb35]/30 border-[#d7ff75]/40",
    baseRotation: "rotateY(90deg)",
    spreadX: 115,
    spreadY: -12,
    spreadZ: 80,
  },
  {
    id: "top",
    label: "AI",
    toneClass: "from-[#c8f259]/25 to-[#80ac2a]/30 border-[#b8e04a]/38",
    baseRotation: "rotateX(90deg)",
    spreadX: 0,
    spreadY: -120,
    spreadZ: 80,
  },
  {
    id: "bottom",
    label: "Scale",
    toneClass: "from-[#9ec43a]/25 to-[#5f8a20]/30 border-[#a6d23d]/38",
    baseRotation: "rotateX(-90deg)",
    spreadX: 0,
    spreadY: 120,
    spreadZ: 80,
  },
];

function getFaceTransform(face: FaceConfig, exploded: boolean): string {
  const tx = exploded ? face.spreadX : 0;
  const ty = exploded ? face.spreadY : 0;
  const tz = BASE_DEPTH + (exploded ? EXPLODE_DEPTH + face.spreadZ : 0);
  return `translate3d(${tx}px, ${ty}px, 0px) ${face.baseRotation} translateZ(${tz}px)`;
}

function PlayStoreIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" aria-hidden="true">
      <path d="M47 23l266 233L47 489V23z" fill="#00D4FF" />
      <path d="M47 23l323 180-57 50L47 23z" fill="#00F076" />
      <path d="M47 489l323-180-57-50L47 489z" fill="#FF6A4D" />
      <path d="M313 253l68-50 84 47-84 47-68-44z" fill="#FFD24D" />
    </svg>
  );
}

type DesktopEcosystemCubeProps = {
  prefersReducedMotion: boolean;
  compact?: boolean;
  interactive?: boolean;
  showCenterCta?: boolean;
};

export function DesktopEcosystemCube({
  prefersReducedMotion,
  compact = false,
  interactive = true,
  showCenterCta = true,
}: DesktopEcosystemCubeProps) {
  const [isActive, setIsActive] = useState(false);
  const exploded = interactive && isActive && !prefersReducedMotion;
  const cubeControls = useAnimationControls();
  const deactivateTimeoutRef = useRef<number | null>(null);

  const clearDeactivateTimeout = () => {
    if (deactivateTimeoutRef.current === null) return;
    window.clearTimeout(deactivateTimeoutRef.current);
    deactivateTimeoutRef.current = null;
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      cubeControls.set({ rotateX: -14, rotateY: compact ? 26 : 32, scale: 1 });
      return;
    }

    cubeControls.start({
      rotateX: compact ? -15 : -17,
      rotateY: 360,
      scale: 1,
      transition: {
        rotateY: { duration: compact ? 26 : 32, repeat: Infinity, ease: "linear" },
        rotateX: { duration: 0.3, ease: "easeOut" },
        scale: { duration: 0.3, ease: "easeOut" },
      },
    });
  }, [compact, cubeControls, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      clearDeactivateTimeout();
    };
  }, []);

  const activate = () => {
    if (!interactive) return;

    clearDeactivateTimeout();
    setIsActive(true);
    if (prefersReducedMotion) return;

    cubeControls.stop();
    cubeControls.set({ rotateX: -17, rotateY: 0, scale: 1 });
    cubeControls.start({
      rotateX: -12,
      rotateY: 56,
      scale: 1.06,
      transition: { duration: 2.4, ease: [0.16, 1, 0.3, 1] },
    });
  };

  const deactivate = () => {
    if (!interactive) return;

    clearDeactivateTimeout();
    setIsActive(false);
    if (prefersReducedMotion) return;

    cubeControls.start({
      rotateX: compact ? -15 : -17,
      rotateY: 360,
      scale: 1,
      transition: {
        rotateY: { duration: compact ? 26 : 32, repeat: Infinity, ease: "linear" },
        rotateX: { duration: 0.35, ease: "easeOut" },
        scale: { duration: 0.3, ease: "easeOut" },
      },
    });
  };

  const handleBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const next = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(next)) {
      deactivate();
    }
  };

  const activateTemporarily = () => {
    if (!interactive) return;

    activate();
    if (typeof window === "undefined") return;

    clearDeactivateTimeout();
    deactivateTimeoutRef.current = window.setTimeout(() => {
      deactivate();
    }, 2600);
  };

  return (
    <div
      tabIndex={interactive ? 0 : -1}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={compact && interactive ? activateTemporarily : undefined}
      onFocusCapture={activate}
      onBlurCapture={handleBlurCapture}
      className={`relative flex w-full items-center justify-center outline-none ${
        compact
          ? "max-w-[320px] min-h-[250px] rounded-[28px]"
          : "max-w-[760px] h-full min-h-[420px] rounded-3xl md:min-h-[520px] lg:min-h-[560px]"
      }`}
      aria-label="Zatch ecosystem interactive cube"
      data-testid="ecosystem-cube-stage"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(202,254,56,0.14)_0%,_rgba(202,254,56,0.03)_48%,_transparent_78%)]" />
      </div>

      <div className={`[perspective:1500px] relative ${compact ? "h-[260px] w-[260px]" : "h-[360px] w-[360px] md:h-[430px] md:w-[430px] lg:h-[480px] lg:w-[480px]"}`}>
        <div className="absolute inset-0 origin-center" style={compact ? { scale: 0.68 } : undefined}>
          <motion.div
            initial={{ rotateX: compact ? -15 : -17, rotateY: 0, scale: 1 }}
            animate={cubeControls}
            className="absolute left-1/2 top-1/2 h-[232px] w-[232px] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
          >
            {FACES.map((face, index) => (
              <motion.div
                key={face.id}
                className={`absolute inset-0 rounded-3xl border bg-gradient-to-br ${face.toneClass} backdrop-blur-sm shadow-[0_0_34px_rgba(202,254,56,0.22)]`}
                style={{ transform: getFaceTransform(face, exploded), transitionDelay: `${index * 30}ms` }}
                animate={{ opacity: exploded ? 1 : 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(140deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_55%)]" />
                <div className="absolute left-4 top-4 text-[11px] uppercase tracking-[0.28em] text-[#edffb8]/85">
                  {face.label}
                </div>
                <div className="absolute right-4 bottom-4 h-3 w-3 rounded-full bg-[#cafe38]/70 shadow-[0_0_14px_rgba(202,254,56,0.85)]" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {showCenterCta ? (
          <motion.a
            href={PLAYSTORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isActive ? 0 : -1}
            animate={
              isActive
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.35, filter: "blur(8px)" }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isActive ? "pointer-events-auto" : "pointer-events-none"} ${
              compact
                ? "inline-flex h-14 min-w-[190px] items-center gap-3 whitespace-nowrap rounded-[22px] border border-black/8 bg-[#cafe38] px-4 text-black shadow-[0_0_30px_rgba(202,254,56,0.32)]"
                : "inline-flex h-11 items-center gap-2 rounded-full bg-[#cafe38] px-7 text-sm font-bold text-black shadow-[0_0_24px_rgba(202,254,56,0.4)]"
            }`}
            style={{ transformStyle: "preserve-3d" }}
            data-testid="button-download-android"
          >
            {compact ? (
              <>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <PlayStoreIcon size={20} />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-[13px] font-extrabold tracking-[-0.01em]">Download App</span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/65">
                    Play Store
                  </span>
                </span>
              </>
            ) : (
              <>
                <PlayStoreIcon />
                Download for Android
              </>
            )}
          </motion.a>
        ) : null}
      </div>
    </div>
  );
}
