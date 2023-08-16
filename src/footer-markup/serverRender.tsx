import React from "react"
import ReactDOMServer from "react-dom/server";
import FooterApp from "../footer/FooterApp";

const html = ReactDOMServer.renderToString(
  <FooterApp />
);

document.getElementById("root").innerHTML = html;