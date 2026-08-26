import { useEffect } from "react";
import { Box, chakra, useStyleConfig } from "@chakra-ui/react";

import HeaderSearchButton from "./HeaderSearchButton";
import { siteNavLinks } from "../utils/headerUtils";
import { Icon, List } from "@nypl/design-system-react-components";
import ListLink from "../../shared/ListLink";
// Type
import type { LinkItem } from "../../shared/ListLink";
/**
 * This component renders the navigational list of links used to
 * navigate to different landing pages on NYPL.org.
 */
const HeaderLowerNav = chakra(() => {
  const styles = useStyleConfig("HeaderLowerNav");
  const getInitialLanguage = () => {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    return match ? match[1] : "en";
  };

  const listItems = siteNavLinks.map((item: LinkItem) => (
    <ListLink key={item.text} linkItem={item} />
  ));

  useEffect(() => {
    // Silent initialization of Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element",
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Removes Google Translate banner
    if (!document.getElementById("google-translate-styles")) {
      const style = document.createElement("style");
      style.id = "google-translate-styles";
      style.textContent = `
        .goog-te-banner-frame, .skiptranslate > iframe, .VIpgJd-yDvfNd-ORT-KO { display: none !important; }
        body { top: 0px !important; position: static !important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Triggers Google Translate by selecting the language in its hidden widget select
  const handleTranslate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (!lang) return;

    const googleSelect =
      document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (googleSelect) {
      googleSelect.value = lang;
      googleSelect.dispatchEvent(new Event("change", { bubbles: true }));

      if (typeof (googleSelect as any).onchange === "function") {
        (googleSelect as any).onchange();
      }
    }
  };

  return (
    <Box as="nav" aria-label="Header bottom links" __css={styles}>
      {/* Hidden element - prevents Google from rendering its frame UI */}
      <div id="google_translate_element" style={{ display: "none" }} />
      <List
        id="header-nav-lower"
        inline
        listItems={[
          ...listItems,
          <HeaderSearchButton key="search" />,
          <Box key="translate" className="notranslate">
            <chakra.select
              appearance="none"
              id="google-translate-select"
              onChange={handleTranslate}
              name="language"
              defaultValue={getInitialLanguage()}
              aria-label="Translate Page"
              fontSize="md"
            >
              <option value="" disabled>
                Translate
              </option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="zh-CN">中文（简体）</option>
              <option value="zh-TW">中文（繁體）</option>
              <option value="ru">Русский</option>
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
              <option value="ht">Kreyòl Ayisyen</option>
              <option value="ko">한국어</option>
              <option value="ur">اردو</option>
            </chakra.select>
          </Box>,
        ]}
        noStyling
        type="ul"
      />
    </Box>
  );
});

export default HeaderLowerNav;
