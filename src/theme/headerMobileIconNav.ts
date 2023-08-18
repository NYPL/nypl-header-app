import { headerFocus } from "./header";

const HeaderMobileIconNav = {
  baseStyle: {
    button: {
      minHeight: "44px",
      minWidth: "44px",
    },
    "> a": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "44px",
      minWidth: "44px",
      _focus: headerFocus,
    },
    _dark: {
      svg: {
        fill: "dark.ui.typography.heading",
      },
    },
  },
};

export default HeaderMobileIconNav;
