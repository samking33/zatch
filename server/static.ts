import express, { type Express, type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";

// ─── Per-route meta for server-side injection ──────────────────────────────────
// This fixes the core React SPA SEO problem: every route gets correct title &
// description in the initial HTML response, before any JavaScript runs.
// Crawlers that don't render JS (and even those that do) see the right meta
// on the very first byte — no waiting for React to hydrate.

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "Zatch - India's First Live Bargain Marketplace | Live Shopping App",
    description:
      "Zatch is India's first live bargain marketplace. Watch sellers demo products live, swipe through short shopping videos, and negotiate prices in real time. Download free on iOS & Android.",
    canonical: "https://zatch.shop",
  },
  "/about": {
    title: "About Zatch | Building India's Live Commerce Movement",
    description:
      "Learn how Zatch is revolutionizing online shopping in India with live streaming, short video commerce, and real-time bargaining. Meet the founding team behind India's first live bargain marketplace.",
    canonical: "https://zatch.shop/about",
  },
  "/download": {
    title: "Download Zatch App | Live Shopping on iOS & Android",
    description:
      "Download Zatch free on iPhone or Android. India's first live bargain marketplace — watch sellers go live, discover products through short videos, and negotiate prices instantly.",
    canonical: "https://zatch.shop/download",
  },
  "/join/seller": {
    title: "Sell on Zatch | Start Live Selling in India",
    description:
      "Join Zatch as a seller. Go live, upload short product videos, and close deals with real-time bargaining. No website needed. Built-in payments, order management, and customer reach.",
    canonical: "https://zatch.shop/join/seller",
  },
  "/join/buyer": {
    title: "Download Zatch App | Live Shopping on iOS & Android",
    description:
      "Download Zatch free on iPhone or Android. India's first live bargain marketplace — watch sellers go live, discover products through short videos, and negotiate prices instantly.",
    canonical: "https://zatch.shop/download",
  },
  "/privacy": {
    title: "Privacy Policy | Zatch",
    description:
      "Read Zatch's privacy policy. Learn how we collect, use, and protect your personal data on India's first live bargain marketplace.",
    canonical: "https://zatch.shop/privacy",
  },
  "/terms": {
    title: "Terms & Conditions | Zatch",
    description:
      "Read Zatch's terms and conditions. Understand the rules governing use of India's first live bargain marketplace for buyers and sellers.",
    canonical: "https://zatch.shop/terms",
  },
  "/returns": {
    title: "Return & Refund Policy | Zatch",
    description:
      "Zatch's return and refund policy. Learn how returns, refunds, and disputes are handled on India's live bargain marketplace.",
    canonical: "https://zatch.shop/returns",
  },
  "/shipping": {
    title: "Shipping Policy | Zatch",
    description:
      "Zatch's shipping policy. Learn about delivery timelines, shipping partners, and order tracking on India's live bargain marketplace.",
    canonical: "https://zatch.shop/shipping",
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(html: string, meta: RouteMeta): string {
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonical);

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`,
  );

  // Replace meta description
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${desc}$2`,
  );

  // Replace canonical
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
    `$1${canonical}$2`,
  );

  // Replace OG title
  html = html.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    `$1${title}$2`,
  );

  // Replace OG description
  html = html.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${desc}$2`,
  );

  // Replace OG url
  html = html.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
    `$1${canonical}$2`,
  );

  // Replace Twitter title
  html = html.replace(
    /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
    `$1${title}$2`,
  );

  // Replace Twitter description
  html = html.replace(
    /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
    `$1${desc}$2`,
  );

  return html;
}

// ─── Middleware ────────────────────────────────────────────────────────────────

function seoHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Cache the index.html template in memory (read once at startup)
  const indexPath = path.resolve(distPath, "index.html");
  let indexHtml = fs.readFileSync(indexPath, "utf-8");

  app.use(seoHeaders);

  // Long-lived cache for hashed assets (JS/CSS bundles)
  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
    }),
  );

  // Static files with appropriate caching
  app.use(
    express.static(distPath, {
      setHeaders(res, filePath) {
        if (/\.(mp4|webm|ogg)$/.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=2592000");
        } else if (/\.(png|jpg|jpeg|webp|svg|ico|gif)$/.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=2592000");
        } else if (/\.(txt|xml|webmanifest)$/.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=86400");
        }
      },
    }),
  );

  // SPA fallback — inject per-route meta before sending index.html
  app.use("/{*path}", (req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    const routePath = req.path || "/";
    const meta = ROUTE_META[routePath] ?? ROUTE_META["/"];
    const html = injectMeta(indexHtml, meta);

    res.send(html);
  });
}
