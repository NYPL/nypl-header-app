import { GLOBE_ICON_SVG_URL } from "../components/Header/utils/headerUtils";
import { headerFocus } from "./header";

const GTranslate = {
  baseStyle: {
    backgroundColor: { lg: "var(--nypl-colors-ui-bg-default)" },
    borderRadius: { lg: "var(--nypl-radii-sm)" },
    display: "flex",
    alignItems: "center",
    gap: "xxxs",
    paddingLeft: { lg: "xxxs" },
    position: "relative",
    _before: {
      content: '""',
      display: "inline-block",
      width: { base: "24px", lg: "16px" },
      height: { base: "24px", lg: "16px" },
      backgroundImage: GLOBE_ICON_SVG_URL,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      flexShrink: 0,
    },
    _focusWithin: headerFocus,
  },
};

export default GTranslate;
