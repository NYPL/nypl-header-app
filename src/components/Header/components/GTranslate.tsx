import { useEffect, useRef } from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { sendAnalyticsLanguageChangeEvent } from "../../../analytics";
import {
  DEFAULT_LANGUAGE,
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

    const scriptUrl = GTRANSLATE_CDN_URL;

    // Bail if the script is already in the DOM or the widget already
    // initialized. I ran into the issue where I had two select elements.
    // AI told me that removing and re-adding a previously-inserted script tag
    // doesn't cancel its execution once loading has started, so doing that
    // caused GTranslate to run twice and inject a duplicate
    // dropdown into the wrapper.
    if (
      document.querySelector(`script[src="${scriptUrl}"]`) ||
      document.querySelector(".gt_selector")
    ) {
      return;
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
