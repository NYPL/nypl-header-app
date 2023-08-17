import { headerBlue, headerFocus } from "./header";

const HeaderSearchButton = {
  baseStyle: ({ isOpen }) => ({
    alignItems: "center",
    borderRadius: "0",
    backgroundColor: isOpen ? headerBlue : "transparent",
    color: isOpen ? "ui.white" : "ui.link.primary",
    fontSize: "inherit",
    fontWeight: "medium",
    minHeight: { mb: "40px" },
    minWidth: { mb: "80px" },
    textDecoration: "none",
    _dark: {
      bgColor: isOpen ? "section.research.secondary" : "transparent",
      color: isOpen ? "ui.white" : "dark.ui.link.primary",
    },
    span: {
      alignItems: "center",
      borderBottom: { mb: "1px solid var(--nypl-colors-ui-link-primary)" },
      display: "inline-flex",
      lineHeight: "1.3",
      _dark: {
        borderBottom: isOpen ? "0" : { mb: "3px solid" },
        borderColor: { mb: "dark.ui.link.primary" },
      },
    },
    svg: {
      marginLeft: { base: "0", mb: "xxs" },
      fill: {
        base: isOpen ? "ui.white" : "ui.black",
        mb: isOpen ? "ui.white" : "ui.link.primary",
      },
      _dark: {
        fill: {
          base: isOpen ? "ui.white" : "dark.ui.typography.heading",
          mb: isOpen ? "ui.white" : "dark.ui.link.primary",
        },
      },
    },
    _hover: {
      backgroundColor: isOpen ? headerBlue : "transparent",
      color: isOpen ? "ui.white" : "ui.link.primary",
      textDecoration: "none",
      svg: {
        fill: {
          base: isOpen ? "ui.white" : "ui.black",
          mb: isOpen ? "ui.white" : "ui.link.primary",
        },
      },
      _dark: {
        color: isOpen ? "ui.white" : "dark.ui.link.primary",
        svg: {
          fill: {
            base: isOpen ? "ui.white" : "dark.ui.typography.heading",
            mb: isOpen ? "ui.white" : "dark.ui.link.primary",
          },
        },
      },
    },
    _focus: headerFocus,
  }),
};

export default HeaderSearchButton;
