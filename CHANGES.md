# Changes Made — May 14, 2025

---

## 1. SEO (Search Engine Optimisation)

### Fixed the biggest issue — missing title tag
The website had no `<title>` tag at all. Google uses this as its #1 ranking signal. Added a proper, keyword-rich title to every page.

### Added meta descriptions
Every page now has a unique meta description — the text that shows up under your link in Google search results. Before, none existed.

### Fixed Open Graph image
The OG image (used for link previews on WhatsApp, Twitter, iMessage etc.) was pointing to a file that didn't work properly. Fixed it to use the correct `opengraph.jpg`.

### Per-page titles and descriptions
Created a `useSEO` hook so each page (Home, About, Download, Join as Seller, Privacy, Terms, Returns, Shipping) has its own unique title and description instead of showing the same thing for every page.

### Structured data (JSON-LD schemas)
Added machine-readable data that Google uses for rich results:
- **Organization** — tells Google who Zatch is (company name, co-founders, contact)
- **WebSite** — registers the site with a search action
- **MobileApplication** — tells Google this is a downloadable app (helps with app-related searches)
- **HowTo** — step-by-step guide on how Zatching works (Google can show this as a featured snippet)
- **ItemList** — lists buyer and seller features in a structured way
- **FAQPage** — all 10 FAQs are now structured data, which can show as expanded Q&A directly in Google search results
- **SpeakableSpecification** — marks content for voice assistants like Siri and Google Assistant

### Sitemap
Created `sitemap.xml` listing all 8 pages of the website with priority levels. Submit this to Google Search Console so Google finds and indexes all pages faster.

### robots.txt
Created a `robots.txt` file telling search engines which pages to crawl and where the sitemap is.

### Fixed the core React SPA problem
This is the most important technical fix. The website is built with React, which means when Google (or any crawler) visits `/about` or `/download`, the server was sending back the homepage title and description for every single URL — because React builds everything into one HTML file.

Fixed this in the server: now before sending any page, the server automatically injects the correct title, description, and meta tags for that specific URL. So `/about` gets the About page meta, `/download` gets the Download page meta — right from the first byte, before any JavaScript runs.

### HTTP headers
Added proper caching headers for assets (images, videos, JS bundles) and security headers that Google considers as trust signals.

---

## 2. GEO (Generative Engine Optimisation) & AI Crawlers

This is about making Zatch show up when people ask AI tools like ChatGPT, Perplexity, Google AI Overviews, and others about live shopping apps in India.

### llms.txt
Created a new file at `zatch.shop/llms.txt` — this is the emerging standard for AI systems. When ChatGPT, Perplexity, Claude, or Gemini crawl your site, they read this file to understand who you are. It contains:
- Full explanation of what Zatch is and what problem it solves
- How Zatching works, step by step
- Comparison table vs Instagram and traditional marketplaces
- Co-founder bios
- All app download links
- Full FAQ answers

When someone asks any AI assistant *"what is a live shopping app in India"* or *"best bargain shopping app India"* — this is the content that gets read and cited.

### robots.txt — allowed all AI crawlers
Updated robots.txt with explicit allow rules for every major AI crawler:
- GPTBot, ChatGPT-User (OpenAI / ChatGPT)
- ClaudeBot, anthropic-ai (Anthropic / Claude)
- PerplexityBot (Perplexity AI)
- meta-externalagent (Meta AI)
- Applebot (Apple Intelligence / Siri)
- Amazonbot (Alexa)
- CCBot (Common Crawl — used to train most open-source AI models)
- And more

Without these rules, many AI bots default to skipping your content entirely.

### Noscript content block
Since the website is built with React (JavaScript), AI crawlers that don't run JavaScript were seeing a completely blank page. Added a full block of semantic HTML inside a `<noscript>` tag — it contains all the key content (what Zatch is, how it works, FAQ, download links) in plain HTML that any crawler can read without needing to run JavaScript.

### PWA Manifest
Added `site.webmanifest` — a small file that tells browsers and Google that the website is a proper web app. Small but meaningful quality signal.

### security.txt
Added `.well-known/security.txt` — a standard file used by security researchers and crawlers to verify a site is legitimately operated. Contributes to domain trust.

---

## 3. Hero Section Performance Fix

### Problem
The background image grid in the hero section (all those product category thumbnails) was using `Promise.all` — meaning it waited for every single image to finish loading before showing anything. On desktop that's 54 PNG files. The grid was completely empty until the very last image loaded.

### Fix — Progressive loading
- The grid now shows placeholder cells instantly (dark background) so the layout appears at zero load time
- First 12 images load as a priority batch and appear quickly
- Remaining images load in batches of 8 and fill in progressively
- Random tile positions are now stable — computed once and stored, so tiles don't jump around as new images arrive

---

## Files Created
- `client/public/llms.txt`
- `client/public/robots.txt`
- `client/public/sitemap.xml`
- `client/public/site.webmanifest`
- `client/public/.well-known/security.txt`
- `client/src/lib/seo.ts`

## Files Modified
- `client/index.html`
- `server/static.ts`
- `client/src/components/sections/KineticHero.tsx`
- `client/src/components/sections/FAQ.tsx`
- `client/src/pages/home.tsx`
- `client/src/pages/about.tsx`
- `client/src/pages/download.tsx`
- `client/src/pages/join-seller.tsx`
- `client/src/pages/privacy.tsx`
- `client/src/pages/terms.tsx`
- `client/src/pages/returns.tsx`
- `client/src/pages/shipping.tsx`
