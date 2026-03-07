const PENDING_SECTION_KEY = "zatch:pending-section";
const DEFAULT_OFFSET = 80;

export function setPendingSection(target: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(PENDING_SECTION_KEY, target);
}

export function clearPendingSection() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(PENDING_SECTION_KEY);
}

export function getPendingSection() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(PENDING_SECTION_KEY);
}

export function scrollToSection(target: string, options?: ScrollToOptions) {
  if (typeof window === "undefined") return false;

  const el = document.getElementById(target);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - DEFAULT_OFFSET;
  window.scrollTo({ top, behavior: "smooth", ...options });
  return true;
}

export function flushPendingSection() {
  const target = getPendingSection();
  if (!target) return false;

  const didScroll = scrollToSection(target);
  if (didScroll) {
    clearPendingSection();
  }

  return didScroll;
}
