# FarmWise AI — Full PWA Rebuild Plan

This is a large, multi-phase rebuild. I'll ship it in staged milestones so you can review progress between phases rather than waiting for one giant drop. Each phase leaves the app buildable and usable.

## Phase 1 — Foundation (design system, shell, i18n, PWA, auth)
- Rebrand to **FarmWise AI**: update `index.html` title/description/theme-color, favicon, manifest.
- New design tokens in `index.css` + `tailwind.config.ts`: green primary, earthy secondary, warm-gray surfaces, soft shadows, rounded cards. Light theme only.
- App shell (`AppLayout`): mobile top bar + bottom nav (Home / My Farm / AI / Market / Profile); tablet/desktop left sidebar with full menu.
- i18n via `react-i18next` — English, हिंदी, తెలుగు. Language switcher in top bar. Translation JSON per namespace.
- Accessibility: text-size control (persisted), safe-area insets, 44px touch targets.
- PWA: `vite-plugin-pwa` with guarded registration (no SW in Lovable preview), manifest + icons, offline fallback, install-prompt UI, online/offline banner, update toast.
- Auth: Supabase phone OTP + email/password screens, onboarding wizard (name, language, mobile, state/district/village, GPS/manual location, farm size, unit, irrigation type, soil type, current/preferred crops), demo mode.

## Phase 2 — Database schema + core modules
Supabase migration for: `profiles`, `farms`, `crops`, `soil_tests`, `tasks`, `disease_scans`, `transactions`, `inventory`, `notifications`, `market_watchlist`, `community_posts`, `community_comments`, `ai_conversations`, `ai_messages`. RLS on every table (`auth.uid()` scoped), GRANTs, triggers for `updated_at`, seed demo data via edge function or client-side first-run.

Then build:
- **Home Dashboard** — greeting, farm selector, weather summary, alerts carousel, quick actions, crop cards, today's tasks, soil snapshot, market snapshot, yield/profit estimate, scheme recommendations, recent AI recs.
- **Weather** — current, hourly, 15-day, alerts, farming/irrigation advice, alert preferences (push/SMS/WhatsApp/Telegram UI), mock service.
- **Soil Health** — upload SHC (image/PDF), manual entry, OCR preview stub, all 12 parameters, history, nutrient viz, score, fertilizer + organic recs, schedule, cost, crop suitability, share/download UI.

## Phase 3 — Planning & intelligence modules
- **Crop Planner** — suitability, comparison, calendar, lifecycle timeline, yield/ROI, add to farm.
- **Disease Scan** — camera/upload, crop selector, quality tips, analysis loader, results (disease/confidence/severity/organic+chemical treatment/safety/prevention), history, disclaimer. Uses Lovable AI (Gemini vision) via edge function.
- **AI Assistant** — chat (AI Elements), suggested questions, voice input (Web Speech API), image attach, language-aware, conversation history, citation cards. Edge function using Lovable AI Gateway.
- **Market Intelligence** — price cards, mandi comparison, filters, trend charts (recharts), best-market rec, selling window, transport/net realization calculator, watchlist, alerts.

## Phase 4 — Operations modules
- **Farm Tasks & Calendar** — Today/Upcoming/Completed tabs, CRUD, categories, calendar view, repeat, reminders, offline queue.
- **Accounting** — reuse & upgrade existing module: dashboard, add transaction with full category list, farm/crop link, cash/bank, monthly chart, crop profitability, season P&L, loan tracker, export.
- **Inventory** — items across categories, qty/unit/dates/supplier/cost, low-stock + expiry alerts, movements, add/use/restock.

## Phase 5 — Community & final modules
- **Government Schemes** — cards, filters, eligibility, benefits, docs, steps, bookmark, status tracker (demo content).
- **Community** — feed, ask, photo posts, tags, expert badge, comments/votes, expert booking UI, moderation.
- **IoT Sensors** — overview, mock sensors (moisture/temp/humidity/pH/tank/station), charts, offline warnings, thresholds, irrigation automation UI.
- **Profile / Settings / Privacy** — profile edit, farm management, language, notifications, accessibility, connected devices, data export, delete account, privacy/consent, help.

## Cross-cutting quality
- Skeletons, empty states, error+retry, toasts, confirm dialogs, zod form validation, responsive recharts, no horizontal overflow, bottom-nav-safe padding, every route linked and functional, demo/coming-soon fallbacks for unconnected services.

## Technical notes
- Stack: React 18 + Vite + TS + Tailwind + shadcn + Lucide + react-router + TanStack Query + react-i18next + zod + react-hook-form + recharts + date-fns + vite-plugin-pwa.
- All AI features route through Supabase edge functions using the Lovable AI Gateway (no user API key needed).
- Mock service layers (`src/services/weather.ts`, `market.ts`, etc.) so live APIs can swap in later without UI changes.
- Existing MCP server, accounting components, and working pages will be preserved and refactored, not deleted.

## Delivery approach
I'll implement **Phase 1 first** and pause for your review of the new shell, branding, navigation, i18n, PWA, and auth. Then proceed phase-by-phase. Each phase is a reviewable increment; the total build spans multiple turns.

**Please confirm to start Phase 1**, or tell me to reorder/skip any phase (e.g. "skip community & IoT for v1", "do disease scan before soil health", etc.).