import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

type LazySectionProps = {
  loader: () => Promise<ComponentType<any>>;
  componentProps?: Record<string, unknown>;
  fallback?: ReactNode;
  rootMargin?: string;
  once?: boolean;
  className?: string;
};

export function LazySection({
  loader,
  componentProps,
  fallback = null,
  rootMargin = "300px 0px",
  once = true,
  className,
}: LazySectionProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [LoadedComponent, setLoadedComponent] = useState<ComponentType<any> | null>(null);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);
        if (!isIntersecting) return;
        setShouldLoad(true);
        if (once) observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  useEffect(() => {
    if (!shouldLoad || LoadedComponent) return;
    let alive = true;

    loader()
      .then((component) => {
        if (!alive) return;
        setLoadedComponent(() => component);
      })
      .catch(() => {
        if (!alive) return;
        setLoadedComponent(() => () => null);
      });

    return () => {
      alive = false;
    };
  }, [LoadedComponent, loader, shouldLoad]);

  return (
    <div ref={hostRef} className={className}>
      {LoadedComponent ? <LoadedComponent {...componentProps} /> : fallback}
    </div>
  );
}
