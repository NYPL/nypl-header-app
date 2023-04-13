import FocusLock from "@chakra-ui/focus-lock";
import { Box, chakra, useStyleConfig } from "@chakra-ui/react";
import { Button, Icon, useCloseDropDown } from "@nypl/design-system-react-components";
import React, { useState, useRef } from "react";

import gaUtils from "../utils/googleAnalyticsUtils";
import HeaderMobileNav from "./HeaderMobileNav";

/**
 * This is the button that will render the navigational list of links
 * when it is clicked and keep focus trapped within the menu.
 */
const HeaderMobileNavButton = chakra(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const styles = useStyleConfig("HeaderMobileNavButton", { isOpen });
  const ref = useRef<HTMLDivElement>(null);

  useCloseDropDown(setIsOpen, ref);

  return (
    <Box ref={ref}>
      <FocusLock isDisabled={!isOpen}>
        <Button
          aria-haspopup="true"
          aria-label={isOpen ? "Close Navigation" : "Open Navigation"}
          aria-expanded={isOpen ? true : null}
          buttonType="text"
          id="mobileNav-btn"
          onClick={() => {
            gaUtils.trackEvent("Click", "Mobile mobileMenu");
            setIsOpen(!isOpen);
          }}
          __css={styles}
        >
          <Icon name={isOpen ? "close" : "utilityHamburger"} size="large" />
        </Button>
        {isOpen && <HeaderMobileNav />}
      </FocusLock>
    </Box>
  );
});

export default HeaderMobileNavButton;
