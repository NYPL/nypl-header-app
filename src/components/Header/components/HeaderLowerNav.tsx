import { useEffect, useState } from "react";
import { Box, chakra, useStyleConfig } from "@chakra-ui/react";

import HeaderSearchButton from "./HeaderSearchButton";
import { siteNavLinks } from "../utils/headerUtils";
import { List, Select } from "@nypl/design-system-react-components";
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

  const [language, setLanguage] = useState(getInitialLanguage);

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
  }, []);

  // Triggers Google Translate by selecting the language in its hidden widget select
  const handleTranslate = (e) => {
    console.log(e.target.value);
    const lang = e.target.value;
    setLanguage(lang);
    if (!lang) return;

    const googleSelect =
      document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (googleSelect) {
      googleSelect.value = lang;
      googleSelect.dispatchEvent(new Event("change"));
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
          <Box
            key="translate"
            className="notranslate"
            translate="no"
            minWidth="130px"
          >
            <Select
              id="google-translate-select"
              onChange={handleTranslate}
              labelText="Translate Page"
              name="language"
              showLabel={false}
              value={language}
            >
              <option value="" disabled>
                Translate
              </option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="zh-CN">Chinese (Simplified)</option>
              <option value="zh-TW">Chinese (Traditional)</option>
              <option value="ru">Russian</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="ht">Haitian Creole</option>
              <option value="ko">Korean</option>
              <option value="ur">Urdu</option>
            </Select>
          </Box>,
        ]}
        noStyling
        type="ul"
      />
    </Box>
  );
});

export default HeaderLowerNav;
