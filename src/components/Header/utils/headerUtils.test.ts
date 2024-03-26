import {
  getEncoreCatalogURL,
  getNYPLSearchURL,
  getResearchCatalogURL,
} from "./headerUtils";

describe("Header utils", () => {
  describe("getEncoreCatalogURL", () => {
    const currentDate = new Date("2022-01-01");
    let realDate;

    beforeAll(() => {
      realDate = Date;
      (global as any).Date = class extends Date {
        constructor(date) {
          super(date);
          return currentDate;
        }
      };
    });
    afterAll(() => {
      // Restore the `Date` class.
      (global as any).Date = realDate;
    });

    it("should return a URL for the Encore catalog", () => {
      const searchValue = "foo bar";
      const url = getEncoreCatalogURL(searchValue);
      expect(url).toEqual(
        "https://browse.nypl.org/iii/encore/search/C__Sfoo bar__Orightresult__U?searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });

    it("should return a URL for the Encore catalog with special characters", () => {
      const searchValue = "foo bar/\\?=";
      const url = getEncoreCatalogURL(searchValue);
      expect(url).toEqual(
        "https://browse.nypl.org/iii/encore/search/C__Sfoo bar/\\Pw===__Orightresult__U?searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });
  });

  describe("getResearchCatalogURL", () => {
    const currentDate = new Date("2022-01-01");
    let realDate;

    beforeAll(() => {
      realDate = Date;
      (global as any).Date = class extends Date {
        constructor(date) {
          super(date);
          return currentDate;
        }
      };
    });
    afterAll(() => {
      // Restore the `Date` class.
      (global as any).Date = realDate;
    });

    it("should return a URL for the Encore catalog", () => {
      const searchValue = "foo bar";
      const url = getResearchCatalogURL(searchValue);
      expect(url).toEqual(
        "https://www.nypl.org/research/research-catalog/search?q=foo%20bar&?searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });

    it("should return a URL for the Encore catalog with special characters", () => {
      const searchValue = "foo bar/\\?=";
      const url = getResearchCatalogURL(searchValue);
      expect(url).toEqual(
        "https://www.nypl.org/research/research-catalog/search?q=foo%20bar%2F%5C%3F%3D&?searched_from=header_search&timestamp=1640995200000&lang=eng"
      );
    });
  });

  describe("getNYPLSearchURL", () => {
    const currentDate = new Date("2022-01-01");
    let realDate;

    beforeAll(() => {
      realDate = Date;
      (global as any).Date = class extends Date {
        constructor(date) {
          super(date);
          return currentDate;
        }
      };
    });
    afterAll(() => {
      // Restore the `Date` class.
      (global as any).Date = realDate;
    });

    it("should return a URL for the NYPL catalog", () => {
      const searchValue = "foo bar";
      const url = getNYPLSearchURL(searchValue);
      expect(url).toEqual(
        "//www.nypl.org/search/foo%20bar?searched_from=header_search&timestamp=1640995200000"
      );
    });

    it("should return a URL for the NYPL catalog with special characters", () => {
      const searchValue = "foo bar/\\?=";
      const url = getNYPLSearchURL(searchValue);
      expect(url).toEqual(
        "//www.nypl.org/search/foo%20bar%2F%5C%3F%3D?searched_from=header_search&timestamp=1640995200000"
      );
    });
  });
});
