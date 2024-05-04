import type { MetaFunction } from "@remix-run/node";
import { Button } from "../components/ui/button";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/lib/supabase";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return (await supabase.from("events").select("*")).data;
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  console.log(data)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Button className="rounded-full w-40 h-40 text-xl">Meditate</Button>
    </div>
  );
}
