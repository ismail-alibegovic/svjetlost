# Svjetlost Sarajevo — website redesign (concept)

> **Unofficial redesign proposal.** Not the official website of Specijalna bolnica za oftalmologiju Svjetlost Sarajevo.
> Every route is served with `noindex, nofollow` and `robots.txt` disallows crawling until the clinic authorises production use.

A bilingual (Bosnian primary, English) Next.js site for an ophthalmology clinic, built from verified content on
[svjetlost.ba](https://svjetlost.ba/).

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000 → redirects to /bs
npm run build && npm start
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build && npx next start -p 3200 &
BASE_URL=http://localhost:3200 npm run test:e2e
```

Set `NEXT_PUBLIC_SITE_URL` to the deployment URL so canonical/hreflang/OG URLs are correct.

## Stack

Next.js 16 (App Router, Turbopack, all pages statically prerendered) · React 19 · TypeScript strict · Tailwind CSS v4 ·
`motion` (Framer Motion) · next-intl 4 · React Hook Form + Zod · Lucide · Playwright + axe-core.

> Next.js 16 renamed `middleware` to `proxy` — locale routing lives in `src/proxy.ts`.

## Architecture

```
src/
  app/[locale]/…            pages (localized routes; BS: /bs/usluge, EN: /en/services …)
  app/api/appointment-request  MOCK endpoint (validates, stores nothing)
  app/sitemap.ts, robots.ts
  components/
    layout/                 Header (top bar, mega menu, mobile menu, language switcher), Footer, MobileBookBar
    sections/               Hero, TrustBar, homepage sections, PageHero
    interactive/            VisionSimulator, EyeAnatomy, TechStory, ServiceExplorer, LocationSelector, Stories, Accordion
    booking/                BookingProvider (context), BookingModal (6-step, lazy-loaded), BookButton
    doctors/                DoctorCard, DoctorDirectory
    accessibility/          A11yPanel (text size, contrast, motion), CookieNotice
    ui/                     Button, Reveal, SectionHeader, Breadcrumbs, ScopeTag, Logo
  content/                  typed business content — services, doctors, technology, clinic, stories, faq, articles, images
  messages/                 bs.json / en.json UI strings
  i18n/                     next-intl routing, navigation, request config
  lib/                      seo (metadata + hreflang), structured-data, booking schema, utils, storage hook
  types/content.ts          content model (CMS-ready)
public/images/              optimised WebP assets (concept/, clinic/, doctors/, technology/, stories/, news/)
tests/e2e/                  Playwright: crawl + axe + interactions
docs/                       content verification and production-readiness notes
```

Content is separated from presentation: every service, doctor, device, location, story and FAQ is a typed object with
`{ bs, en }` strings and source URLs. Each fact that could be ambiguous carries a `scope` (`"sarajevo"` vs `"group"`)
that is rendered as a visible tag. Swapping these modules for a headless CMS requires no component changes.

## Signature interactions

- **Vision simulator** — Sarajevo photo with a draggable, keyboard-operable (`role="slider"`) comparison divider. Each condition
  uses different processing: depth-graded blur (myopia/hyperopia), anisotropic SVG blur + ghost image (astigmatism), haze,
  yellowing, contrast loss and glare (cataract). Clearly labelled as illustrative.
- **Eye anatomy** — SVG cross-section with five accessible hotspots and pointer-driven depth tilt. A 3D GLB model was not used
  because no licensed, medically reviewed model was available (the brief's specified fallback).
- **Technology story** — sticky, scroll-driven device storytelling.
- **Appointment request** — 6 steps (location → service → doctor → preferred date/time → contact → review), Zod validation,
  error summary, consent; clearly marked as a demo request, not a confirmed appointment; no availability is faked.

## Accessibility & motion

WCAG 2.2 AA target: semantic landmarks, skip link, one `h1` per page, visible focus, native `<dialog>` for the booking modal,
ARIA radiogroups/tabs/slider, keyboard support throughout, `prefers-reduced-motion` honoured (plus a manual toggle).
Headline and CTAs are rendered without entrance animation so they are available immediately.

## Results (local production build)

| Check | Result |
|---|---|
| TypeScript (strict) / ESLint | pass (1 informational React Compiler note on React Hook Form `watch`) |
| Production build | pass — 104 static pages |
| Playwright | 12/12 pass — crawl of 78 unique URLs (BS+EN): no broken links/images, no console errors, **0 serious/critical axe violations** |
| Lighthouse desktop | Performance 99 · Accessibility 100 · Best Practices 100 |
| Lighthouse mobile (applied DevTools throttling) | Performance 86–89 · LCP 2.5–2.8 s · CLS 0 |
| Lighthouse mobile (simulated) | Performance 79–86 (observed LCP ≈ 0.2–0.3 s; the simulation attributes hydration JS to LCP) |
| Lighthouse SEO | 61 — **intentional**: `noindex` (is-crawlable) and canonical pointing to the configured production domain. Remove `noindex` at launch to reach ~100. |

See [`docs/CONTENT-VERIFICATION.md`](docs/CONTENT-VERIFICATION.md) and [`docs/PRODUCTION-CHECKLIST.md`](docs/PRODUCTION-CHECKLIST.md).
