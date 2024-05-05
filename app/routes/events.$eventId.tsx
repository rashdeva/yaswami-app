import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getValidatedFormData } from "remix-hook-form";
import { EventForm } from "../components/event-form";
import { updateEvent } from "../db/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../db/zod";
import { z } from "zod";
import { Tables } from "../../database.types";
import { supabase } from "~/lib/supabase";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const eventId = params.eventId!;
  const data = await supabase
    .from("events")
    .select("*")
    .eq("id", Number(eventId))
    .limit(1)
    .then((result) => result.data);

  return data![0];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof eventSchema>>(
    request,
    zodResolver(eventSchema)
  );
  if (errors) {
    // The keys "errors" and "defaultValue" are picked up automatically by useRemixForm
    return { errors, defaultValues };
  }

  return await updateEvent(data as Tables<"events">);
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.title} – Yaswami` },
    { name: "description", content: "Yaswami – События мастеров" },
  ];
};

export default function EventPage() {
  const data = useLoaderData<typeof loader>();

  return (
    data && (
      <div className="container py-8">
        <EventForm data={data} />
      </div>
    )
  );
}
