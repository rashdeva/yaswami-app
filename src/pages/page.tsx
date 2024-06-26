import LogoPng from "~/assets/sun.svg";
import { useEffect } from "react";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore } from "~/db/userStore";
import { getTeacher } from "~/db/api";

export default function MainPage() {
  const mb = useMainButton();
  const bb = useBackButton();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useUserStore((state) => state.user);

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

  useEffect(() => {
    if (user.id) {
      getTeacher(user.id).then(({ data }) => {
        if (data && data.length > 0) {
          navigate("/events");
        } else {
          navigate("/onboarding");
        }
      });
    }
  }, [user.id]);

  return (
    <div className="h-dvh flex flex-col justify-center items-center py-4">
      <img src={LogoPng} className="max-w-40 animate-spin-slow" alt="" />
    </div>
  );
}
