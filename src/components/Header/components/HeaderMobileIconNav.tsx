import { chakra, Flex, useStyleConfig } from "@chakra-ui/react";

import HeaderLoginButton from "./HeaderLoginButton";
import HeaderMobileNavButton from "./HeaderMobileNavButton";
import HeaderSearchButton from "./HeaderSearchButton";
import { Link, Icon } from "@nypl/design-system-react-components";

/**
 * This component renders the mobile list of icon buttons for
 * logging in, searching, and navigating on NYPL.org.
 */
const HeaderMobileIconNav = chakra(({ envPrefix }) => {
  const styles = useStyleConfig("HeaderMobileIconNav");

  return (
    <Flex sx={styles}>
      <HeaderLoginButton isMobile />
      <Link
        aria-label="NYPL Locations Near Me"
        href={`//${envPrefix}www.nypl.org/locations`}
      >
        <Icon name="mapsPlace" size="large" title="NYPL Locator" />
      </Link>
      <HeaderSearchButton isMobile />
      <HeaderMobileNavButton />
    </Flex>
  );
});

export default HeaderMobileIconNav;
