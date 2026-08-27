import { useEffect } from "react";

declare global {
  interface Window {
    gtranslateSettings?: {
      default_language: string;
      languages: string[];
      native_language_names: boolean;
      wrapper_selector: string;
    };
  }
}

export default function GTranslate() {
  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      languages: [
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
      ],
      native_language_names: true,
      wrapper_selector: ".gtranslate_wrapper",
    };

    if (!document.querySelector('script[data-gtranslate="true"]')) {
      const script = document.createElement("script");
      script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
      script.defer = true;
      script.dataset.gtranslate = "true";

      document.body.appendChild(script);
    }
  }, []);

  return <div className="gtranslate_wrapper" />;
}
