import { GLOBE_ICON_SVG_URL } from "../components/Header/utils/headerUtils";

const GTranslate = {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    gap: "xxxs",
    _before: {
      content: '""',
      display: "inline-block",
      width: "16px",
      height: "16px",
      backgroundImage: GLOBE_ICON_SVG_URL,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      flexShrink: 0,
    },
  },
};

export default GTranslate;
