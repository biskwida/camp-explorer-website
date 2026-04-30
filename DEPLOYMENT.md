# Camp Explorer — Cloudflare Deployment Journal

> **Purpose:** Survive session crashes. If a Claude Code session dies mid-deploy, the next session reads this file and resumes without losing context. Update it as we go — every command run, every decision made, every error hit.

---

## TL;DR — Current State

- **Date opened:** 2026-04-30
- **Branch:** `main` (clean, up to date with `origin/main`)
- **Last commit on main:** `24afec2 build: add @opennextjs/cloudflare adapter for Cloudflare Workers/Pages deploy`
- **Cloudflare account:** Just created by user (no Workers/Pages projects yet on the account).
- **Wrangler CLI:** `4.86.0` (installed as devDep, run via `bunx wrangler`)
- **Wrangler auth status:** ✅ Authenticated as `tanya.topacharova@gmail.com` (Account ID `18b51f1378dcb8efd655fbb88a429eb2`)
- **Live URL:** ✅ **https://camp-explorer-website.tanya-topacharova.workers.dev** (deployed 2026-04-30)
- **Version ID:** `f8ea4e3d-dcc7-4147-ac03-5b488b931282`
- **Build artifacts present:** `.open-next/worker.js` and `.open-next/assets/` exist from a prior `bun run build:cf`. They may be stale — rebuild before deploying.

**Next concrete step:** First deploy is live and verified. From here, every `bun run deploy:cf` ships an update. Suggested follow-ups (not blockers):
1. Rename `middleware.ts` → `proxy.ts` to clear the Next 16 deprecation warning.
2. Build out the empty route folders (about, experiences/*, schools/*, register, privacy, terms).
3. Wire up the Resend + Google Sheets form backend (will need `bunx wrangler secret put RESEND_API_KEY`).
4. Add a custom domain in the Cloudflare dashboard (Workers → camp-explorer-website → Settings → Domains & Routes).

---

## Deployment Architecture (so future-you doesn't re-derive this)

This is **not** a Cloudflare Pages deployment. It uses the **OpenNext Cloudflare adapter** (`@opennextjs/cloudflare`), which compiles the Next.js 16 app into a single Cloudflare **Worker** plus static assets:

```
.open-next/
├── worker.js              ← entry point (the Worker script Cloudflare runs)
├── assets/                ← static files served from Workers Static Assets binding
├── server-functions/      ← bundled Next.js server code
└── middleware/            ← edge middleware (next-intl locale routing lives here)
```

Wrangler then uploads `worker.js` + `assets/` to Cloudflare Workers using the new **Workers Static Assets** model (the modern replacement for Pages Functions for new Next.js projects).

### Why OpenNext, not Pages directly?
- Cloudflare's older `@cloudflare/next-on-pages` is on a deprecation path; OpenNext is the actively maintained Next.js → Cloudflare adapter.
- Works with Next 15+ App Router, RSC, middleware, and ISR.
- Single Worker binding means simpler observability and one URL per deploy.

---

## Key Files (do not touch without thinking)

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Cloudflare deployment config — name, compat date, assets binding |
| `open-next.config.ts` | OpenNext adapter config (currently default — `defineCloudflareConfig()`) |
| `next.config.ts` | Next.js config — already includes `allowedDevOrigins: ["*.trycloudflare.com"]` for tunnel testing |
| `package.json` scripts | `build:cf`, `preview:cf`, `deploy:cf` — see below |

### wrangler.jsonc (current)
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "camp-explorer-website",
  "main": ".open-next/worker.js",
  "compatibility_date": "2025-01-15",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "binding": "ASSETS",
    "directory": ".open-next/assets"
  },
  "observability": {
    "enabled": true
  }
}
```

`compatibility_flags: ["nodejs_compat"]` is **required** — Next.js server code uses Node APIs (`Buffer`, `process`, etc.) and the Worker runtime needs this flag to provide them.

`observability.enabled: true` turns on Cloudflare's built-in logs/traces dashboard for the Worker — free and worth keeping on.

### NPM scripts
```
"build:cf":   "opennextjs-cloudflare build"                                   # produces .open-next/
"preview:cf": "opennextjs-cloudflare build && opennextjs-cloudflare preview"  # local Worker simulator (workerd)
"deploy:cf":  "opennextjs-cloudflare build && opennextjs-cloudflare deploy"   # builds + ships to Cloudflare
```

All three rebuild before running, so we never accidentally deploy stale output.

---

## Step-by-step Deployment Runbook

### ☑ Step 1 — Authenticate wrangler — DONE 2026-04-30

```bash
bunx wrangler login    # opens Cloudflare OAuth in browser, user clicks Allow
bunx wrangler whoami   # confirms
```

**Result:**
- Email: `tanya.topacharova@gmail.com`
- Account Name: `Tanya.topacharova@gmail.com's Account`
- Account ID: `18b51f1378dcb8efd655fbb88a429eb2`
- OAuth scopes granted (relevant for this project): `workers:write`, `workers_scripts:write`, `workers_kv:write`, `workers_routes:write`, `workers_tail:read`, `pages:write`, `secrets_store:write`, `email_sending:write`, `d1:write`, `zone:read`, `ssl_certs:write`. Token stored at `~/.wrangler/config/`.

> **If session dies during login:** Re-run `bunx wrangler login`. The OAuth callback can only fire once and only to the localhost port wrangler is listening on. A re-run starts a fresh listener.

### ⊘ Step 2 — Local preview — SKIPPED (intentionally)

Decision 2026-04-30: skip standalone preview. Reasoning: `deploy:cf` rebuilds fresh, and Cloudflare's runtime is `workerd` — the same engine `preview:cf` uses locally. Anything that runs on the live URL will run identically in preview, so we use the live URL as the validation surface. If the first deploy surfaces issues, we can drop back to `bun run preview:cf` for faster local iteration.

To reintroduce later:
```bash
bun run preview:cf   # serves on http://localhost:8787 via workerd
```

### ☑ Step 3 — Deploy to Cloudflare — DONE 2026-04-30

```bash
bun run deploy:cf
```

**Build phase** (Next.js → OpenNext bundle):
- Next 16.2.4 + Turbopack: compile in 1.6s
- TypeScript check: 2.7s
- 6 static pages prerendered: `/_not-found`, `/en`, `/ar`, `/apple-icon.png`, `/icon.png`, plus the proxy/middleware
- OpenNext bundle: `worker.js` written to `.open-next/`

**Upload phase** (wrangler → Cloudflare):
- 47 of 63 static assets uploaded (16 deduplicated by hash)
- Total upload: 5,568 KiB → 1,186 KiB gzipped
- Worker startup time: **24 ms** (very healthy)
- Bindings on Worker: `env.ASSETS` (Static Assets binding only — no KV/D1/secrets yet)

**Deployed URL:** https://camp-explorer-website.tanya-topacharova.workers.dev
**Version ID:** `f8ea4e3d-dcc7-4147-ac03-5b488b931282`

### ☑ Step 4 — Post-deploy verification — DONE 2026-04-30

Verified via `curl -I` against the live URL:

| Path | Status | Notes |
|------|--------|-------|
| `/` | 307 → `/en` | next-intl middleware redirect, sets `NEXT_LOCALE=en` cookie |
| `/en` | 200, `x-nextjs-prerender: 1` | prerendered HTML, body contains `<title>Camp Explorer — Be Your Own Explorer</title>` |
| `/ar` | 200, `x-nextjs-prerender: 1` | prerendered HTML, sets `NEXT_LOCALE=ar` cookie |

Headers worth noting:
- `cache-control: s-maxage=31536000` — 1-year edge cache on static pages (Cloudflare CDN)
- `link: <.../en>; rel="alternate"; hreflang="en", <.../ar>; rel="alternate"; hreflang="ar"` — proper SEO hreflang signals
- `cf-ray: ...-SIN` — served from Singapore POP
- `alt-svc: h3=":443"` — HTTP/3 enabled

**Browser checks still pending (do these in your browser):**
- [ ] Visit `/en` — verify hero, Abdul section, schools card, footer all render with images
- [ ] Visit `/ar` — verify RTL layout, Arabic copy, mirrored navigation
- [ ] Open DevTools Network tab — confirm no 4xx for `/images/*`, fonts, chunks
- [ ] Confirm Worker shows in Cloudflare dashboard: https://dash.cloudflare.com → Workers & Pages → `camp-explorer-website`

---

## Things That Could Bite Us (record incidents here as they happen)

### Known caveats from research
1. **Next.js 16 + OpenNext compatibility** — Next 16 is very new. If `build:cf` fails with adapter errors, check `node_modules/@opennextjs/cloudflare/CHANGELOG.md` for Next 16 support notes. Current installed version: `1.19.4`.
2. **`AGENTS.md` warning** — "This is NOT the Next.js you know" — Next 16 has breaking changes. If something behaves unexpectedly, read `node_modules/next/dist/docs/` before assuming.
3. **Image optimization** — Next's default image optimizer doesn't run on Workers. OpenNext typically falls back to serving images unoptimized or via a separate Cloudflare Images binding. Watch for slow image loads after deploy.
4. **`sharp` package** — Listed as a dep but it's a native binary that doesn't run on Workers. OpenNext should tree-shake it out of the worker bundle, but if deploy fails with `sharp` errors, that's the cause.
5. **Resend / Google Sheets webhook** — Not yet wired up (per project memory). Once forms ship, those env vars need to go in `wrangler.jsonc` under `vars` (non-secret) or be set via `wrangler secret put` (secret).

### Incidents
_(Append below with date + symptom + fix as they occur.)_

#### 2026-04-30 — Build deprecation warning (non-blocking)
**Symptom:** During `bun run deploy:cf`, Next 16 prints:
> ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy

**Cause:** Next 16 renames the convention from `middleware.ts` → `proxy.ts`. Both still work in 16.x but the old name is on a removal path.

**Fix (deferred):** Rename `middleware.ts` → `proxy.ts`. The file's exports stay the same. No urgency — Next won't remove the old name within 16.x.

#### 2026-04-30 — Node child_process deprecation in wrangler (cosmetic only)
**Symptom:** `(node:12049) [DEP0190] DeprecationWarning: Passing args to a child process with shell option true...`

**Cause:** Internal to wrangler 4.86.0 — not our code. Will be fixed by Cloudflare in a wrangler update.

**Fix:** None needed. Ignore.

---

## Switching to a Custom Domain (when ready)

The `*.workers.dev` URL is fine for staging but not production. When you have a domain (e.g. `campexplorer.sa`, `campexplorer.com`), swap is ~10 minutes with zero code changes.

### Steps
1. **Move DNS to Cloudflare** (skip if already there):
   - At your registrar, change the two nameservers to the ones Cloudflare gives you when you "Add a site" in the Cloudflare dashboard.
   - Wait for Cloudflare to confirm the zone is active (usually < 1 hour, sometimes minutes).
2. **Attach the domain to the Worker:**
   - Cloudflare dashboard → **Workers & Pages → `camp-explorer-website` → Settings → Domains & Routes → Add Custom Domain**.
   - Enter the hostname (e.g. `www.campexplorer.sa` or apex `campexplorer.sa`).
   - Cloudflare provisions a TLS cert automatically (~30 sec).
3. **Verify:**
   - `curl -I https://your-domain.example` → expect `200` and `cf-ray` header.
   - `dig your-domain.example` → expect a Cloudflare anycast IP.
4. **Both URLs now serve the same Worker** — `*.workers.dev` keeps working. You can leave it as a permanent staging alias or hide it later.

### Code-side prep (do this BEFORE you have a domain, so the swap is just an env var)
- Add `NEXT_PUBLIC_SITE_URL` env var. Default it to the workers.dev URL today; change to the real domain on swap day.
- Use it for:
  - `metadata.metadataBase` in [app/[locale]/layout.tsx](app/[locale]/layout.tsx) — controls absolute URLs in OG tags, canonical, robots.
  - Open Graph image URLs (must be absolute).
  - `sitemap.ts` if/when added.
  - `robots.ts` if/when added.
- Cloudflare Workers env vars go in `wrangler.jsonc` under `vars` (non-secret) and are read at build time (`process.env.NEXT_PUBLIC_SITE_URL`).

### SEO follow-up after swap
- 301 redirect `*.workers.dev` → custom domain so Google consolidates ranking signals. Either:
  - Add a tiny redirect Worker on the workers.dev hostname, OR
  - Just leave both serving identical content and rely on `<link rel="canonical">` (simpler, slightly less ideal).
- Re-submit sitemap to Google Search Console under the new domain.

---

## Useful Commands Cheat Sheet

```bash
# Auth
bunx wrangler login              # interactive browser login
bunx wrangler whoami             # check current auth
bunx wrangler logout             # clear stored credentials

# Build / preview / deploy
bun run build:cf                 # build OpenNext bundle only
bun run preview:cf               # build + run local workerd
bun run deploy:cf                # build + deploy to Cloudflare

# Inspect deployed Worker
bunx wrangler deployments list   # show recent deploys
bunx wrangler tail               # stream live logs from prod Worker

# Secrets (when forms ship)
bunx wrangler secret put RESEND_API_KEY
bunx wrangler secret list
```

---

## Site State Snapshot (as of 2026-04-30, before first Cloudflare deploy)

This is what's actually built today, so a future session knows what will and won't render after deploy.

### Pages with code (will render)
| Route | File | Lines |
|-------|------|-------|
| `/[locale]` (home) | `app/[locale]/page.tsx` | 23 |
| `/[locale]` layout | `app/[locale]/layout.tsx` | — |

### Routes scaffolded but **empty** (will 404 on deploy)
The following folders exist under `app/[locale]/` but contain no `page.tsx`:

- `about/`
- `experiences/` (and subfolders: `sri-lanka/`, `cambodia/`, `weekend-camp/`)
- `schools/` (and subfolders: `saudi/`, `international/`)
- `register/`
- `privacy/`
- `terms/`

**Implication:** the header nav links will 404 in the deployed site. That's acceptable for a first-deploy smoke test of the pipeline — content pages get added incrementally after deploy works.

### i18n state
- `messages/en.json` and `messages/ar.json` exist with copy for the home page (nav, hero, preview cards, Abdul section, closing CTA, footer).
- `next-intl` middleware (`middleware.ts`) handles `/` → `/en` redirect and `/ar` for Arabic.
- Source content document for future pages: `~/Downloads/Camp Explorer Website Content .docx`. Sections covered:
  1. Home page ✅ (implemented)
  2. Experiences page (overview + Sri Lanka, Cambodia, Saudi schools, Saudi weekend, International school choice) — **content drafted, no code**
  3. Register your interest forms (5 form variants: Sri Lanka, Cambodia, Weekend, Schools) — **content drafted, no code, no Resend wiring**
  4. About us page — **content drafted, no code**

### Components inventory
- `components/Header.tsx`, `Footer.tsx`, `LanguageToggle.tsx`, `Logo.tsx`, `SmartImage.tsx`, `SocialIcons.tsx`
- `components/forms/`, `components/sections/`, `components/ui/` (shadcn primitives)

### Form backend
- **Not yet wired up.** Plan calls for Resend email + Google Sheets webhook in parallel via `Promise.all`. No env vars set, no API routes yet under `app/api/`.
- This is fine for first deploy — forms aren't built yet.

---

## Session Continuity Protocol

If a Claude Code session dies and a new one starts:

1. New session reads this file first (it's at the project root).
2. Check git log for any commits made since the "Last commit on main" line above — update that line.
3. Re-run `bunx wrangler whoami` to confirm auth state still holds.
4. Find the first unchecked `☐ Step` above and resume from there.
5. Update this file as you progress. Move `☐` to `☑` when a step completes; record the deployed URL when known.
