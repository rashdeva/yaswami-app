import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/lib/supabase";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const eventId = params.eventId;
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", Number(eventId))
    .limit(1);

  if (data) {
    return data[0];
  }

  if (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{ title: `${data?.title} – Yaswami` }, { name: "description", content: "Yaswami – События мастеров" }];
};

export default function EventPage() {
  const data = useLoaderData<typeof loader>();

  return (
    data && (
      <div>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        {/* Display other event details */}
      </div>
    )
  );
}
