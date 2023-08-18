import { headerBlack, headerDarkBlue, headerFocus } from "./header";

const HeaderLoginButton = {
  baseStyle: ({ isOpen }) => ({
    alignItems: { base: "center" },
    bg: {
      base: isOpen ? headerBlack : "ui.white",
      mb: isOpen ? headerDarkBlue : "ui.white",
    },
    borderRadius: "none",
    color: isOpen ? "ui.white" : "ui.black",
    fontSize: "desktop.body.body2",
    fontWeight: "medium",
    minHeight: { mb: "auto" },
    paddingY: { mb: "10px" },
    svg: {
      fill: isOpen ? "ui.white" : null,
      marginLeft: { base: "0px", mb: "5px" },
      marginTop: { base: "0" },
    },
    textDecoration: "none",
    textTransform: "inherit",
    _hover: {
      backgroundColor: {
        base: isOpen ? headerBlack : "transparent",
        mb: isOpen ? headerDarkBlue : "transparent",
      },
      color: isOpen ? "ui.white" : "initial",
      svg: {
        fill: isOpen ? "ui.white" : "ui.black",
      },
      textDecoration: "none",
    },
    _focus: headerFocus,
    _dark: {
      bg: {
        base: isOpen ? headerBlack : "transparent",
        mb: isOpen ? headerDarkBlue : "transparent",
      },
      color: "dark.ui.typography.heading",
      svg: {
        fill: isOpen ? "dark.ui.typography.heading" : null,
      },
      _hover: {
        svg: {
          fill: "dark.ui.typography.heading",
        },
      },
    },
  }),
};

export default HeaderLoginButton;
