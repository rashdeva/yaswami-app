import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TmaProvider } from "./providers/tma-provider.tsx";
import App from "./app.tsx";
import { QueryProvider } from "./providers/query-provider.tsx";

import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";

export const Root = () => {
  
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
