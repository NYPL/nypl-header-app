import React, { useEffect, useRef, useState } from "react";
import { Box, chakra, useStyleConfig } from "@chakra-ui/react";
import FocusLock from "@chakra-ui/focus-lock";

import gaUtils from "../utils/googleAnalyticsUtils";
import { Button, Icon, useCloseDropDown } from "@nypl/design-system-react-components";
import HeaderLogin from "./HeaderLogin";

export interface HeaderLoginButtonProps {
  isMobile?: boolean;
}

/**
 * This is the button that will render the login menu when it is clicked
 * and keep focus trapped within the menu. Its display text will be "Log In"
 * when the user is not logged in and "My Account" when the user is logged in.
 */
const HeaderLoginButton = chakra(
  ({ isMobile = false }: HeaderLoginButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const catalogRef = useRef<HTMLDivElement & HTMLAnchorElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const styles = useStyleConfig("HeaderLoginButton", {
      isOpen,
    });
    const desktopIcon = isOpen ? "close" : "arrow";
    const mobileIcon = isOpen ? "close" : "legacyAccountFilled";
    const desktopButtonLabel = isOpen ? "Close" : "My Account";
    const gaAction = isMobile ? "Click" : "My Account";
    const gaLabelBase = isMobile
      ? "clickMyAccount"
      : `MyNyplButton - ${isOpen ? "Closed" : "Open"}`;
    const gaLabel = `${isMobile ? "Mobile " : ""}${gaLabelBase}`;

    useCloseDropDown(setIsOpen, wrapperRef);

    useEffect(() => {
      if (isOpen) {
        catalogRef.current.focus();
      }
    }, [isOpen]);

    return (
      <Box ref={wrapperRef}>
        <FocusLock isDisabled={!isOpen}>
          <Button
            aria-label={desktopButtonLabel}
            buttonType="text"
            id="loginButton"
            onClick={() => {
              gaUtils.trackEvent(gaAction, gaLabel);
              setIsOpen(!isOpen);
            }}
            __css={styles}
          >
            {isMobile ? null : desktopButtonLabel}
            <Icon
              align="right"
              name={isMobile ? mobileIcon : desktopIcon}
              size={isMobile ? "large" : "small"}
              title="Log in to your account"
            />
          </Button>
          {isOpen && (
            <HeaderLogin catalogRef={catalogRef} isMobile={isMobile} />
          )}
        </FocusLock>
      </Box>
    );
  }
);

export default HeaderLoginButton;
