# Requirements before production launch

**Authorisation & legal**
- Written authorisation from the clinic; confirm rights to logo, photography and testimonials (renewed patient consent).
- Official privacy policy and cookie policy compliant with BiH data-protection law; DPA with any processor.
- Medical/legal review of all clinical content, the vision simulator copy and the anatomy illustration.

**Booking backend** (currently a mock that stores nothing)
- Approved backend or integration with the clinic's scheduling/CRM; TLS, encryption at rest, access control, retention policy,
  audit logging, rate limiting and spam protection (e.g. Turnstile/hCaptcha). Never log form payloads.
- Confirmation flow by phone/e-mail; keep the "request ≠ confirmed appointment" wording.

**Content**
- Resolve the open points in `CONTENT-VERIFICATION.md`; add real per-location service lists and weekend hours.
- New photography (Sarajevo interiors, building, team, higher-resolution equipment), optional patient video stories.
- Consider localized (English) slugs for service/doctor URLs.

**Launch switches**
- Remove `X-Robots-Tag` header (`next.config.ts`), metadata `robots: noindex` (`src/lib/seo.ts`, locale layout) and set `robots.ts` to allow.
- Set `NEXT_PUBLIC_SITE_URL`; submit sitemap; verify structured data (MedicalClinic, Physician, FAQPage, Breadcrumb).
- Remove the "unofficial concept" notices in the top bar and footer.

**Performance follow-ups** (mobile 86–89 with real throttling)
- Defer hydration of below-the-fold interactive sections; review `motion` usage for a lighter bundle; consider self-hosting a single variable font subset.

**Deployment**
- Vercel project with preview deployments; the demo was not deployed publicly from this session (see summary).
