import { Box, chakra, useStyleConfig } from "@chakra-ui/react";

import HeaderSearchButton from "./HeaderSearchButton";
import { siteNavLinks } from "../utils/headerUtils";
import { Link, List } from "@nypl/design-system-react-components";

/**
 * This component renders the navigational list of links used to
 * navigate to different landing pages on NYPL.org.
 */
const HeaderLowerNav = chakra(() => {
  const styles = useStyleConfig("HeaderLowerNav");
  const listItems = siteNavLinks.map(({ href, text }) => (
    <Link href={href} key={text}>
      {text}
    </Link>
  ));

  return (
    <Box as="nav" aria-label="Header bottom links" __css={styles}>
      <List
        id="header-nav-lower"
        inline
        listItems={[...listItems, <HeaderSearchButton key="search" />]}
        noStyling
        type="ul"
      />
    </Box>
  );
});

export default HeaderLowerNav;
