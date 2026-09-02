import { useEffect } from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
import {
  supportedLanguages,
  GTRANSLATE_CUSTOM_CSS,
  GTRANSLATE_CDN_URL,
} from "../utils/headerUtils";

const GTranslate = () => {
  const styles = useStyleConfig("GTranslate");

  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      languages: supportedLanguages,
      native_language_names: true,
      wrapper_selector: ".gtranslate_wrapper",
      custom_css: GTRANSLATE_CUSTOM_CSS,
    };

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

  return <Box className="gtranslate_wrapper" __css={styles} />;
};

export default GTranslate;
