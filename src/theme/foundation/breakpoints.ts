import { createBreakpoints } from "@chakra-ui/theme-tools";

/**
 * We have to add the DS breakpoint values again because the breakpoint
 * object expects values for sm, md, lg, xl, 2xl. We are only adding two
 * new values, mh and lh for "medium header" and "large header".
 */
export default createBreakpoints({
  sm: "20em",
  md: "37.5em",
  // new Header specific breakpoint
  mh: "52em", // "832px",
  lg: "60em",
  // new Header specific breakpoint
  lh: "64em", // "1024px
  xl: "80em",
  "2xl": "96em",
});
