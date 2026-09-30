// Reservoir's `SkipNavigation` hides the link by pushing it off-screen with
// `left: -10000px`. That works fine in LTR layouts because the browser's scroll
// origin is anchored at the left edge. However, in RTL layouts, the scroll
// origin flips to the right edge and negative horizontal scroll positions
// become reachable, letting users scroll left into -10000px of empty space.
// For the time-being, override `left` with the clip-based visually-hidden
// technique so we can avoid an off-canvas offset and scrollable overflow.
// This should probably be updated in Reservoir eventually [OW – 9/26].
const SkipNavigation = {
  baseStyle: {
    a: {
      clip: "rect(0, 0, 0, 0)",
      clipPath: "inset(50%)",
      left: "0",
      whiteSpace: "nowrap",
      _focus: {
        clip: "auto",
        clipPath: "none",
        whiteSpace: "normal",
      },
    },
  },
};

export default SkipNavigation;
