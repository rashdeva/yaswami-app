import { DisplayGate, SDKInitOptions, SDKProvider } from "@tma.js/sdk-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "~/components/ui/button";
import LogoPng from "~/assets/logo.png";
const options: SDKInitOptions = {
  acceptCustomStyles: true,
  cssVars: true,
};

function SDKProviderError() {
  return (
    <div className="h-dvh w-dvw flex  flex-col items-center justify-center gap-4">
      <Button
        asChild
        className="rounded-full w-40 h-40 p-1 text-xl active:p-2 hover:p-0 hover:scale-110 active:scale-90 transition-all"
      >
        <Link to="https://t.me/yaswamibot">
          <img src={LogoPng} alt="" className="h-38 w-38" />
        </Link>
      </Button>
      <h1 className="font-bold font-display">
        Пожалуйста откройте приложение в телеграме
      </h1>
      {/* <blockquote>
        <code>
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </code>
      </blockquote> */}
    </div>
  );
}

function SDKProviderLoading() {
  return <div>SDK is loading.</div>;
}

function SDKInitialState() {
  return <div>Waiting for initialization to start.</div>;
}

export const TmaProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SDKProvider options={options}>
      <DisplayGate
        error={SDKProviderError}
        loading={SDKProviderLoading}
        initial={SDKInitialState}
      >
        {children}
      </DisplayGate>
    </SDKProvider>
  );
};
