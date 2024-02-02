import { Box, chakra, useMultiStyleConfig } from "@chakra-ui/react";
import React from "react";

import HeaderLoginButton from "./HeaderLoginButton";
import { upperNavLinks } from "../utils/headerUtils";
import {
  List,
  Link,
  Icon,
  ModalTrigger,
  Heading,
  Button,
} from "@nypl/design-system-react-components";

/**
 * This renders the navigational list of links for logging in, subscribing
 * to the email service, going to the Locations page, getting a Library card,
 * donating, and shopping at NYPL.
 */
const HeaderUpperNav = chakra(() => {
  const styles = useMultiStyleConfig("HeaderUpperNav", {});

  return (
    <Box as="nav" aria-label="Header top links" __css={styles}>
      <List
        id="header-nav-upper"
        inline
        listItems={[
          <HeaderLoginButton key="login" />,
          <Link href={upperNavLinks.locations.href} key="locationsLink">
            {upperNavLinks.locations.text}
          </Link>,
          <Link href={upperNavLinks.libraryCard.href} key="libraryCardLink">
            {upperNavLinks.libraryCard.text}
          </Link>,
          <Link href={upperNavLinks.emailUpdates.href} key="emailUpdatesLink">
            {upperNavLinks.emailUpdates.text}
          </Link>,
          <Link
            href={upperNavLinks.donate.href}
            key="donateLink"
            type="buttonCallout"
            __css={styles.donateLink}
          >
            {upperNavLinks.donate.text}
          </Link>,
          <Link href={upperNavLinks.shop.href} key="shopLink">
            {upperNavLinks.shop.text}
          </Link>,
          <ModalTrigger
            buttonText="Open"
            modalProps={{
              bodyContent: (
                <>
                  <p>Do you want to log out?</p>
                  <Button id="logout-btn">Log out</Button>
                </>
              ),
              headingText: "Log out",
            }}
          />,
        ]}
        noStyling
        type="ul"
      />
    </Box>
  );
});

export default HeaderUpperNav;
