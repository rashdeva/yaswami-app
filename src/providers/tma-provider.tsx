import { mockTelegramEnv, parseInitData, SDKProvider } from "@tma.js/sdk-react";
import { ReactNode } from "react";

if (import.meta.env.DEV && false) {
  const initDataRaw = new URLSearchParams([
    [
      "user",
      JSON.stringify({
        id: 99281932,
        first_name: "Andrew",
        last_name: "Rogue",
        username: "rogue",
        language_code: "en",
        is_premium: true,
        allows_write_to_pm: true,
      }),
    ],
    [
      "hash",
      "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31",
    ],
    ["auth_date", "1716922846"],
    ["start_param", "debug"],
    ["chat_type", "sender"],
    ["chat_instance", "8428209589180549439"],
  ]).toString();

  mockTelegramEnv({
    themeParams: {
      accentTextColor: "#0077cc",
      bgColor: "#dddddd",
      buttonColor: "#0077cc",
      buttonTextColor: "#ffffff",
      destructiveTextColor: "#ff4d4d",
      headerBgColor: "#f0f4f7",
      hintColor: "#99aabb",
      linkColor: "#0077cc",
      secondaryBgColor: "#e6f2ff",
      sectionBgColor: "#f0f4f7",
      sectionHeaderTextColor: "#0077cc",
      subtitleTextColor: "#666666",
      textColor: "#333333",
    },
    initData: parseInitData(initDataRaw),
    initDataRaw,
    version: "7.2",
    platform: "tdesktop",
  });
}

export const TmaProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SDKProvider debug acceptCustomStyles>
      {children}
    </SDKProvider>
  );
};
