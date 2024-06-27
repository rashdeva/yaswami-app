import { SDKProvider } from "@tma.js/sdk-react";
import { ReactNode } from "react";

export const TmaProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SDKProvider debug acceptCustomStyles>
      {children}
    </SDKProvider>
  );
};
