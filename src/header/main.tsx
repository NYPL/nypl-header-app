import React from "react";
import ReactDOM from "react-dom";
import HeaderApp from "./HeaderApp";

const getQueryParam = (fullUrl = "", variableToFind: string) => {
  const cleanedUrl =
    fullUrl.indexOf("?") !== -1
      ? fullUrl.substring(fullUrl.indexOf("?") + 1)
      : "";
  if (!cleanedUrl) {
    return "";
  }

  const queryParams = cleanedUrl.split("&");
  let value = "";

  queryParams.forEach((query) => {
    const pair = query.split("=");
    if (pair[0] === variableToFind) {
      value = pair[1];
    }
  });

  return value;
};

(function renderHeaderApp(window, document) {
  function loadHeader(fn: { (): void; (this: Document, ev: Event): any }) {
    // When the DOM is not loading, we can access the DOM and the elements
    // on the page. If it's still loading, we can listen for the
    // DOMContentLoaded event and then run the function.
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
    // Sets the base font size to 16px for libguides.nypl.org;
    // (it's currently set to 10px which interferes with how the header
    // is meant to look)
    if (window.location.origin.includes("libguides")) {
      document.getElementsByTagName("html")[0].style.fontSize = "16px";
    }
  }
  function header() {
    if (typeof window !== "undefined") {
      let isRenderedByServer = false;

      // Render Client Side Only
      if (!isRenderedByServer) {
        let allScriptTags: HTMLCollectionOf<HTMLScriptElement>;
        let scriptTag: HTMLScriptElement;

        // create element to hold the single header instance.
        const htmlElement = document.createElement("div");
        let containerId!: string;
        htmlElement.id = "header";

        // Make a global object to store the instances of nyplHeader
        if (!(window as any).nyplHeader) {
          (window as any).nyplHeader = {};
        }

        // Short-name reference to window.nyplHeader
        const nyplHeaderObject = (window as any).nyplHeader;

        // Keep track of the processed scripts within nyplHeader
        if (!nyplHeaderObject.processedScripts) {
          nyplHeaderObject.processedScripts = [];
        }

        // Only create the nyplHeader if the global.nyplHeaderObject.scripts is empty
        if (nyplHeaderObject.processedScripts.length === 0) {
          /*
           * Loop through all <script> tags in the DOM.
           * Find the match which contains 'dgx-header.min.js'.
           * Insert the markup holding the NYPL Header
           * right before the <script> tag matched.
           * In addition, setup the proper client appEnv
           * to fetch the modeled data endpoint.
           */
          allScriptTags = document.getElementsByTagName("script");

          /* Since getElementsBy is an array-like structure,
           * we need to use call to iterate with forEach.
           */
          [].forEach.call(allScriptTags, (value: HTMLScriptElement) => {
            if (value.src.indexOf("header.min") !== -1) {
              scriptTag = value;

              containerId = getQueryParam(scriptTag.src, "containerId");
              // If an element id is passed in, append the header to that
              // element. This assumes the element is already on the page.
              // Otherwise, append the header to the body on the element
              // that was created in this script.
              if (!containerId && scriptTag && scriptTag.parentNode) {
                scriptTag.parentNode.insertBefore(htmlElement, scriptTag);
              }
              nyplHeaderObject.processedScripts.push(scriptTag);
            }
          });
        }

        // Now we ensure that only ONE <script> tag has been created
        // before allowing React to Render the Header.
        if (
          nyplHeaderObject.processedScripts.length === 1 &&
          (containerId || htmlElement)
        ) {
          setTimeout(() => {
            ReactDOM.render(
              <HeaderApp />,
              containerId
                ? (document.getElementById(containerId) as any)
                : htmlElement
            );
            console.log("header rendered via client");
          }, 500);
        }
      }
    }
  }
  loadHeader(header);
})(window, document);
