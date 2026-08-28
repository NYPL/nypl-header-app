import { useEffect, useRef } from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
import {
  supportedLanguages,
  GTRANSLATE_CUSTOM_CSS,
} from "../utils/headerUtils";

export interface GTranslateProps {}

const GTranslate = () => {
  const gtranslateRef = useRef<HTMLDivElement>(null);

  const styles = useStyleConfig("GTranslate");

  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      languages: supportedLanguages,
      native_language_names: true,
      wrapper_selector: ".gtranslate_wrapper",
      custom_css: GTRANSLATE_CUSTOM_CSS,
    };

    const scriptUrl = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptUrl}"]`,
    );

    // If GTranslate already initialized successfully, we're done.
    if (document.querySelector(".gt_selector")) return;

    // Script exists but initialization failed.
    // Remove it so we can execute it again now that the wrapper exists.
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <Box ref={gtranslateRef} className="gtranslate_wrapper" __css={styles} />
  );
};

export default GTranslate;
