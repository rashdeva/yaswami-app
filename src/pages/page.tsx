import LogoPng from "~/assets/logo.png";
import { useEffect } from "react";
import { isTMA } from "@tma.js/sdk";
import { useMainButton } from "@tma.js/sdk-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";

export default function Index() {
  const mb = useMainButton();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => {
      navigate("/events/create");
      console.log("click");
    };

    mb.setText("Создать событие").show().on("click", handleClick);

    return () => {
      mb.hide().off("click", handleClick);
    };
  }, [mb]);

  return (
    <div className="h-dvh w-dvh flex flex-col gap-3 justify-center items-center">
      <img src={LogoPng} alt="" width="240px" />
      <h1 className="text-2xl font-bold">Yaswami</h1>
      <p>У вас пока нет созданных событий</p>

      {!isTMA() && (
        <Button asChild variant="default">
          <Link to={"/events/create"}>Создать событие</Link>
        </Button>
      )}
    </div>
  );
}
