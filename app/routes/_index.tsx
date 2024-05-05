import type { MetaFunction } from "@remix-run/node";
import { Button } from "../components/ui/button";
import { Link, useLoaderData } from "@remix-run/react";
import { supabase } from "~/lib/supabase";
import LogoPng from '~/assets/logo.png';

export const meta: MetaFunction = () => {
  return [
    { title: "Yaswami - Найди свой ивент" },
    { name: "description", content: "yaswami.com – платформа где каждый может создать свой ивент и пригласить других" },
  ];
};

export const loader = async () => {
  return (await supabase.from("events").select("*")).data;
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-dvh w-dvw flex flex-col gap-3 justify-center items-center">
      <Button className="rounded-full w-40 h-40 p-1 text-xl hover:p-0 active:p-2 hover:scale-110 active:scale-90 transition-all" asChild>
        <Link to="/events/create">
          <img src={LogoPng} alt="" />
        </Link>
      </Button>
      <div className="text-muted-foreground uppercase font-bold text-xs">Создать событие</div>
    </div>
  );
}
