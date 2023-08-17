/**
 * If the element that should be visually hidden should only be hidden on
 * small screens, then pass in true for the `isMobileOnly` argument. Otherwise,
 * this will set an element to always be visually hidden regardless of the
 * screen size.
 */
const screenreaderOnly = (isMobileOnly = false) => ({
  clip: "rect(1px, 1px, 1px, 1px)",
  height: { base: "1px", mb: isMobileOnly ? "auto" : undefined },
  overflow: "hidden",
  position: {
    base: "absolute !important",
    mb: isMobileOnly ? "relative !important" : undefined,
  },
  width: { base: "1px", mb: isMobileOnly ? "100%" : undefined },
  wordWrap: "normal",
});
const displayScreenreaderOnly = {
  position: "relative !important",
  height: "auto",
  width: "100%",
};
const footerGray = "#54514A";

const Footer = {
  baseStyle: {
    backgroundColor: footerGray,
    boxSizing: "border-box",
    fontFamily: "'system-ui', 'Segoe UI', Tahoma, 'Helvetica', 'arial'",
    fontSize: "text.default",
    fontWeight: "text.default",
    lineHeight: "1.5",
    minHeight: { base: "360px", lg: "420px" },
    padding: { base: "15px 20px 100px", mb: "15px 0", lg: "30px 0" },
    position: "relative",
    _dark: {
      backgroundColor: "dark.ui.bg.default",
    },
    // The two main lists.
    listsContainer: {
      display: "flex",
      flexDirection: { base: "column", xl: "row-reverse" },
      alignItems: { base: "flex-end", xl: "flex-start" },
      marginTop: "75px",
      margin: { mb: "0" },
      right: { mb: "6%" },
      position: { mb: "absolute" },
    },
    // The first list which contains the three lists of text links.
    footerLinksList: {
      fontSize: { base: "14px", mb: "13px", lg: "14px" },
      fontWeight: { lg: "400" },
      lineHeight: { base: "18px", mb: "23px", lg: "30px" },
      marginRight: { xl: "100px" },
      order: { base: "2", mb: "1", xl: "2" },
      textAlign: { base: "right", mb: "left" },
      width: { base: "100%", mb: "auto" },
      li: {
        float: { mb: "left" },
        marginTop: "0 !important",
        width: { mb: "135px", lg: "155px" },
        _first: {
          width: { mb: "110px" },
          marginRight: { lg: "110px", xl: "50px" },
        },
        ":nth-child(2)": {
          marginRight: { lg: "60px", xl: "0" },
        },
      },
    },
    // First link in every list displays in mobile only.
    footerLinksInner: {
      li: {
        ...screenreaderOnly(true),
        _first: {
          ...displayScreenreaderOnly,
        },
      },
    },
    // List of social media icon links.
    socialMediaList: {
      order: "1",
      margin: "20px 0 15px 0",
      marginTop: { mb: "30px", xl: "0" },
      textAlign: { xl: "right" },
      width: { xl: "280px" },
      li: {
        display: "inline-block",
        width: "45px",
        a: {
          display: "block",
          color: "ui.white",
          fontSize: { base: "40px", mb: "50px" },
          lineHeight: "45px",
          textDecoration: "none",
          svg: {
            width: "36px",
            height: "36px",
            _dark: {
              fill: "dark.ui.typography.body",
            },
          },
        },
      },
    },
    // For all links in the footer.
    a: {
      color: "ui.white",
      fontWeight: "400",
      margin: "0 0.2rem",
      textDecoration: "none",
      _hover: {
        color: "ui.white",
        textDecoration: "underline",
      },
      _focus: {
        backgroundColor: footerGray,
        outline: "solid 2px",
        outlineColor: "ui.white",
      },
      _dark: {
        color: "dark.ui.typography.body",
        _hover: {
          color: "dark.ui.typography.body",
        },
      },
    },
    // All SVGs in the footer.
    svg: {
      fill: "ui.white",
      _dark: {
        color: "dark.ui.typography.body",
      },
    },
    // For the floating NYPL logo.
    logoContainer: {
      position: "absolute",
      top: {
        base: "20px",
        lg: "35px",
      },
      left: { mb: "6%" },
      svg: {
        height: { base: "80px", mb: "94px" },
        width: { base: "95px", mb: "115px" },
      },
    },
    // For the facade image and copyright text.
    nyplInfoContainer: {
      color: "ui.white",
      position: { mb: "absolute" },
      left: { mb: "6%" },
      top: { mb: "140px", lg: "170px", xl: "140px" },
      width: { mb: "400px" },
      _dark: {
        color: "dark.ui.typography.body",
      },
      img: {
        bg: "transparent",
        height: "auto",
        width: "100%",
        _dark: {
          opacity: "0.8",
        },
      },
    },
    copyright: {
      margin: "35px 0 0 0",
      fontSize: { base: "12px", mb: "11px", lg: "13px" },
      fontWeight: "regular",
      textAlign: "right",
      p: {
        margin: "0 0 var(--nypl-space-xxs)",
      },
    },
  },
};

export default Footer;
