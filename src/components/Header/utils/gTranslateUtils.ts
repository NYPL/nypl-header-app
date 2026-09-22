/**
 * Consts for GTranslate.
 */
export const GTRANSLATE_CDN_URL =
  "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
export const DEFAULT_LANGUAGE = "en";
export const supportedLanguages = [
  "en",
  "ar",
  "bn",
  "zh-CN",
  "zh-TW",
  "fr",
  "ht",
  "ko",
  "pl",
  "ru",
  "es",
  "ur",
];

// The localStorage key GTranslate uses to persist the user's
// previously selected language.
export const GT_TRANSLATE_LANGS_KEY = "__GT_TRANSLATE_LANGS";

// Maps a lowercased `navigator.language` value to a GTranslate language code,
// mirroring the mapping in GTranslate's script.
const mapBrowserLanguageToGTranslateCode = (browserLanguage: string) => {
  switch (browserLanguage) {
    case "zh":
    case "zh-cn":
      return "zh-CN";
    case "zh-tw":
    case "zh-hk":
      return "zh-TW";
    case "he":
      return "iw";
    default:
      return browserLanguage.substring(0, 2);
  }
};

/**
 * Determines the page's initial language using the same resolution
 * order as GTranslate:
 * 1. A previously selected language, persisted in localStorage.
 * 2. The browser's language setting, if it's one of our supported languages.
 * 3. The site's default language.
 */
export const getInitialPageLanguage = (): string => {
  try {
    const stored = JSON.parse(
      window.localStorage.getItem(GT_TRANSLATE_LANGS_KEY) || "null",
    );
    if (stored && typeof stored.tgtLang === "string") {
      return stored.tgtLang;
    }
  } catch {
    // Ignore malformed localStorage value and fall through to browser detection.
  }

  const browserLanguage = (window.navigator.language || "").toLowerCase();
  const preferredLanguage = mapBrowserLanguageToGTranslateCode(browserLanguage);

  if (
    preferredLanguage !== DEFAULT_LANGUAGE &&
    supportedLanguages.includes(preferredLanguage)
  ) {
    return preferredLanguage;
  }

  return DEFAULT_LANGUAGE;
};

export const GLOBE_ICON_SVG_URL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M7.99353 1.33334C11.6801 1.33343 14.6664 4.32039 14.6664 8.00034C14.6662 11.6801 11.68 14.6663 7.99353 14.6664C4.31364 14.6664 1.33355 11.6802 1.33337 8.00034C1.33337 4.32034 4.31353 1.33334 7.99353 1.33334ZM6.72693 10.6664C7.0136 11.6197 7.44703 12.507 8.00037 13.307C8.5537 12.507 8.98714 11.6197 9.2738 10.6664H6.72693ZM3.38708 10.6664C4.02708 11.773 5.04714 12.6204 6.2738 13.0404C5.8738 12.3004 5.56624 11.4997 5.35291 10.6664H3.38708ZM10.6469 10.6664C10.4335 11.4997 10.1269 12.3004 9.72693 13.0404C10.9536 12.6204 11.9737 11.7663 12.6136 10.6664H10.6469ZM2.84021 6.66635C2.73354 7.09302 2.66638 7.54034 2.66638 8.00034C2.66641 8.46022 2.73357 8.90678 2.84021 9.33334H5.09314C5.03982 8.89346 5.00039 8.45354 5.00037 8.00034C5.00037 7.547 5.03981 7.10635 5.09314 6.66635H2.84021ZM6.43982 6.66635C6.37982 7.09968 6.33337 7.547 6.33337 8.00034C6.3334 8.45354 6.37984 8.89346 6.43982 9.33334H9.55994C9.61992 8.89345 9.66636 8.45355 9.66638 8.00034C9.66638 7.547 9.61994 7.09968 9.55994 6.66635H6.43982ZM10.9066 6.66635C10.9599 7.10635 11.0004 7.547 11.0004 8.00034C11.0003 8.45355 10.9599 8.89345 10.9066 9.33334H13.1605C13.2671 8.90681 13.3333 8.46018 13.3334 8.00034C13.3334 7.54034 13.2672 7.09302 13.1605 6.66635H10.9066ZM6.2738 2.9603C5.0472 3.38028 4.02709 4.22676 3.38708 5.33334H5.35291C5.56623 4.50003 5.87381 3.70028 6.2738 2.9603ZM8.00037 2.6937C7.44707 3.49366 7.01359 4.38007 6.72693 5.33334H9.2738C8.98718 4.38017 8.55357 3.49359 8.00037 2.6937ZM9.72693 2.9603C10.1268 3.70021 10.4335 4.50013 10.6469 5.33334H12.6136C11.9737 4.23343 10.9535 3.38033 9.72693 2.9603Z' fill='black'/%3E%3C/svg%3E")`;
export const GTRANSLATE_CUSTOM_CSS = `
  .gt_selector {
    appearance: none;
  }
  .gt_selector:focus,
  .gt_selector:focus-visible {
    outline: none !important;
  }
  @media (min-width: 64em) {
    .gt_selector {
      background-color: var(--nypl-colors-ui-bg-default);
      padding: var(--nypl-space-xxs) var(--nypl-space-xs) var(--nypl-space-xxs) 0px;
      width: 100%;
    }
  }
  @media (max-width: 63.99em) {
    .gt_selector {
      background-image: none;
      padding: unset;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      max-width: 100%;
    }
  }
`;
