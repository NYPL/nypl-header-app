import { headerFocus, headerRed, headerRedDarkMode } from "./header";

const linkFocusHoverStyles = {
  borderBottom: "3px solid",
  color: headerRed,
  paddingBottom: "2px",
  textDecoration: "none",
  _dark: {
    color: headerRedDarkMode,
  },
};

const HeaderLowerNav = {
  baseStyle: {
    ul: {
      alignItems: "center",
      marginBottom: "xxs",
      marginLeft: "auto",
      whiteSpace: "nowrap",
    },
    li: {
      marginLeft: "xxs",
    },
    "li > a": {
      color: "ui.black",
      fontSize: "desktop.subtitle.subtitle2",
      fontWeight: "medium",
      textDecoration: "none",
      _hover: linkFocusHoverStyles,
      _focus: {
        ...headerFocus,
        ...linkFocusHoverStyles,
      },
      _dark: {
        color: "dark.ui.typography.heading",
        _hover: linkFocusHoverStyles,
        _focus: {
          ...headerFocus,
          ...linkFocusHoverStyles,
        },
      },
    },
  },
};

export default HeaderLowerNav;
