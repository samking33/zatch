import { useEffect } from "react";

const BASE_URL = "https://zatch.shop";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

function setMeta(selector: string, attr: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrValue] = attr.split("=");
    el.setAttribute(attrName, attrValue ?? attrName);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function upsertJsonLd(data: object | object[], id: string) {
  let el = document.querySelector<HTMLScriptElement>(`script[data-seo-jsonld="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-seo-jsonld", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.querySelector(`script[data-seo-jsonld="${id}"]`)?.remove();
}

export function useSEO({ title, description, canonical, ogImage, noindex, jsonLd }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes("Zatch") ? title : `${title} | Zatch`;
    document.title = fullTitle;

    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    const imageUrl = ogImage ?? DEFAULT_OG_IMAGE;
    const robots = noindex
      ? "noindex, nofollow"
      : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

    setMeta('meta[name="description"]', "name=description", description);
    setMeta('meta[name="robots"]', "name=robots", robots);
    setMeta('meta[name="googlebot"]', "name=googlebot", robots);

    setMeta('meta[property="og:title"]', "property=og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property=og:description", description);
    setMeta('meta[property="og:url"]', "property=og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property=og:image", imageUrl);

    setMeta('meta[name="twitter:title"]', "name=twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name=twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name=twitter:image", imageUrl);

    setCanonical(canonicalUrl);

    if (jsonLd) {
      upsertJsonLd(jsonLd, "page");
    } else {
      removeJsonLd("page");
    }

    return () => {
      removeJsonLd("page");
    };
  }, [title, description, canonical, ogImage, noindex]);
}
