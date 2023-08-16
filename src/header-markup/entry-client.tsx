import ReactDOM from "react-dom";
import HeaderApp from "../header/HeaderApp";

ReactDOM.hydrate(
    <HeaderApp />,
    document.getElementById('root')
);