import React from "react";
import { chakra, Flex, useStyleConfig } from "@chakra-ui/react";

import HeaderLoginButton from "./HeaderLoginButton";
import HeaderMobileNavButton from "./HeaderMobileNavButton";
import HeaderSearchButton from "./HeaderSearchButton";
import gaUtils from "../utils/googleAnalyticsUtils";
import { Link, Icon } from "@nypl/design-system-react-components";

/**
 * This component renders the mobile list of icon buttons for
 * logging in, searching, and navigating on NYPL.org.
 */
const HeaderMobileIconNav = chakra(() => {
  const styles = useStyleConfig("HeaderMobileIconNav");

  return (
    <Flex sx={styles}>
      <HeaderLoginButton isMobile />
      <Link
        aria-label="NYPL Locations Near Me"
        href="https://nypl.org/locations"
        onClick={() => gaUtils.trackEvent("Click", "Mobile Locations Button")}
      >
        <Icon name="locator" size="large" title="NYPL Locator" />
      </Link>
      <HeaderSearchButton isMobile />
      <HeaderMobileNavButton />
    </Flex>
  );
});

export default HeaderMobileIconNav;
