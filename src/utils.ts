// This is used just for the app's environment value, either
// qa or production. This function is needed to get around jest
// throwing an error trying to load a cjs module (and this syntax
// is also Vite-specific).
export const getEnvVar = (key: string) => {
  return import.meta.env[key];
};

// GA4 custom `nav_click` event
const DEFAULT_CLICK_URL = "(not set)";
const HTTP_URL_PREFIX = "https:";
const isHttpUrl = (url: string) =>
  new RegExp(`^${HTTP_URL_PREFIX}`, "i").test(url);

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
      ? isHttpUrl(clickUrl)
        ? clickUrl
        : HTTP_URL_PREFIX + clickUrl
      : DEFAULT_CLICK_URL;

    window.dataLayer.push({
      event: "nav_click",
      click_text: clickText.toLowerCase(),
      click_url: finalClickUrl,
      // `element_placement` is always "header" until we add the footer
      element_placement: "header",
    });
  }
};
