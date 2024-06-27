import LogoPng from "~/assets/logo.png";
import { useEffect } from "react";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { useTranslation } from "react-i18next";
import { config } from "~/config";

export default function OnboardingPage() {
  const mb = useMainButton();
  const bb = useBackButton();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (bb) {
      bb.hide();
    }
  }, [bb]);

  useEffect(() => {
    const handleClick = () => {
      navigate("/register");
    };

    mb.setBgColor("#")
      .enable()
      .setText(t("mainPage.preRegistrationButton"))
      .show()
      .on("click", handleClick);

    return () => {
      mb.hide().disable().off("click", handleClick);
    };
  }, [mb, navigate, t]);

  return (
    <div className="h-dvh flex flex-col justify-center py-4">
      <div className="text-center flex flex-col items-center gap-4">
        <img src={LogoPng} className="max-w-40" alt="" />
        <h1 className="text-3xl font-bold">YASWAMI</h1>
        <h2 className="text-xl font-bold">{t("mainPage.welcome")}</h2>
        <p>{t("mainPage.description")}</p>

        {config.isLocalDev && (
          <Button asChild variant="default">
            <Link to={"/register"}>{t("mainPage.preRegistrationButton")}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
