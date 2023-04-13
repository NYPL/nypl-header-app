import {
  DSProvider
} from "@nypl/design-system-react-components";
import Footer from "./Footer/Footer";

const FooterApp: any = ({ isTestMode = false }): any => {
  return (
    <DSProvider>
      <Footer />
    </DSProvider>
  );
};

export default FooterApp;
