import { headerBlack, headerBlue, headerFocusColor, headerRed } from "./header";

const loginFocus = () => ({
  boxShadow: { base: null, lh: `1px 1px 2px 2px ${headerFocusColor}` },
  outline: { base: "inset", lh: "none" },
  outlineStyle: { base: "solid", lh: null },
  outlineWidth: { base: "0.1875em", lh: null },
});

const HeaderLogin = {
  parts: ["logoutButton", "patronGreeting"],
  baseStyle: ({ patronName }) => ({
    bg: { base: headerBlack, lh: headerBlue },
    boxShadow: { base: "2px 2px 3px 4px rgb(100 100 100 / 25%)", lh: "none" },
    flexDirection: "column",
    left: { base: "0", lh: null },
    marginTop: { lh: "1px" },
    minHeight: { base: "215px", lh: "175px" },
    minWidth: { base: "100%", lh: "360px" },
    position: "absolute",
    padding: { base: "0", lh: "10px 20px" },
    zIndex: "9999",
    ul: {
      display: { base: "grid", lh: "block" },
      marginBottom: "0",
      marginTop: {
        base: !patronName ? "60px" : "0",
        lh: "0px",
      },
      width: "100%",
      li: {
        _first: {
          gridColumn: { base: "1 / span 1", lh: null },
        },
        _last: {
          gridColumn: { base: "2 / span 1", lh: null },
        },
      },
    },
    li: {
      _first: {
        marginEnd: { base: "5px", lh: "0" },
        marginTop: { base: "xxs", lh: "s" },
        marginBottom: { lh: "s" },
      },
    },
    "li a": {
      alignItems: "center",
      border: { base: "none", lh: "2px" },
      borderColor: "ui.white",
      borderRadius: { base: "0", lh: "28px" },
      bg: { base: headerRed, lh: "inherit" },
      color: "ui.white",
      display: "flex !important",
      fontSize: "14px",
      fontWeight: "medium",
      justifyContent: { lh: "center" },
      lineHeight: { base: "normal", lh: "1.5" },
      marginTop: { base: "0" },
      minHeight: { base: "105px", lh: "45px" },
      padding: { base: "10px", lh: "10px 20px" },
      textTransform: "uppercase",
      whiteSpace: "normal",
      width: "100%",
      maxWidth: "none !important",
      overflowWrap: "normal",
      svg: {
        marginRight: { base: "10px", lh: null },
      },
      span: {
        width: { base: "100px", lh: "auto" },
      },
      _hover: {
        bg: { base: headerRed, lh: "transparent" },
        color: "ui.white",
      },
      _focus: {
        ...loginFocus(),
        borderRadius: { base: "0", lh: "28px" },
      },
      _dark: {
        bgColor: { base: "brand.secondary", lh: "dark.ui.link.primary" },
        color: { base: "ui.white", lh: "ui.gray.xx-dark" },
        svg: {
          fill: { base: "ui.white", lh: "ui.gray.xx-dark" },
        },
        _hover: {
          bgColor: { base: "brand.primary", lh: "dark.ui.link.secondary" },
          color: { base: "ui.white", lh: "ui.gray.xx-dark" },
        },
      },
      _visited: {
        color: "ui.white",
      },
    },
    patronGreeting: {
      alignSelf: "flex-start",
      color: "ui.white",
      fontSize: { base: "16px", lh: "14px" },
      fontWeight: "medium",
      lineHeight: "1.5em",
      margin: { base: "10px", lh: "0 0 10px" },
      minHeight: { base: "100px", lh: "55px" },
      textAlign: "left",
      textTransform: "none",
      width: { lh: "100%" },
      _focus: loginFocus(),
      ".greeting": {
        fontStyle: "italic",
        margin: { base: "10px 0 25px 0", lh: "0 0 5px" },
      },
      ".name": {
        margin: 0,
      },
    },
    logoutButton: {
      alignSelf: "flex-start",
      bg: { base: "ui.black", lh: "ui.white" },
      borderRadius: { base: "0", lh: "28px" },
      color: { base: "ui.white", lh: `${headerBlue} !important` },
      fontSize: { base: "18px", lh: "14px" },
      marginTop: { base: "5px", lh: "25px" },
      marginBottom: { base: "0", lh: "10px" },
      padding: { base: "30px", lh: null },
      textDecoration: { base: "underline", lh: null },
      textTransform: "uppercase",
      width: { base: "100%", lh: "140px" },
      svg: {
        fill: headerBlue,
      },
      _hover: {
        bg: { base: "ui.black", lh: "ui.white" },
        color: { base: "ui.white", lh: headerBlue },
        textDecoration: { base: "underline", lh: null },
      },
      _focus: {
        ...loginFocus(),
        borderRadius: { base: "0", lh: "28px !important" },
      },
      _dark: {
        color: "ui.gray.xx-dark",
        svg: {
          fill: "ui.gray.xx-dark",
        },
        _hover: {
          color: "ui.gray.xx-dark",
        },
      },
    },
  }),
};

export default HeaderLogin;
