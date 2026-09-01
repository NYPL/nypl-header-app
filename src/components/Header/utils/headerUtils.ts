/*eslint no-useless-escape: 0 */
import Cookies from "js-cookie";
import { getEnvVar } from "../../../utils";

const envPrefix = getEnvVar("VITE_APP_ENV") === "qa" ? "qa-" : "";

export interface Alert {
  id: string;
  link: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const alertsApiUrl = `//${envPrefix}drupal.nypl.org/api/alerts/all`;

const authServerBase = {
  production: "https://login.nypl.org/auth",
  development: "https://dev-login.nypl.org/auth",
};
const baseLoginLinks = {
  catalog: {
    production: "https://borrow.nypl.org/?openAccount=checkouts",
    // no dev env yet
    development: "https://borrow.nypl.org/?openAccount=checkouts",
  },
  research: {
    production: "https://catalog.nypl.org/patroninfo/top",
    development: "https://nypl-sierra-test.nypl.org/patroninfo/top",
  },
};
// Return the proper links when logged in or not. These are for the NYPL
// "Log in" or "Go to" links for the Catalog and the Research Catalog. This is
// based on the environment and logged in status.
export const getLoginLinks = (patronName = "", isProduction = true) => {
  const type = isProduction ? "production" : "development";
  const authServerDomain = authServerBase[type];
  const baseCatalogLink = baseLoginLinks.catalog[type];
  const baseResearchLink = baseLoginLinks.research[type];

  return patronName
    ? {
        catalogLink: `${authServerDomain}/login?redirect_uri=${baseCatalogLink}`,
        researchLink: `${authServerDomain}/login?redirect_uri=${baseResearchLink}`,
        logOutLink: `${authServerDomain}/logout`,
      }
    : {
        catalogLink: baseCatalogLink,
        researchLink: baseResearchLink,
        logOutLink: "",
      };
};

export const upperNavMobileLinks = {
  libraryCard: {
    href: `//${envPrefix}www.nypl.org/library-card/new`,
    text: "Get A Library Card",
  },
  emailUpdates: {
    href: "https://pub.email.nypl.org/subscriptioncenter",
    text: "Get Email Updates",
  },
  donate: {
    href: `//${envPrefix}www.nypl.org/donate-button`,
    text: "DONATE",
  },
  shop: {
    href: "https://shop.nypl.org/?utm_campaign=NYPLHeaderButton&utm_source=nypl.org&utm_medium=referral",
    text: "Shop NYPL",
    // Send same value to GA4 as for desktop.
    // Confirmed value with analytics team.
    ga4clickText: "shop",
  },
};

export const upperNavLinks = [
  {
    href: `//${envPrefix}www.nypl.org/locations`,
    text: "Locations",
    key: "locationsLink",
  },
  {
    href: `//${envPrefix}www.nypl.org/library-card/new`,
    text: "Get A Library Card",
    key: "libraryCardLink",
  },
  {
    href: "https://pub.email.nypl.org/subscriptioncenter",
    text: "Get Email Updates",
    key: "emailUpdatesLink",
  },
  {
    href: `//${envPrefix}www.nypl.org/donate-button`,
    text: "Donate",
    key: "donateLink",
  },
  {
    href: "https://shop.nypl.org/?utm_campaign=NYPLHeaderButton&utm_source=nypl.org&utm_medium=referral",
    text: "Shop",
    key: "shopLink",
  },
];

export const siteNavLinks = [
  {
    href: `//${envPrefix}www.nypl.org/books-music-movies`,
    text: "Books/Music/Movies",
  },
  {
    href: `//${envPrefix}www.nypl.org/research`,
    text: "Research",
  },
  {
    href: `//${envPrefix}www.nypl.org/education`,
    text: "Education",
  },
  {
    href: `//${envPrefix}www.nypl.org/events`,
    text: "Events",
  },
  {
    href: `//${envPrefix}www.nypl.org/visit`,
    text: "Visit",
  },
  {
    href: `//${envPrefix}www.nypl.org/give`,
    text: "Give",
  },
  {
    href: `//${envPrefix}www.nypl.org/get-help`,
    text: "Get Help",
  },
];

/**
 * Consts for GTranslate.
 */
export const GTRANSLATE_CDN_URL =
  "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
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
export const GLOBE_ICON_SVG_URL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M7.99353 1.33334C11.6801 1.33343 14.6664 4.32039 14.6664 8.00034C14.6662 11.6801 11.68 14.6663 7.99353 14.6664C4.31364 14.6664 1.33355 11.6802 1.33337 8.00034C1.33337 4.32034 4.31353 1.33334 7.99353 1.33334ZM6.72693 10.6664C7.0136 11.6197 7.44703 12.507 8.00037 13.307C8.5537 12.507 8.98714 11.6197 9.2738 10.6664H6.72693ZM3.38708 10.6664C4.02708 11.773 5.04714 12.6204 6.2738 13.0404C5.8738 12.3004 5.56624 11.4997 5.35291 10.6664H3.38708ZM10.6469 10.6664C10.4335 11.4997 10.1269 12.3004 9.72693 13.0404C10.9536 12.6204 11.9737 11.7663 12.6136 10.6664H10.6469ZM2.84021 6.66635C2.73354 7.09302 2.66638 7.54034 2.66638 8.00034C2.66641 8.46022 2.73357 8.90678 2.84021 9.33334H5.09314C5.03982 8.89346 5.00039 8.45354 5.00037 8.00034C5.00037 7.547 5.03981 7.10635 5.09314 6.66635H2.84021ZM6.43982 6.66635C6.37982 7.09968 6.33337 7.547 6.33337 8.00034C6.3334 8.45354 6.37984 8.89346 6.43982 9.33334H9.55994C9.61992 8.89345 9.66636 8.45355 9.66638 8.00034C9.66638 7.547 9.61994 7.09968 9.55994 6.66635H6.43982ZM10.9066 6.66635C10.9599 7.10635 11.0004 7.547 11.0004 8.00034C11.0003 8.45355 10.9599 8.89345 10.9066 9.33334H13.1605C13.2671 8.90681 13.3333 8.46018 13.3334 8.00034C13.3334 7.54034 13.2672 7.09302 13.1605 6.66635H10.9066ZM6.2738 2.9603C5.0472 3.38028 4.02709 4.22676 3.38708 5.33334H5.35291C5.56623 4.50003 5.87381 3.70028 6.2738 2.9603ZM8.00037 2.6937C7.44707 3.49366 7.01359 4.38007 6.72693 5.33334H9.2738C8.98718 4.38017 8.55357 3.49359 8.00037 2.6937ZM9.72693 2.9603C10.1268 3.70021 10.4335 4.50013 10.6469 5.33334H12.6136C11.9737 4.23343 10.9535 3.38033 9.72693 2.9603Z' fill='black'/%3E%3C/svg%3E")`;
export const GTRANSLATE_CUSTOM_CSS = `
  .gt_selector {
    appearance: none;
    background-color: var(--nypl-colors-ui-bg-default);
    padding: var(--nypl-space-xxxs) var(--nypl-space-xxs) var(--nypl-space-xxxs) 0px;
    width: fit-content;
  }
  .gt_selector:focus,
  .gt_selector:focus-visible {
    outline: none;
  }
  @media (max-width: 960px) {
    .gt_selector {
      background-image: none;
      padding: unset;
      position: absolute;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      max-width: 100%;
    }
  }
`;

/**
 * Generates the queries to be added to the URL of the search pages.
 */
const generateQueriesForTracking = () => {
  // the time stamp here is for the purpose of telling when this search query is made.
  const currentTimeStamp = new Date().getTime();
  return `searched_from=header_search&timestamp=${currentTimeStamp}`;
};

/**
 * Returns the final URL for the NYPL Catalog search.
 */
export const getCatalogURL = (searchValue) => {
  const encodedSearchInput = encodeURIComponent(searchValue);
  const rootUrl = "https://borrow.nypl.org/search";
  let finalUrl;

  if (encodedSearchInput) {
    finalUrl =
      `${rootUrl}?query=${encodedSearchInput}&searchType=everything&pageSize=10&` +
      generateQueriesForTracking() +
      `&lang=eng`;
    return finalUrl;
  }
  return null;
};

/**
 * Returns the final URL for the NYPL Research Catalog search.
 */
export const getResearchCatalogURL = (searchValue) => {
  const catalogUrl = `//${envPrefix}www.nypl.org/research/research-catalog/search?q=`;

  if (searchValue) {
    return `${catalogUrl}${encodeURIComponent(
      searchValue,
    )}&${generateQueriesForTracking()}&lang=eng`;
  }
  return null;
};

/**
 * Returns the final URL for the NYPL catalog search.
 */
export const getNYPLSearchURL = (searchString) => {
  const catalogUrl = `//${envPrefix}www.nypl.org/search/`;

  if (searchString) {
    return (
      catalogUrl +
      encodeURIComponent(searchString) +
      "?" +
      generateQueriesForTracking()
    );
  }
  return null;
};

/**
 * The `alertsApiUrl` fetches NYPL alerts from the Drupal 10 API. This API
 * returns JSONAPI-formatted data. This function parses the JSONAPI data in a
 * very naive and quick way to get the necessary alerts data. The data is then
 * filtered to include active alerts.
 */
export const parseAlertsData = (data: any): Alert[] => {
  const today = new Date();

  if (!data?.data.length) {
    return [];
  }
  // There is an assumption in the JSONAPI data that the description text will
  // be translated into many languages. Only the English description is
  // available so we will use that.
  const alerts = data.data.map((alert) => {
    return {
      id: alert?.id,
      description: alert?.message_html,
      startDate: alert?.alert_date_start,
      endDate: alert?.alert_date_end,
    };
  });

  // Filter alerts based on their timestamps so they are rendered
  // appropriately, no "expired" alert should be rendered.
  const filteredAlerts = alerts.filter((alert) => {
    const startDate = new Date(alert.startDate);
    const endDate = new Date(alert.endDate);
    return (
      startDate.getTime() <= today.getTime() &&
      today.getTime() <= endDate.getTime()
    );
  });

  return filteredAlerts;
};

/**
 * getCookieValue uses the js.cookie package to get the value
 * of the "nyplIdentityPatron" cookie (if it exists) and extract
 * the cookie's `access_token`.
 */
export const getCookieValue = () => {
  const cookieValue = Cookies.get("nyplIdentityPatron");
  const accessToken = cookieValue ? JSON.parse(cookieValue).access_token : "";

  return { cookieValue, accessToken };
};

export const deleteCookieValue = () => {
  Cookies.remove("nyplIdentityPatron");
};
