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
  "it",
  "ko",
  "pl",
  "ru",
  "es",
  "ur",
  "yi",
];

// The class GTranslate assigns to the <select> it injects into our wrapper.
export const GT_SELECTOR_CLASS = "gt_selector";

/**
 * GTranslate's <select> options are valued as `defaultLanguage|targetLanguage`
 * (e.g. "en|fr"). Extracts the target language a user selected from that value.
 */
export const getLanguageFromSelectValue = (value: string): string =>
  value.split("|")[1] || "";

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
