# GTranslate Automation Plan

**Status:** Draft for review
**Source:** `Google Translation Module - QA Test Plan (Draft).docx` (owner: Alkim Cevik, QA)
**Related tickets:** ISW-6025 (scoping), ISW-6026 (Scout), ISW-6027 (Drupal), ISW-6033 (QA tracking)
**Repo:** `nypl-header-app` — the QA doc states this is "one implementation on the shared global Header... not a separate frontend/backend split." GTranslate ships inside the Header package every consuming app pulls in (NYPL.org, circulation/research catalogs, header-consuming LibGuides), so testing it in a single consumer repo (e.g. `dxp-react-search`) would only cover one of several consumers, not the shared component itself.

---

## Test cases

1. Widget appears in the persistent header location across all page templates (homepage, location, blog, event, exhibition, basic page)
2. Widget appears correctly across all in-scope subdomains/apps (nypl.org, circulation catalog, research catalog, header-consuming LibGuides)
3. Widget is absent from out-of-scope properties (Digital Collections, Archives, non-header LibGuides, Shop)
4. Default language on first visit is English
5. Selecting a language translates the page immediately with no flash of untranslated content
6. Switching language A → B → back to English returns cleanly with no stuck/partial state
7. Language preference persists across page navigation within the same session
8. Language preference persists into a new browser session/tab via cookie
9. Google's native widget UI (selector/banner/popups) stays hidden
10. GTranslate's own `<select>` passes an independent accessibility check (not assumed to inherit Reservoir Select's a11y)
11. Widget is reachable via keyboard (Tab) and exposes an accessible name
12. JAWS/Windows screen reader pass on the language selector
13. Full 12-language translation matrix (Arabic, Bengali, Mandarin, Cantonese, French, Haitian Creole, Italian, Korean, Polish, Russian, Spanish, Urdu, Yiddish)
14. RTL languages (Arabic, Urdu, Yiddish) render without visual breakage (overlap, misalignment, cut-off content)
15. Header/footer/nav mirror correctly or remain usable in RTL
16. Pages with existing manual translations show the manual version, not a Google-translated one
17. Mixed manual + Google-translated content on the same page behaves as specified (pending SWIS confirmation)
18. Protected (`notranslate`) elements aren't translated and don't break layout in any of the 12 languages
19. Image alt text translates when language changes
20. Page `lang` attribute updates on language change
21. VoiceOver pass: selector announced properly, pronunciation switches after language change, including one RTL language
22. Custom GA4 event fires on language selection
23. GA4 event payload contains no PII
24. Language-preference cookie contains no PII and is anonymized
25. Page load time with widget active doesn't regress meaningfully vs. baseline
26. Performance check on a throttled/slow connection profile
27. Widget functions correctly on Desktop Chrome + Safari and Mobile Safari (iOS)
28. Widget remains usable at narrow viewport widths
29. Regression smoke test on HeaderLogin, HeaderLoginButton, HeaderMobileIconNav, HeaderSearchButton, HeaderSearchForm, HeaderUpperNav (components PR #103 directly modifies)
30. Legal disclaimer displays correctly on its designated page once location is decided
31. Legal disclaimer links work correctly

---

## Automation tiers

### Tier 1 — Straightforward (reuse existing Playwright patterns)

**Cases:** 1-9, 16, 18-20, 24, 27-29
**Estimate:** ~3-4 days
DOM/text/cookie assertions, parametrized across pages/languages — same shape as the header nav-link and search-flow tests already in `e2e/tests/global-header.spec.ts`.

**Status (2026-10-02): Implemented in `e2e/tests/gtranslate.spec.ts`, branch `ISW-6079-automate-GTranslate`.** 11 of the 17 cases in this tier are genuinely automatable from this repo; 6 are explicit `test.skip()` stubs with reasons rather than silently dropped. See Findings below for why, and for two real discoveries made while verifying against the actual implementation rather than the doc's assumptions.

- **Automated (11):** 4, 5, 6, 7, 8, 9, 20, 24, 27, 28, 29
- **Skipped, needs a real consuming-app page (5):** 1, 2, 3, 16, 19 — this repo's e2e suite only renders the standalone Header/Footer demo, not real page templates/content. Confirmed empirically: there are zero `<img>` elements anywhere in the rendered header (case 19 has nothing to test here), and there's no manually-translated page content to compare against (case 16). These need to be tested in a consuming app (e.g. `dxp-react-search`) against real pages, not here.
- **Skipped, blocked on product decision (1):** 18 — confirmed via `grep -rn "notranslate" src/` that it isn't implemented anywhere yet. The doc itself flags the protected-element list as pending confirmation, so there's nothing real to assert against.

---

## Findings (from implementing Tier 1, 2026-10-02)

### 1. Persistence mechanism is localStorage, not a cookie

The doc requires persistence "as long as it's cookied" and a privacy case for "the cookie." The real implementation (confirmed via direct inspection before/after language switch) stores the preference in **`localStorage`** under `__GT_TRANSLATE_LANGS` (plus a `gt_autoswitch` flag) — no cookie is ever set. Functionally the requirement is still met (same-tab reload and a brand-new tab both correctly retain the language), just through a different mechanism than the doc describes. Cases 8 and 24 were automated against the real mechanism. **Worth confirming with Alkim/the dev team that this wasn't a compliance assumption** (e.g. cookie-consent banner scope, privacy review language) before treating it as a non-issue.

### 2. Real bug: WebKit/Safari loses the language preference on reload

Confirmed via direct `localStorage` inspection, reproduced twice: in WebKit, selecting a language sets `__GT_TRANSLATE_LANGS` correctly, but a same-tab `page.reload()` wipes that key out entirely (only `gt_autoswitch` survives) — the page reverts to English. **A brand-new tab in the same WebKit context persists the language correctly** — this is specifically a reload issue, not a general cross-tab one. Likely cause: WebKit's Intelligent Tracking Prevention partitioning storage written by the dynamically-injected `cdn.gtranslate.net` script.

This directly fails the doc's persistence requirement on **Safari (iOS)** — one of only two browsers the doc mandates testing. Marked in the test suite via `test.fail()` (WebKit only) so it documents the bug, keeps the suite green, and will loudly flag an *unexpected pass* if it's ever silently fixed or regresses further. **This should be raised with the dev team/Alkim as a real bug, not treated as resolved by the test marking.**

### Tier 2 — Medium (needs new harness)

**Cases:** 13 (loop over 12 languages), 22-23 (GA4 — needs network/dataLayer interception), 25-26 (needs CDP network throttling; no existing perf harness in this repo)
**Estimate:** ~3-4 days
New but bounded infrastructure, no real uncertainty about feasibility.

### Tier 3 — Hard / visual (needs curated baselines)

**Cases:** 14-15 (RTL layout)
**Estimate:** ~2-3 days
Possible via Playwright screenshot diffing, but "doesn't visually break" is subjective — needs maintained baseline images and carries a higher false-positive risk than the other tiers.

### Not practically automatable (manual/QA-owned)

**Cases:** 10-12, 17, 21, 30-31
10-11 could get a partial automated pass via axe-core, but 12 (JAWS) and 21 (VoiceOver pronunciation) need a human ear. 17, 30, and 31 are blocked on unconfirmed/undecided product behavior — nothing concrete to test yet.

---

## Total estimate

**~8-11 working days** (roughly 2 weeks for one person) for the 24 of 31 cases that are actually automatable, assuming no major GTranslate-DOM surprises. The remaining 7 stay manual/QA-owned regardless of effort spent — either by nature (screen readers) or because the spec isn't finalized yet.

---

## Open items that block full automation

- Final list of `notranslate`-protected elements (pending Camila Franco Díaz confirmation) — needed before case 18 can be written precisely
- Mixed manual/Google-translated content behavior (case 17) — pending SWIS/other-pod confirmation
- Legal disclaimer location (cases 30-31) — pending Comms follow-up (Hannah)
- GA4 event spec (cases 22-23) — TBD, and flagged in the source doc as possibly slipping to Phase 2

## Known limitations (explicitly out of scope — do not write tests expecting these to pass)

- Pressing the back button breaks widget functionality — accepted limitation of the Google widget itself, will not be fixed
- Resizing the window across the mobile/desktop breakpoint breaks functionality — same, will not be fixed

---

## Review status

_Not yet reviewed. Reply with keep/cut/merge per tier, or "go" to start Tier 1._
