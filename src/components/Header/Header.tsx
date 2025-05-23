import {
  chakra,
  Box,
  HStack,
  useColorModeValue,
  useMultiStyleConfig,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import {
  useNYPLBreakpoints,
  SkipNavigation,
  Link,
  Logo,
  HorizontalRule,
} from "@nypl/design-system-react-components";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";

/** Internal Header-only components */
import HeaderLowerNav from "./components/HeaderLowerNav";
import HeaderMobileIconNav from "./components/HeaderMobileIconNav";
import HeaderSitewideAlerts from "./components/HeaderSitewideAlerts";
import HeaderUpperNav from "./components/HeaderUpperNav";
/** Internal Header-only utils */
import { HeaderProvider } from "./context/headerContext";
import EncoreCatalogLogOutTimer from "./utils/encoreCatalogLogOutTimer";
import { headerBreakpoints } from "../../theme/foundation/breakpoints";
import { getEnvVar } from "../../utils";

export interface HeaderProps {
  /** Whether to render sitewide alerts or not. True by default. */
  fetchSitewideAlerts?: boolean;
  /** Whether or not the `Header` is in production mode. True by default. */
  isProduction?: boolean;
}

/**
 * The NYPL `Header` component is the top-level component of the site. It
 * contains features for logging in, logging out, searching, and navigating
 * the NYPL.org site.
 */
export const Header = chakra(
  ({ fetchSitewideAlerts = true, isProduction = true }: HeaderProps) => {
    const envPrefix = getEnvVar("VITE_APP_ENV") === "qa" ? "qa-" : "";
    // isLargerThanLarge is greater than 960px
    const { isLargerThanLarge } = useNYPLBreakpoints();
    // The Header's "mobile" is 832px and below.
    const [isLargerThanMobile] = useMediaQuery([
      `(min-width: ${headerBreakpoints.mh})`,
    ]);

    const styles = useMultiStyleConfig("Header", {});
    // Create a new instance of the EncoreCatalogLogOutTimer. The timer will
    // start when the component is mounted. Even though the patron's information
    // is no longer displayed in the header, we still want to make sure that
    // they are logged out in various NYPL sites.
    const encoreCatalogLogOutTimer = new EncoreCatalogLogOutTimer(
      Date.now(),
      false
    );

    // Once the `Header` component is mounted, start a timer that will
    // log the user out of Vega and the NYPL Catalog after 30 minutes.
    useEffect(() => {
      encoreCatalogLogOutTimer.setEncoreLoggedInTimer(window.location.host);
    });

    // We also want to delete a certain log in-related cookie but should
    // actively check and delete it every 3 seconds.
    useEffect(() => {
      const interval = setInterval(() => {
        encoreCatalogLogOutTimer.removeLoggedInCookie();
      }, 3000);
      return () => clearInterval(interval);
    });

    return (
      <HeaderProvider isProduction={isProduction}>
        <Box
          __css={{
            ...styles,
            // For Vega override, this is the browser's default.
            "& > nav li": { marginBottom: "0 !important" },
            "& svg": { verticalAlign: "baseline !important" },
            "& fieldset": {
              marginBottom: "0px !important",
            },
            "& input": {
              marginBottom: "0px !important",
            },
          }}
        >
          <SkipNavigation />
          {fetchSitewideAlerts ? <HeaderSitewideAlerts /> : null}
          <header>
            <HStack __css={styles.container}>
              <Link
                aria-label="The New York Public Library"
                href={`//${envPrefix}www.nypl.org`}
                __css={styles.logo}
              >
                <Logo
                  aria-label="NYPL Header Logo"
                  name={
                    isLargerThanLarge
                      ? useColorModeValue("nyplFullBlack", "nyplFullWhite")
                      : useColorModeValue("nyplLionBlack", "nyplLionWhite")
                  }
                  size={isLargerThanMobile ? "large" : "small"}
                  title="NYPL Header Logo"
                />
              </Link>
              <Spacer />
              {isLargerThanMobile ? (
                <VStack alignItems="end" __css={styles.navContainer}>
                  <HeaderUpperNav />
                  <HeaderLowerNav />
                </VStack>
              ) : (
                <HeaderMobileIconNav envPrefix={envPrefix} />
              )}
            </HStack>
            <HorizontalRule __css={styles.horizontalRule} />
          </header>
        </Box>
      </HeaderProvider>
    );
  }
);

export default Header;
