import {
  Box,
  chakra,
  Flex,
  Spacer,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import {
  Logo,
  List,
  SimpleGrid,
  Icon,
} from "@nypl/design-system-react-components";
import ListLink from "../../shared/ListLink";

import { siteNavLinks, upperNavMobileLinks } from "../utils/headerUtils";
/**
 * This component renders the navigational list of links used to navigate
 * NYPL.org for mobile devices.
 */
const HeaderMobileNav = chakra(() => {
  const styles = useMultiStyleConfig("HeaderMobileNav", {});
  const listItems = siteNavLinks.map((item) => (
    <ListLink key={item.text} linkItem={item} />
  ));

  return (
    <Box __css={styles}>
      <Flex>
        <Box>
          <Logo
            aria-label="NYPL Header Logo"
            decorative={false}
            name="nyplTextWhite"
            size="xsmall"
            title="NYPL Header Logo"
            __css={styles.logo}
          />
        </Box>
        <Spacer />
        <nav aria-label="Header mobile links">
          <List
            id="header-mobile-nav"
            listItems={listItems}
            noStyling
            type="ul"
            __css={{
              ...styles.sideNav,
              li: { marginBottom: "unset !important" },
            }}
          />
        </nav>
      </Flex>
      <SimpleGrid gap="0" data-testid="bottomLinks" __css={styles.bottomLinks}>
        <ListLink
          linkItem={upperNavMobileLinks.libraryCard}
          additionalStyles={{
            borderTop: "1px solid rgb(54, 54, 54)",
            borderRight: "1px solid rgb(54, 54, 54)",
            gridColumn: "1 / span 1",
          }}
          icon={
            <Icon
              align="left"
              color="ui.white"
              name="decorativeLibraryCard"
              size="large"
            />
          }
        />
        <ListLink
          linkItem={upperNavMobileLinks.emailUpdates}
          additionalStyles={{
            borderTop: "1px solid rgb(54, 54, 54)",
            gridColumn: "2 / span 1",
          }}
          icon={
            <Icon
              align="left"
              color="ui.white"
              name="decorativeEnvelope"
              size="large"
            />
          }
        />
        <ListLink
          linkItem={upperNavMobileLinks.shop}
          additionalStyles={{
            borderTop: "1px solid rgb(54, 54, 54)",
            gridColumn: "1 / span 2",
          }}
          icon={
            <Icon
              align="left"
              color="ui.white"
              name="decorativeShoppingBag"
              size="large"
            />
          }
        />
        <ListLink
          linkItem={upperNavMobileLinks.donate}
          isDonateLink={true}
          additionalStyles={{ gridColumn: "1 / span 2" }}
        />
      </SimpleGrid>
    </Box>
  );
});

export default HeaderMobileNav;
