import { useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import { TmaProvider } from "./providers/tma-provider.tsx";
import { initNavigator } from "@tma.js/sdk-react";
import App from "./app.tsx";
import { QueryProvider } from "./providers/query-provider.tsx";
import { useIntegration } from "@tma.js/react-router-integration";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./globals.css";

export const Root = () => {
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <QueryProvider>
        <TmaProvider>
          <App />
        </TmaProvider>
      </QueryProvider>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
