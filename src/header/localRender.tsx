import React from 'react'
import ReactDOM from 'react-dom'
import HeaderApp from './HeaderApp'
// declare global {
//   interface Window {
//       adobeDataLayer: any;
//   }
// }

ReactDOM.render(
  <HeaderApp />,
  document.getElementById('root') as any
);

// if (!window.adobeDataLayer) {
//   console.log("loading adobe");
//   React.lazy(() => import("@adobe/adobe-client-data-layer"));
// }