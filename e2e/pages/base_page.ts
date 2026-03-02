import type { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  // Global header
  readonly nyplLogo: Locator;
  //readonly nyplLogoImg: Locator;
  readonly myAccountButton: Locator;
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

  constructor(page: Page) {
    this.page = page;
    this.nyplLogo = page.getByRole("link", {
      name: "The New York Public Library",
    });
    this.myAccountButton = page.getByRole("button", { name: "My Account" });
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
    this.searchButton = page.locator("#searchButton");
  }

  async goto() {
    await this.page.goto("/");
  }
}
