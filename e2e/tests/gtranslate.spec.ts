import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/base_page";
import { supportedLanguages } from "../../src/components/Header/utils/gTranslateUtils";

// GTranslate stores the selected language in localStorage
// (`__GT_TRANSLATE_LANGS`).
const GT_STORAGE_KEY = "__GT_TRANSLATE_LANGS";

const getStoredLanguage = (page: import("@playwright/test").Page) =>
  page.evaluate((key) => {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }, GT_STORAGE_KEY);

let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page);
  await basePage.goto();
  await basePage.gtranslateSelect.waitFor();
});

test.describe("GTranslate", () => {
  // GTranslate's language switch calls Google's real translate API - running
  // these in parallel causes contention/flakiness (same pattern observed with
  // slow page loads elsewhere), so this suite runs serially. `retries: 1`
  // guards against one test in the sequence failing for an unrelated,
  // transient reason (e.g. a slow Google API response) cascading into every
  // later test in the file being skipped for that run.
  test.describe.configure({ mode: "serial", retries: 1 });

  // Pinned explicitly: "default language on load" below asserts an
  // English-locale value, which only holds if the browser's locale is
  // English (detect_browser_language is on). Without this, the test
  // silently depends on whatever locale the host OS/CI image defaults to.
  test.use({ locale: "en-US" });

  test("default language on load is English", async ({ page }) => {
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    // Value is "en|en" ("defaultLanguage|targetLanguage"), not empty - the
    // widget auto-selects a value on load since detect_browser_language is on.
    await expect(basePage.gtranslateSelect).toHaveValue("en|en");
  });

  test("selecting a language translates the page", async ({ page }) => {
    // Google's translator mutates individual text nodes asynchronously and
    // unevenly - asserting on one specific nav link is timing-fragile.
    // The `lang` attribute flips reliably and immediately; a whole-page text
    // diff confirms content actually changed, without depending on which
    // node Google gets to first.
    const beforeText = await page.evaluate(() => document.body.innerText);

    await basePage.gtranslateSelect.selectOption({ label: "Français" });

    await expect
      .poll(() => page.locator("html").getAttribute("lang"))
      .toBe("fr");
    await expect
      .poll(() => page.evaluate(() => document.body.innerText), {
        timeout: 15000,
      })
      .not.toBe(beforeText);
  });

  test("switching language A -> B -> back to English returns cleanly", async ({
    page,
  }) => {
    const originalText = await page.evaluate(() => document.body.innerText);

    await basePage.gtranslateSelect.selectOption({ label: "Español" });
    await expect
      .poll(() => page.locator("html").getAttribute("lang"))
      .toBe("es");

    await basePage.gtranslateSelect.selectOption({ label: "Français" });
    await expect
      .poll(() => page.locator("html").getAttribute("lang"))
      .toBe("fr");

    await basePage.gtranslateSelect.selectOption({ label: "English" });
    await expect
      .poll(() => page.locator("html").getAttribute("lang"))
      .toBe("en");
    await expect
      .poll(() => page.evaluate(() => document.body.innerText), {
        timeout: 15000,
      })
      .toBe(originalText);
  });

  test("preference persists across navigation in the same session", async ({
    page,
    browserName,
  }) => {
    // We skip the webkit test because Playwright-WebKit behaves differently
    // than Safari, dropping localStorage values on reload and causing this
    // test to fail. It passes manual tests in Safari.
    test.skip(
      browserName === "webkit",
      "Playwright-WebKit drops localStorage on reload; passes manually in Safari",
    );

    await basePage.gtranslateSelect.selectOption({ label: "Français" });
    await expect
      .poll(() => page.locator("html").getAttribute("lang"))
      .toBe("fr");

    await page.reload();

    await expect
      .poll(() => page.locator("html").getAttribute("lang"))
      .toBe("fr");
  });

  test("preference persists into a new browser tab", async ({ context }) => {
    await basePage.gtranslateSelect.selectOption({ label: "Français" });
    await expect
      .poll(() => basePage.page.locator("html").getAttribute("lang"))
      .toBe("fr");

    const secondPage = await context.newPage();
    const secondBasePage = new BasePage(secondPage);
    await secondBasePage.goto();

    await expect
      .poll(() => secondPage.locator("html").getAttribute("lang"))
      .toBe("fr");
  });

  test("Google's native widget UI stays hidden", async ({ page }) => {
    await basePage.gtranslateSelect.selectOption({ label: "Français" });
    await expect
      .poll(() => page.locator("html").getAttribute("lang"))
      .toBe("fr");

    await expect(
      page.locator(
        'iframe.goog-te-banner-frame, .goog-te-banner-frame, #goog-gt-tt, .skiptranslate iframe, iframe[src*="translate.google"]',
      ),
    ).toHaveCount(0);
  });

  test("stored language preference contains no PII", async ({ page }) => {
    await basePage.gtranslateSelect.selectOption({ label: "Français" });
    await expect
      .poll(() => page.locator("html").getAttribute("lang"))
      .toBe("fr");

    const stored = await getStoredLanguage(page);

    expect(Object.keys(stored ?? {}).sort()).toEqual(["srcLang", "tgtLang"]);
    // Only known supported language codes are stored - no identifiers,
    // emails, or other PII.
    for (const value of Object.values(stored ?? {})) {
      expect(supportedLanguages).toContain(value);
    }
  });

  test.describe("at a mobile viewport", () => {
    // Loading at mobile width from the start, rather than resizing mid-test,
    // avoids crossing the mobile/desktop breakpoint - a known limitation for
    // this widget (resizing across that breakpoint breaks it).
    test.use({ viewport: { width: 375, height: 812 } });

    test("widget remains usable", async ({ page }) => {
      // Not asserting the select is visible: it's `opacity: 0` on mobile by
      // design (only the globe icon shows) - Playwright's visibility check
      // doesn't treat opacity as hidden, so that assertion would pass
      // without actually confirming anything a user can see. The real
      // signal is that the interaction still works.
      await basePage.gtranslateSelect.selectOption({ label: "Français" });

      await expect
        .poll(() => page.locator("html").getAttribute("lang"))
        .toBe("fr");
    });

    test("regression: mobile icon nav renders alongside GTranslate", async ({
      page,
    }) => {
      // PR #103 (GTranslate) directly modified HeaderMobileIconNav, among
      // other components; the rest of that set (HeaderLogin,
      // HeaderLoginButton, HeaderSearchButton, HeaderSearchForm,
      // HeaderUpperNav) already has coverage in global-header.spec.ts -
      // this is the one with none before now.
      await expect(basePage.searchButton).toBeVisible();
    });
  });
});
