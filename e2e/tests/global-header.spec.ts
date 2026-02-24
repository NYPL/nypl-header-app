import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/base_page";

let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page);
  await basePage.goto();
});

test.describe("Global Header", () => {
  test("Verify global header links appear and point to the correct URLs", async ({
    page,
  }) => {
    const headerLinks = [
      {
        locator: basePage.nyplLogo,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/",
      },
      {
        locator: basePage.locations,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/locations",
      },
      {
        locator: basePage.libraryCard,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/library-card/new",
      },
      {
        locator: basePage.newsletter,
        expectedHostnames: ["pub.email.nypl.org"],
        expectedPathname: "/subscriptioncenter",
      },
      {
        locator: basePage.donate,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/donate-button",
      },

      {
        locator: basePage.shop,
        expectedHostnames: ["shop.nypl.org"],
        expectedPathname: "/",
      },
      {
        locator: basePage.books,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/books-music-movies",
      },
      {
        locator: basePage.research,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/research",
      },
      {
        locator: basePage.education,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/education",
      },
      {
        locator: basePage.events,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/events",
      },
      {
        locator: basePage.connect,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/connect",
      },
      {
        locator: basePage.give,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/give",
      },
      {
        locator: basePage.getHelp,
        expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
        expectedPathname: "/get-help",
      },
    ];

    for (const {
      locator,
      expectedHostnames,
      expectedPathname,
    } of headerLinks) {
      await expect.soft(locator).toBeVisible();
      const href = await locator.getAttribute("href");
      expect.soft(href, "link should have href").toBeTruthy();

      if (!href) {
        continue;
      }

      const url = new URL(href, page.url());
      expect.soft(expectedHostnames).toContain(url.hostname);
      expect.soft(url.pathname).toBe(expectedPathname);
    }
  });
  // Search and My Account do not resolve to a new page. Just test for visibility. Functionality is tested elsewhere.
  test("Verify Search and My Account buttons appear in header", async () => {
    await expect(basePage.searchButton).toBeVisible();
    await expect(basePage.myAccountButton).toBeVisible();
  });
});
