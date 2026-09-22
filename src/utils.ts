// This is used just for the app's environment value, either
// qa or production. This function is needed to get around jest
// throwing an error trying to load a cjs module (and this syntax
// is also Vite-specific).
export const getEnvVar = (key: string) => {
  return import.meta.env[key];
};

/**
 * Converts all string values in a parameter object to lowercase,
 */
const toLowerCaseParameters = (
  parameters: Record<string, any>,
): Record<string, any> =>
  Object.entries(parameters).reduce(
    (lowerCaseParameters: Record<string, any>, [key, value]) => {
      if (typeof value !== "string") {
        lowerCaseParameters[key] = value;
      } else {
        lowerCaseParameters[key] = value.toLowerCase();
      }
      return lowerCaseParameters;
    },
    {},
  );

const sendGaEvent = (event): void => {
  const { eventType, eventParameters } = event;
  const lowerCaseParameters = toLowerCaseParameters(eventParameters);
  // with GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventType,
    ...lowerCaseParameters,
  });
};

// GA4 custom `nav_click` event
const DEFAULT_CLICK_URL = "(not set)";
const HTTPS_URL_PREFIX = "https:";
const isHttpsUrl = (url: string) =>
  new RegExp(`^${HTTPS_URL_PREFIX}`, "i").test(url);

type NavClickCustomParameters = {
  clickText: string;
  clickUrl?: string;
};
export const sendAnalyticsNavClickEvent = ({
  clickText,
  clickUrl,
}: NavClickCustomParameters) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    // Update clickUrl to include the https prefix
    const finalClickUrl = clickUrl
      ? isHttpsUrl(clickUrl)
        ? clickUrl
        : HTTPS_URL_PREFIX + clickUrl
      : DEFAULT_CLICK_URL;

    sendGaEvent({
      eventType: "nav_click",
      eventParameters: {
        click_text: clickText,
        click_url: finalClickUrl,
        // `element_placement` is always "header" until we add the footer
        element_placement: "header",
      },
    });
  }
};

export const sendAnalyticsPageLanguageEvent = (pageLanguage: string) => {
  if (typeof window !== "undefined") {
    sendGaEvent({
      eventType: "page_language",
      eventParameters: {
        page_language: pageLanguage,
      },
    });
  }
};
