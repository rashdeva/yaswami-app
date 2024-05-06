import { Button } from "../components/ui/button";
import { supabase } from "~/lib/supabase";
import LogoPng from "~/assets/logo.png";
import { useUserStore } from "~/db/userStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const loader = async () => {
  return (await supabase.from("events").select("*")).data;
};

export default function Index() {
  const [data, setData] = useState<any>();
  const userData = useUserStore((state) => state.data);

  console.log(userData);

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .then(({ data, error }) => {
        if (error || (data && Object.keys(data).length === 0)) {
          return;
        }
        setData(data);
      });
  }, []);

  console.log(data);

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
    </div>
  );
}
