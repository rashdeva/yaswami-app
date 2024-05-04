import {
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { EventForm } from "../components/event-form";
import {  updateEvent } from "../db/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../db/zod";
import { z } from "zod";
import { Tables } from "../../database.types";


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

export const meta: MetaFunction<{}> = () => {
  return [
    { title: `Create Event – Yaswami` },
    { name: "description", content: "Yaswami – События мастеров" },
  ];
};

export default function EventPage() {
  return (
    (
      <div className="container py-8">
        <EventForm />
      </div>
    )
  );
}
