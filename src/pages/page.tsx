import LogoPng from "~/assets/sun.svg";
import { useEffect } from "react";
import { isTMA } from "@tma.js/sdk";
import { useBackButton, useMainButton } from "@tma.js/sdk-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";

export default function MainPage() {
  const mb = useMainButton();
  const bb = useBackButton();
  const navigate = useNavigate();

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
      .setText("Пре-регистрация")
      .show()
      .on("click", handleClick);

    return () => {
      mb.hide().off("click", handleClick);
    };
  }, [mb]);

  return (
    <div className="h-dvh py-4">
      <div className="text-center flex flex-col items-center gap-4">
        <img src={LogoPng} className="max-w-40" alt="" />
        <h1 className="text-xl font-bold">
          Yaswami - Пространство для мастеров и учеников
        </h1>
        <p>
          Добро пожаловать в пространство духовного развития! Мы поможем
          мастерам создавать и управлять вашими событиями. Сервис сейчас
          находится в разработке, пройдите пре-регистрацию, чтобы быть в числе
          первых, кто узнает о новостях, и присоединяйтесь к нашей группе.
        </p>

        {!isTMA() && (
          <Button asChild variant="default">
            <Link to={"/register"}>Пре-регистрация</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
