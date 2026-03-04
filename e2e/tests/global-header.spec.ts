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
  test("Verify Account functionality", async () => {
    await basePage.myAccountButton.click();
    const goToCatalogLink = basePage.page.getByRole("link", {
      name: "Go To The Catalog",
    });
    await expect(goToCatalogLink).toBeVisible();
    const href = await goToCatalogLink.getAttribute("href");
    expect(href).toContain("borrow.nypl.org/?openAccount");
    const researchCatalogLink = basePage.page.getByRole("link", {
      name: "Go To The Research Catalog",
    });
    await expect(researchCatalogLink).toBeVisible();
    const researchHref = await researchCatalogLink.getAttribute("href");
    expect(researchHref).toContain("catalog.nypl.org/patroninfo/top");
    await basePage.page.getByRole("button", { name: "Close" }).click();
  });
  test('should trap focus within the dropdown when "My Account" is clicked', async () => {
    await basePage.myAccountButton.click();

    const catalog = basePage.page.getByRole("link", {
      name: "Go To The Catalog",
    });
    const research = basePage.page.getByRole("link", {
      name: "Go To The Research Catalog",
    });
    const close = basePage.page.getByRole("button", { name: "Close" });

    const isAllowedFocused = async () => {
      const [catalogFocused, researchFocused, closeFocused] = await Promise.all(
        [
          catalog.evaluate((el) => el === document.activeElement),
          research.evaluate((el) => el === document.activeElement),
          close.evaluate((el) => el === document.activeElement),
        ],
      );
      return catalogFocused || researchFocused || closeFocused;
    };

    // Initial focus set by component logic
    await expect(catalog).toBeFocused();

    await basePage.page.keyboard.press("Tab");
    await expect.poll(isAllowedFocused).toBe(true);

    await basePage.page.keyboard.press("Tab");
    await expect.poll(isAllowedFocused).toBe(true);

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

    await basePage.page.keyboard.press("Tab");
    await expect.poll(isSearchDropdownFocus).toBe(true);

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

          return {
            hostname: currentUrl.hostname,
            pathname: currentUrl.pathname,
            searchedFrom: currentUrl.searchParams.get("searched_from"),
          };
        })
        .toEqual(
          expect.objectContaining({
            hostname: expect.stringMatching(
              new RegExp(`^(${expectedHostnames.join("|")})$`),
            ),
            pathname: expectedPathname,
            searchedFrom: "header_search",
          }),
        );
    });
  }
});
