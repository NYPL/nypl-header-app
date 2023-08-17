import { headerLightBlue, headerBlue, headerFocus } from "./header";

const HeaderSearchForm = {
  parts: ["searchBtn", "form", "radio", "textInput"],
  baseStyle: {
    color: "ui.white",
    backgroundColor: headerBlue,
    left: "0px",
    minHeight: { base: "180px", mb: "235px" },
    position: "absolute",
    whiteSpace: "initial",
    width: "100%",
    zIndex: "99999",
    svg: {
      color: "ui.white",
      fill: "ui.white",
      marginTop: "0",
    },
    form: {
      margin: { mb: "45px auto 40px auto" },
      maxWidth: { mb: "1312px" },
      whiteSpace: "initial",
      "> div": {
        margin: "20px 15px 0",
        marginLeft: { mb: "m", lg: "140px" },
        marginRight: { mb: "m" },
      },
    },
    "#radio-group-search-type": {
      margin: { base: "0 20px 20px", mb: "0" },
    },
    textInput: {
      label: {
        fontSize: {
          base: "heading.callout",
          mb: "heading.secondary",
        },
      },
      input: {
        borderRadius: { mb: "5px" },
        color: "ui.black",
        minHeight: { base: "65px", mb: "60px" },
        paddingLeft: { base: "25px", mb: "15px" },
        _placeholder: {
          fontSize: { base: "20px" },
          fontStyle: "normal",
        },
        _focus: { ...headerFocus, borderRadius: "5px" },
        _hover: { ...headerFocus, borderRadius: "5px" },
        _dark: {
          color: "dark.ui.typography.body",
        },
      },
    },
    searchBtn: {
      alignSelf: "end",
      backgroundColor: "transparent",
      borderColor: "ui.white",
      borderRadius: "100px",
      borderWidth: "2px",
      height: { base: "65px", mb: "60px" },
      marginTop: "40px",
      marginEnd: "0",
      maxHeight: "65px",
      svg: {
        marginTop: "xs",
      },
      width: { base: "65px", mb: "60px" },
      _focus: { ...headerFocus, borderRadius: "100px" },
      _hover: {
        backgroundColor: "transparent",
        ...headerFocus,
        borderRadius: "100px",
      },
    },
    radio: {
      backgroundColor: "white",
      border: "1px solid white",
      _focus: { ...headerFocus, borderRadius: "100px" },
      _hover: { ...headerFocus, borderRadius: "100px" },
    },
    // Specifically target the radio buttons.
    ".chakra-radio": {
      alignItems: "center",
    },
    // Specifically target the radio labels.
    ".chakra-radio__label": {
      fontWeight: "medium",
    },
    mobileBtns: {
      alignItems: "center",
      backgroundColor: headerBlue,
      borderRadius: "0",
      display: "flex",
      fontSize: "16px",
      flex: "1",
      justifyContent: "center",
      padding: "25px 0",
      svg: {
        fill: headerLightBlue,
        marginLeft: "15px",
      },
      _hover: {
        backgroundColor: headerBlue,
      },
      _focus: headerFocus,
    },
    _dark: {
      bgColor: "section.research.secondary",
      color: "ui.white",
      label: {
        color: "ui.white",
      },
    },
  },
};

export default HeaderSearchForm;
