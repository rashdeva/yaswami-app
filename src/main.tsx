import { useMemo } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TmaProvider } from "./providers/tma-provider.tsx";
import { initNavigator } from "@tma.js/sdk-react";
import App from "./app.tsx";
import { QueryProvider } from "./providers/query-provider.tsx";
import { useIntegration } from "@tma.js/react-router-integration";

import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";

export const Root = () => {
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  // useEffect(() => {
  //   navigator.attach();
  //   return () => navigator.detach();
  // }, [navigator]);

  return (
    <BrowserRouter>
      <QueryProvider>
        <TmaProvider>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </TmaProvider>
      </QueryProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
