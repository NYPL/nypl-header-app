import { DSProvider } from "@nypl/design-system-react-components";
import Footer from "../components/Footer/Footer";
import theme from "../theme";

const FooterApp: any = (): any => {
  return (
    <DSProvider resetCSS={false} disableGlobalStyle theme={theme}>
      <Footer />
    </DSProvider>
  );
};

export default FooterApp;
