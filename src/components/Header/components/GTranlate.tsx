import { useEffect, useRef } from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { GTRANSLATE_CDN_URL, supportedLanguages } from "../utils/headerUtils";

const GTranslate = () => {
  const gtranslateRef = useRef<HTMLDivElement>(null);

  const styles = useStyleConfig("GTranslate");

  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      languages: supportedLanguages,
      native_language_names: true,
      wrapper_selector: ".gtranslate_wrapper",
      custom_css: `
    .gt_selector {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7' fill='none'%3E%3Cpath d='M0.541016 0.519409L5.20595 5.37867C5.3861 5.56632 5.69593 5.56632 5.87609 5.37867L10.541 0.519409' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right center;
    width: 105px;
  }
  `,
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
