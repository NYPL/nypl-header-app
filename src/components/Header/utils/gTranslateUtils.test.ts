import {
  getInitialPageLanguage,
  GT_TRANSLATE_LANGS_KEY,
} from "./gTranslateUtils";

const setBrowserLanguage = (language: string) => {
  Object.defineProperty(window.navigator, "language", {
    value: language,
    configurable: true,
  });
};

describe("gTranslateUtils", () => {
  describe("getInitialPageLanguage", () => {
    afterEach(() => {
      window.localStorage.clear();
    });

    it("returns the previously selected language stored in localStorage over the browser language", () => {
      window.localStorage.setItem(
        GT_TRANSLATE_LANGS_KEY,
        JSON.stringify({ tgtLang: "fr" }),
      );
      setBrowserLanguage("es");

      expect(getInitialPageLanguage()).toEqual("fr");
    });

    it("falls back to the browser language when nothing is stored and it's supported", () => {
      setBrowserLanguage("es-ES");

      expect(getInitialPageLanguage()).toEqual("es");
    });

    it("maps Chinese browser locales to the GTranslate zh-CN code", () => {
      setBrowserLanguage("zh");

      expect(getInitialPageLanguage()).toEqual("zh-CN");
    });

    it("falls back to the default language when the browser language isn't supported", () => {
      setBrowserLanguage("de-DE");

      expect(getInitialPageLanguage()).toEqual("en");
    });

    it("falls back to browser detection when the stored localStorage value is malformed", () => {
      window.localStorage.setItem(GT_TRANSLATE_LANGS_KEY, "not valid json");
      setBrowserLanguage("ko-KR");

      expect(getInitialPageLanguage()).toEqual("ko");
    });
  });
});
