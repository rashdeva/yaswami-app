import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "~/components/ui/button";
import partyPopperWebp from "~/assets/party-popper.webp";

export const RegisterSuccessPage = () => {
  const { t } = useTranslation();

  return (
    <div className="h-dvh flex flex-col items-center justify-center text-center">
      <div className="text-7xl mb-4">
        <img src={partyPopperWebp} className="w-32" alt="" />
      </div>
      <h1 className="text-xl font-bold mb-1">{t("registerSuccess.title")}</h1>
      <p>{t("registerSuccess.description")}</p>
      <Button asChild className="mt-6">
        <Link to="/events">{t("registerSuccess.button")}</Link>
      </Button>
    </div>
  );
};
