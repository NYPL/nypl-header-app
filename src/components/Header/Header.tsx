import {
  chakra,
  Box,
  HStack,
  useColorModeValue,
  useMultiStyleConfig,
  Spacer,
  VStack,
} from "@chakra-ui/react";

/** Internal Header-only components */
import HeaderLowerNav from "./components/HeaderLowerNav";
import HeaderMobileIconNav from "./components/HeaderMobileIconNav";
import HeaderSitewideAlerts from "./components/HeaderSitewideAlerts";
import HeaderUpperNav from "./components/HeaderUpperNav";
/** Internal Header-only utils */
import { HeaderProvider } from "./context/headerContext";
import { useNYPLBreakpoints, SkipNavigation, Link, Logo, HorizontalRule } from "@nypl/design-system-react-components";

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
  ({
    fetchSitewideAlerts = true,
    isProduction = true,
  }: HeaderProps) => {
    const { isLargerThanMobile, isLargerThanLarge } = useNYPLBreakpoints();
    const styles = useMultiStyleConfig("Header", {});

    return (
      <HeaderProvider isProduction={isProduction}>
        <Box __css={styles}>
          <SkipNavigation />
          {fetchSitewideAlerts ? <HeaderSitewideAlerts /> : null}
          <header>
            <HStack __css={styles.container}>
              <Link
                aria-label="The New York Public Library"
                href="https://nypl.org"
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
                <VStack
                  alignItems="end"
                  spacing={isLargerThanLarge ? "85px" : "40px"}
                >
                  <HeaderUpperNav />
                  <HeaderLowerNav />
                </VStack>
              ) : (
                <HeaderMobileIconNav />
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
