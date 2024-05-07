import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TmaProvider } from "./providers/tma-provider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TmaProvider>
          <App />
        </TmaProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
