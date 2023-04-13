import {
  DSProvider
} from "@nypl/design-system-react-components";
import Header from "./Header/Header";

const HeaderApp: any = ({ isTestMode = false }): any => {
  return (
    <DSProvider>
      <Header
        fetchSitewideAlerts={!isTestMode}
        isProduction={!isTestMode}
      />
    </DSProvider>
  );
};

export default HeaderApp;