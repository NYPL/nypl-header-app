import ReactDOMServer from "react-dom/server"
import HeaderApp from "../header/HeaderApp"

export function render(url, context) {
  return ReactDOMServer.renderToString(
      <HeaderApp />
  )
}