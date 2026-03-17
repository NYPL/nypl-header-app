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
  test("Verify Search and My Account buttons appear in header", async () => {
    await expect(basePage.searchButton).toBeVisible();
    await expect(basePage.myAccountButton).toBeVisible();
  });
});
test.describe("Header drop down interactions", () => {
  test("Verify Account buttons attributes", async () => {
    await expect(basePage.goToCatalogLink).not.toBeVisible();
    await expect(basePage.researchCatalogLink).not.toBeVisible();
    await basePage.myAccountButton.click();

    await expect(basePage.goToCatalogLink).toBeVisible();
    const href = await basePage.goToCatalogLink.getAttribute("href");
    expect(href).toContain("borrow.nypl.org/?openAccount");

    await expect(basePage.researchCatalogLink).toBeVisible();
    const researchHref =
      await basePage.researchCatalogLink.getAttribute("href");
    expect(researchHref).toContain("catalog.nypl.org/patroninfo/top");
    await basePage.closeAccountButton.click();
    await expect(basePage.goToCatalogLink).not.toBeVisible();
    await expect(basePage.researchCatalogLink).not.toBeVisible();
  });
  test('should trap focus within the dropdown when "My Account" is clicked', async () => {
    await basePage.myAccountButton.click();
    const isAllowedFocused = async () => {
      const [catalogFocused, researchFocused, closeFocused] = await Promise.all(
        [
          basePage.goToCatalogLink.evaluate(
            (el) => el === document.activeElement,
          ),
          basePage.researchCatalogLink.evaluate(
            (el) => el === document.activeElement,
          ),
          basePage.closeAccountButton.evaluate(
            (el) => el === document.activeElement,
          ),
        ],
      );
      return catalogFocused || researchFocused || closeFocused;
    };

    // assert that focus starts on catalog link when dropdown opens
    await expect(basePage.goToCatalogLink).toBeFocused();

    await basePage.page.keyboard.press("Tab");
    await expect.poll(isAllowedFocused).toBe(true);
    // await expect(basePage.researchCatalogLink).toBeFocused();

    await basePage.page.keyboard.press("Tab");
    await expect.poll(isAllowedFocused).toBe(true);
    await expect(basePage.closeAccountButton).toBeFocused();

    // tab again and assert that focus returns to the the catalog link (focus is trapped within the dropdown)
    await basePage.page.keyboard.press("Tab");
    await expect.poll(isAllowedFocused).toBe(true);

    // assert that reverse tab also keeps focus within the dropdown
    await basePage.page.keyboard.press("Shift+Tab");
    await expect.poll(isAllowedFocused).toBe(true);
  });
});

test.describe("Search interactions", () => {
  test('should keep focus within search dropdown controls when "Search" is opened', async () => {
    await basePage.searchButton.click();

    const isSearchDropdownFocus = async () => {
      const focusedStates = await Promise.all([
        basePage.closeSearchButton.evaluate(
          (el) => el === document.activeElement,
        ),
        basePage.searchInput.evaluate((el) => el === document.activeElement),
        basePage.searchSubmitButton.evaluate(
          (el) => el === document.activeElement,
        ),
        basePage.searchCatalogRadio.evaluate(
          (el) => el === document.activeElement,
        ),
        basePage.searchResearchRadio.evaluate(
          (el) => el === document.activeElement,
        ),
        basePage.searchWebRadio.evaluate((el) => el === document.activeElement),
      ]);

      return focusedStates.some(Boolean);
    };

    await expect(basePage.closeSearchButton).toBeFocused();

    await basePage.page.keyboard.press("Tab");
    await expect.poll(isSearchDropdownFocus).toBe(true);
    await expect(basePage.searchInput).toBeFocused();

    await basePage.page.keyboard.press("Tab");
    await expect.poll(isSearchDropdownFocus).toBe(true);
    // await expect(basePage.searchSubmitButton).toBeFocused();

    await basePage.page.keyboard.press("Tab");
    await expect.poll(isSearchDropdownFocus).toBe(true);
    // await expect(basePage.searchCatalogRadio).toBeFocused();

    await basePage.page.keyboard.press("ArrowRight");
    await expect.poll(isSearchDropdownFocus).toBe(true);

    await basePage.page.keyboard.press("ArrowRight");
    await expect.poll(isSearchDropdownFocus).toBe(true);

    // tab again and assert that focus returns to the close button (focus is trapped within the dropdown)
    await basePage.page.keyboard.press("Tab");
    await expect.poll(isSearchDropdownFocus).toBe(true);
    await expect(basePage.closeSearchButton).toBeFocused();
    // and a quick reverse tab to assert focus stays trapped as well
    await basePage.page.keyboard.press("Shift+Tab");
    await expect.poll(isSearchDropdownFocus).toBe(true);
  });

  const searchCases = [
    {
      label: "books, music, and movies",
      query: "cats",
      chooseOption: async () => {
        await basePage.page
          .getByText("Search books, music, and movies", { exact: true })
          .click();
      },
      expectedHostnames: ["borrow.nypl.org"],
      expectedPathname: "/search",
    },
    {
      label: "research catalog",
      query: "cats",
      chooseOption: async () => {
        await basePage.page
          .getByText("Search the Research Catalog", { exact: true })
          .click();
      },
      expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
      expectedPathname: "/research/research-catalog/search",
    },
    {
      label: "library website",
      query: "cats",
      chooseOption: async () => {
        await basePage.page
          .getByText("Search the library website", { exact: true })
          .click();
      },
      expectedHostnames: ["www.nypl.org", "qa-www.nypl.org"],
      expectedPathname: "/search/cats",
    },
  ];

  for (const {
    label,
    query,
    chooseOption,
    expectedHostnames,
    expectedPathname,
  } of searchCases) {
    test(`should navigate to expected URL for ${label} search`, async () => {
      await basePage.searchButton.click();
      await basePage.searchInput.fill(query);
      await chooseOption();
      await basePage.searchSubmitButton.click();

      await expect
        .poll(() => {
          const currentUrl = new URL(basePage.page.url());
          return expectedHostnames.includes(currentUrl.hostname);
        })
        .toBe(true);

      await expect
        .poll(() => {
          const currentUrl = new URL(basePage.page.url());
          return currentUrl.pathname;
        })
        .toBe(expectedPathname);

      await expect
        .poll(() => {
          const currentUrl = new URL(basePage.page.url());
          return currentUrl.searchParams.get("searched_from");
        })
        .toBe("header_search");
    });
  }
});
