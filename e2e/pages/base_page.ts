import type { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  // Global header
  readonly nyplLogo: Locator;
  //readonly nyplLogoImg: Locator;
  readonly myAccountButton: Locator;
  readonly goToCatalogLink: Locator;
  readonly researchCatalogLink: Locator;
  readonly closeAccountButton: Locator;

  readonly locations: Locator;
  readonly libraryCard: Locator;
  readonly newsletter: Locator;
  readonly donate: Locator;
  readonly shop: Locator;
  readonly books: Locator;
  readonly research: Locator;
  readonly education: Locator;
  readonly events: Locator;
  readonly connect: Locator;
  readonly give: Locator;
  readonly getHelp: Locator;
  readonly searchButton: Locator;
  readonly closeSearchButton: Locator;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly searchCatalogRadio: Locator;
  readonly searchResearchRadio: Locator;
  readonly searchWebRadio: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nyplLogo = page.getByRole("link", {
      name: "The New York Public Library",
    });
    this.myAccountButton = page.getByRole("button", { name: "My Account" });
    this.goToCatalogLink = page.getByRole("link", {
      name: "Go To The Catalog",
    });
    this.researchCatalogLink = page.getByRole("link", {
      name: "Go To The Research Catalog",
    });
    this.closeAccountButton = page.getByRole("button", { name: "Close" });
    this.locations = page.getByRole("link", { name: "Locations" });
    this.libraryCard = page.getByRole("link", {
      name: "Get A Library Card",
    });
    this.newsletter = page.getByRole("link", {
      name: "Get Email Updates",
    });
    this.donate = page.getByRole("link", { name: "Donate" });
    this.shop = page.getByRole("link", { name: "Shop" });
    this.books = page.getByRole("link", { name: "Books/Music/Movies" });
    this.research = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Research" });
    this.education = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Education" });
    this.events = page.getByLabel("Header bottom links").getByRole("link", {
      name: "Events",
    });
    this.connect = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Connect" });
    this.give = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Give" });
    this.getHelp = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Get Help" });
    this.searchButton = page.getByRole("button", { name: "Open Search" });
    this.closeSearchButton = page.getByRole("button", { name: "Close Search" });
    this.searchInput = page.getByRole("textbox", {
      name: "Enter Search Keyword",
    });
    this.searchSubmitButton = page.getByRole("button", {
      name: "Search",
      exact: true,
    });
    this.searchCatalogRadio = page.getByLabel(
      "Search books, music, and movies",
    );
    this.searchResearchRadio = page.getByLabel("Search the Research Catalog");
    this.searchWebRadio = page.getByLabel("Search the library website");
  }

  async goto() {
    await this.page.goto("/");
  }
}
