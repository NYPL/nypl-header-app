import FocusLock from "@chakra-ui/focus-lock";
import { Box, chakra, useStyleConfig } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

import HeaderSearchForm from "./HeaderSearchForm";
import {
  Button,
  Icon,
  useCloseDropDown,
} from "@nypl/design-system-react-components";

import { sendAnalyticsNavClickEvent } from "../../../utils";

export interface HeaderSearchButtonProps {
  isMobile?: boolean;
}

/**
 * This is the button that will render the search form when it is clicked and
 * keep focus trapped within the menu.
 */
const HeaderSearchButton = chakra(
  ({ isMobile = false }: HeaderSearchButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const styles = useStyleConfig("HeaderSearchButton", { isOpen });
    const buttonText = isMobile ? null : isOpen ? "Close" : "Search";
    const labelText = isOpen ? "Close Search" : "Open Search";
    const ref = useRef<HTMLDivElement>(null);

    useCloseDropDown(setIsOpen, ref);

    useEffect(() => {
      if (!isOpen) return;
      // Re-trigger Google Translate on newly mounted dropdown content
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo?.value && combo.value !== "en") {
        setTimeout(() => combo.dispatchEvent(new Event("change")), 0);
      }
    }, [isOpen]);

    return (
      <Box ref={ref}>
        <FocusLock isDisabled={!isOpen}>
          <Button
            aria-haspopup="true"
            aria-label={labelText}
            aria-expanded={isOpen ? true : null}
            buttonType="text"
            id="searchButton"
            onClick={() => {
              !isOpen && sendAnalyticsNavClickEvent({ clickText: "search" });
              setIsOpen(!isOpen);
            }}
            __css={{
              ...styles,
              color: isOpen
                ? "var(--nypl-colors-ui-white) !important"
                : "ui.link.primary",
              border: "none !important",
              letterSpacing: 0,
              padding: "0px",
              paddingInlineEnd: "0px",
            }}
          >
            <span>
              {buttonText}
              <Icon
                align={isMobile ? "none" : "right"}
                name={isOpen ? "close" : "actionSearch"}
                size={isMobile ? "large" : "medium"}
                title={labelText}
              />
            </span>
          </Button>
          {isOpen && <HeaderSearchForm isMobile={isMobile} />}
        </FocusLock>
      </Box>
    );
  },
);

export default HeaderSearchButton;
