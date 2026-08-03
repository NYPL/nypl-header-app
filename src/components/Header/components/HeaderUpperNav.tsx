import { Box, chakra, useMultiStyleConfig } from "@chakra-ui/react";

import HeaderLoginButton from "./HeaderLoginButton";
import { upperNavLinks } from "../utils/headerUtils";
import { List } from "@nypl/design-system-react-components";
import ListLink from "../../shared/ListLink";

/**
 * This renders the navigational list of links for logging in, subscribing
 * to the email service, going to the Locations page, getting a Library card,
 * donating, and shopping at NYPL.
 */
const HeaderUpperNav = chakra(() => {
  const styles = useMultiStyleConfig("HeaderUpperNav", {});

  const listItems = upperNavLinks.map((item) => <ListLink linkItem={item} {...(item.text.match(/donate/i) && {isDonateLink: true, additionalStyles: styles.donateLink})}/>);

  return (
    <Box as="nav" aria-label="Header top links" __css={styles}>
      <List
        id="header-nav-upper"
        inline
        listItems={[<HeaderLoginButton key="login" />,...listItems]}
        noStyling
        type="ul"
      />
    </Box>
  );
});

export default HeaderUpperNav;
