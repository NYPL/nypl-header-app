import { GLOBE_ICON_SVG_URL } from "../components/Header/utils/gTranslateUtils";
import { headerFocus } from "./header";

const GTranslate = {
  baseStyle: {
    backgroundColor: { lh: "ui.bg.default" },
    borderRadius: { lh: "button.default" },
    display: "flex",
    alignItems: "center",
    gap: "xxxs",
    paddingLeft: { lh: "xs" },
    position: "relative",
    _before: {
      content: '""',
      display: "inline-block",
      width: { base: "24px", lh: "16px" },
      height: { base: "24px", lh: "16px" },
      backgroundImage: GLOBE_ICON_SVG_URL,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      flexShrink: 0,
    },
    _focusWithin: headerFocus,
    _focus: { outline: "none" },
    _focusVisible: { outline: "none" },
  },
};

export default GTranslate;
