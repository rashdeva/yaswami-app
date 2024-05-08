import { Button } from "../components/ui/button";
import LogoPng from "~/assets/logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMainButton, useBackButton } from "@tma.js/sdk-react";

export default function Index() {
  const mainButton = useMainButton();
  const backButton = useBackButton();

  useEffect(() => {
    backButton.off("click", () => {});
    backButton.hide();

    mainButton.disable();
    mainButton.hide();
  }, []);

  return (
    <div className="h-dvh w-dvh flex flex-col gap-3 justify-center items-center">
      <Button
        className="rounded-full w-40 h-40 p-1 text-xl hover:p-0 active:p-2 hover:scale-110 active:scale-90 transition-all"
        asChild
      >
        <Link to="/events/create">
          <img src={LogoPng} alt="" />
        </Link>
      </Button>
      <div className="text-muted-foreground uppercase font-bold text-xs">
        Создать событие
      </div>

      <Button asChild>
        <Link to={"/events/19/view"}>Проверить событие</Link>
      </Button>
    </div>
  );
}
