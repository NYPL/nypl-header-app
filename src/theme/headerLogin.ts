import { headerBlack, headerBlue, headerFocusColor, headerRed } from "./header";

const loginFocus = () => ({
  boxShadow: { base: null, mb: `1px 1px 2px 2px ${headerFocusColor}` },
  outline: { base: "inset", mb: "none" },
  outlineStyle: { base: "solid", mb: null },
  outlineWidth: { base: "0.1875em", mb: null },
});

const HeaderLogin = {
  parts: ["logoutButton", "patronGreeting"],
  baseStyle: ({ patronName }) => ({
    bg: { base: headerBlack, mb: headerBlue },
    boxShadow: { base: "2px 2px 3px 4px rgb(100 100 100 / 25%)", mb: "none" },
    display: { base: "block", mb: "flex" },
    flexDirection: "column",
    left: { base: "0", mb: null },
    marginTop: { mb: "1px" },
    minHeight: { base: "215px", mb: "175px" },
    minWidth: { base: "100%", mb: "360px" },
    position: "absolute",
    padding: { base: "0", mb: "20px 10px 20px 30px" },
    zIndex: "9999",
    ul: {
      display: { base: "grid", mb: "block" },
      marginBottom: "0",
      marginTop: {
        base: !patronName ? "60px" : "0",
        mb: !patronName ? "10px" : "0",
      },
      width: "100%",
      li: {
        _first: {
          gridColumn: { base: "1 / span 1", mb: null },
        },
        _last: {
          gridColumn: { base: "2 / span 1", mb: null },
        },
      },
    },
    li: {
      _notFirst: {
        marginLeft: { base: "5px", mb: "0" },
        marginTop: { base: "0", mb: "s" },
      },
    },
    "li a": {
      alignItems: "center",
      border: { base: "none", mb: "2px" },
      borderColor: "ui.white",
      borderRadius: { base: "0", mb: "28px" },
      bg: { base: headerRed, mb: "inherit" },
      color: "ui.white",
      display: "flex",
      fontSize: "14px",
      fontWeight: "medium",
      justifyContent: { mb: "center" },
      lineHeight: { base: "normal", mb: "1.5" },
      marginTop: { base: "0" },
      minHeight: { base: "105px", mb: "45px" },
      padding: { base: "10px", mb: "10px 20px" },
      textTransform: "uppercase",
      whiteSpace: "normal",
      width: "100%",
      svg: {
        marginRight: { base: "10px", mb: null },
      },
      span: {
        width: { base: "100px", mb: "auto" },
      },
      _hover: {
        bg: { base: headerRed, mb: "transparent" },
        color: "ui.white",
      },
      _focus: {
        ...loginFocus(),
        borderRadius: { base: "0", mb: "28px" },
      },
      _dark: {
        bgColor: { base: "brand.secondary", mb: "dark.ui.link.primary" },
        color: { base: "ui.white", mb: "ui.gray.xx-dark" },
        svg: {
          fill: { base: "ui.white", mb: "ui.gray.xx-dark" },
        },
        _hover: {
          bgColor: { base: "brand.primary", mb: "dark.ui.link.secondary" },
          color: { base: "ui.white", mb: "ui.gray.xx-dark" },
        },
      },
    },
    patronGreeting: {
      alignSelf: "flex-start",
      color: "ui.white",
      fontSize: { base: "16px", mb: "14px" },
      fontWeight: "medium",
      lineHeight: "1.5em",
      margin: { base: "10px", mb: "0 0 10px" },
      minHeight: { base: "100px", mb: "55px" },
      textAlign: "left",
      textTransform: "none",
      width: { mb: "100%" },
      _focus: loginFocus(),
      ".greeting": {
        fontStyle: "italic",
        margin: { base: "10px 0 25px 0", mb: "0 0 5px" },
      },
      ".name": {
        margin: 0,
      },
    },
    logoutButton: {
      alignSelf: "flex-start",
      bg: { base: "ui.black", mb: "ui.white" },
      borderRadius: { base: "0", mb: "28px" },
      color: { base: "ui.white", mb: `${headerBlue} !important` },
      fontSize: { base: "18px", mb: "14px" },
      marginTop: { base: "5px", mb: "25px" },
      marginBottom: { base: "0", mb: "10px" },
      padding: { base: "30px", mb: null },
      textDecoration: { base: "underline", mb: null },
      textTransform: "uppercase",
      width: { base: "100%", mb: "140px" },
      svg: {
        fill: headerBlue,
      },
      _hover: {
        bg: { base: "ui.black", mb: "ui.white" },
        color: { base: "ui.white", mb: headerBlue },
        textDecoration: { base: "underline", mb: null },
      },
      _focus: {
        ...loginFocus(),
        borderRadius: { base: "0", mb: "28px !important" },
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
