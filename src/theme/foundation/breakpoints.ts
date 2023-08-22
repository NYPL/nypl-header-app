import { createBreakpoints } from "@chakra-ui/theme-tools";

export const headerBreakpoints = {
  mh: "52em", // "832px",
  lh: "64em", // "1024px
};

/**
 * We have to add the DS breakpoint values again because the breakpoint
 * object expects values for sm, md, lg, xl, 2xl. We are only adding two
 * new values, mh and lh for "medium header" and "large header".
 */
export default createBreakpoints({
  sm: "20em",
  md: "37.5em",
  // new Header specific breakpoint
  mh: headerBreakpoints.mh,
  lg: "60em",
  // new Header specific breakpoint
  lh: headerBreakpoints.lh,
  xl: "80em",
  "2xl": "96em",
});
