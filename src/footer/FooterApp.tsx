import { DSProvider } from "@nypl/design-system-react-components";
import Footer from "../components/Footer/Footer";
import headertheme from "../theme";

const FooterApp: any = (): any => {
  return (
    <DSProvider resetCSS={false} disableGlobalStyle theme={headertheme}>
      <Footer />
    </DSProvider>
  );
};

export default FooterApp;
