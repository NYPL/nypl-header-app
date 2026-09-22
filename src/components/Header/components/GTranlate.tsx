import { useEffect, useRef } from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
import {
  sendAnalyticsLanguageChangeEvent,
  sendAnalyticsPageLanguageEvent,
} from "../../../analytics";
import {
  DEFAULT_LANGUAGE,
  getInitialPageLanguage,
  getLanguageFromSelectValue,
  GT_SELECTOR_CLASS,
  GTRANSLATE_CDN_URL,
  GTRANSLATE_CUSTOM_CSS,
  supportedLanguages,
} from "../utils/gTranslateUtils";

const GTranslate = () => {
  const styles = useStyleConfig("GTranslate");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.gtranslateSettings = {
      default_language: DEFAULT_LANGUAGE,
      languages: supportedLanguages,
      native_language_names: true,
      wrapper_selector: ".gtranslate_wrapper",
      custom_css: GTRANSLATE_CUSTOM_CSS,
      detect_browser_language: true,
    };

    // Fire once per mount to capture the initial page language
    sendAnalyticsPageLanguageEvent(getInitialPageLanguage());

    const scriptUrl = GTRANSLATE_CDN_URL;
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptUrl}"]`,
    );

    // If GTranslate already initialized successfully, we're done.
    if (document.querySelector(".gt_selector")) return;

    // Script was added but the widget didn't initialize — likely because
    // .gtranslate_wrapper wasn't in the DOM yet when the script ran. Remove and
    // re-add/run the script now that the wrapper exists.
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleLanguageChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      if (!target.classList?.contains(GT_SELECTOR_CLASS)) return;

      const language = getLanguageFromSelectValue(target.value);
      if (language) {
        sendAnalyticsLanguageChangeEvent(language);
      }
    };

    wrapper.addEventListener("change", handleLanguageChange);
    return () => wrapper.removeEventListener("change", handleLanguageChange);
  }, []);

  return <Box ref={wrapperRef} className="gtranslate_wrapper" __css={styles} />;
};

export default GTranslate;
