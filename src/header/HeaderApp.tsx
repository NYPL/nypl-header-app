import { DSProvider } from "@nypl/design-system-react-components";
import Header from "../components/Header/Header";
import theme from "../theme";

const HeaderApp: any = ({ isTestMode = false }): any => {
  return (
    <DSProvider resetCSS={false} disableGlobalStyle theme={theme}>
      <Header fetchSitewideAlerts={!isTestMode} isProduction={!isTestMode} />
    </DSProvider>
  );
};

export default HeaderApp;
