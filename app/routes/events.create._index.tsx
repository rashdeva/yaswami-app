import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { EventForm } from "../components/event-form";
import { createEvent } from "../db/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "../db/zod";
import { z } from "zod";
import { Tables } from "../../database.types";

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof createEventSchema>>(
    request,
    zodResolver(createEventSchema)
  );
  if (errors) {
    // If there are errors, return them to the client to display
    return json({ errors, defaultValues }, { status: 400 });
  }

  // Attempt to create a new event in the database using Supabase
  const creationResponse = await createEvent(data as Tables<"events">);
  if (creationResponse.error) {
    // If there is an error during the creation, return it to the client
    return json({ serverError: creationResponse.error.message }, { status: 500 });
  }

  // Redirect or handle the successful creation accordingly
  return json({ message: 'Event created successfully' });
};

export const meta: MetaFunction<{}> = () => {
  return [
    { title: `Create Event – Yaswami` },
    { name: "description", content: "Yaswami – События мастеров" },
  ];
};

export default function EventPage() {
  const form = useRemixForm<z.infer<typeof createEventSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(createEventSchema)
  });

  
  return (
    <div className="container py-8">
      <EventForm form={form} />
    </div>
  );
}
