import { GLOBE_ICON_SVG_URL } from "../components/Header/utils/headerUtils";

const GTranslate = {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    gap: "xxxs",
    position: "relative",
    minHeight: { base: "60px", mh: undefined },
    minWidth: { base: "60px", mh: undefined },
    justifyContent: { base: "center", mh: undefined },
    _before: {
      content: '""',
      display: "inline-block",
      width: { base: "24px", mh: "16px" },
      height: { base: "24px", mh: "16px" },
      backgroundImage: GLOBE_ICON_SVG_URL,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      flexShrink: 0,
    },
  },
};

export default GTranslate;
