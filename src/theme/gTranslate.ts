import { headerFocus } from "./header";
import globesvg from "../../public/globe.svg";

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
      backgroundImage: `url(${globesvg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      flexShrink: 0,
    },
    _focusWithin: headerFocus,
  },
};

export default GTranslate;
