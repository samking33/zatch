import { useEffect, useMemo, useState } from "react";

type DeviceCapabilities = {
  isMobileViewport: boolean;
  isFinePointer: boolean;
  prefersReducedMotion: boolean;
};

function readCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return {
      isMobileViewport: false,
      isFinePointer: true,
      prefersReducedMotion: false,
    };
  }

  return {
    isMobileViewport: window.innerWidth < 768,
    isFinePointer: window.matchMedia("(pointer: fine)").matches,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>(() => readCapabilities());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setCaps(readCapabilities());
    const subscribe = (query: MediaQueryList) => {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
      }
      query.addListener(update);
      return () => query.removeListener(update);
    };

    window.addEventListener("resize", update, { passive: true });
    const unsubscribeFinePointer = subscribe(finePointerQuery);
    const unsubscribeReducedMotion = subscribe(reducedMotionQuery);

    return () => {
      window.removeEventListener("resize", update);
      unsubscribeFinePointer();
      unsubscribeReducedMotion();
    };
  }, []);

  return useMemo(() => caps, [caps]);
}
