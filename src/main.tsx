import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";
import { TmaProvider } from "./providers/tma-provider.tsx";
import { useLaunchParams } from "@tma.js/sdk-react";
import App from "./app.tsx";
import { QueryProvider } from "./providers/query-provider.tsx";

export const Root = () => {
  const debug = useLaunchParams().startParam === "debug";

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <TmaProvider>
          <Root />
        </TmaProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
