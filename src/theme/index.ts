import Footer from "./footer";
import Header from "./header";
import HeaderLogin from "./headerLogin";
import HeaderLoginButton from "./headerLoginButton";
import HeaderLowerNav from "./headerLowerNav";
import HeaderMobileIconNav from "./headerMobileIconNav";
import HeaderMobileNav from "./headerMobileNav";
import HeaderMobileNavButton from "./headerMobileNavButton";
import HeaderSearchButton from "./headerSearchButton";
import HeaderSearchForm from "./headerSearchForm";
import HeaderSitewideAlerts from "./headerSitewideAlerts";
import HeaderUpperNav from "./headerUpperNav";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const theme: any = {
  breakpoints: createBreakpoints({
    sm: "20em",
    md: "37.5em",
    mb: "52em", // "832px",
    lg: "60em",
    xl: "80em",
    "2xl": "96em",
  }),
  components: {
    Footer,
    Header,
    HeaderLogin,
    HeaderLoginButton,
    HeaderLowerNav,
    HeaderMobileIconNav,
    HeaderMobileNav,
    HeaderMobileNavButton,
    HeaderSearchButton,
    HeaderSearchForm,
    HeaderSitewideAlerts,
    HeaderUpperNav,
  },
};

export default theme;
