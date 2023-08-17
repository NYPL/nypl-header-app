import { headerFocus, headerRed } from "./header";

const HeaderUpperNav = {
  parts: ["donateLink", "emailUpdatesLink"],
  baseStyle: {
    ul: {
      alignItems: "center",
      display: "flex",
      marginTop: "s",
      whiteSpace: "nowrap",
    },
    li: {
      fontSize: "desktop.body.body2",
      fontWeight: "medium",
      position: "relative",
    },
    a: {
      color: "ui.black",
      margin: "0 6px",
      position: "relative",
      textDecoration: "none",
      _hover: {
        color: "ui.black",
        textDecoration: "none",
      },
      _focus: headerFocus,
      _dark: {
        color: "dark.ui.typography.heading",
        _hover: {
          color: "dark.ui.typography.heading",
        },
      },
    },
    svg: {
      marginTop: "0",
      _dark: {
        fill: "white",
      },
    },
    donateLink: {
      _hover: {
        color: "var(--nypl-colors-ui-white) !important",
      },
      _dark: {
        bgColor: "brand.secondary",
        _hover: {
          bgColor: "brand.primary",
        },
      },
    },
  },
};

export default HeaderUpperNav;
