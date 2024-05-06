import { EventForm } from "../components/event-form";
import { createEvent } from "../db/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "../db/zod";
import { z } from "zod";
import { Tables } from "../database.types";
import { useForm } from "react-hook-form";


export default function EventsCreatePage() {
  const form = useForm<z.infer<typeof createEventSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(createEventSchema)
  });
  

  const handleSubmit = async (data: Tables<"events">) => {
    console.log(data);
    await createEvent(data as Tables<"events">)
  }

  return (
    <div className="container py-8">
      <EventForm form={form} onSubmit={handleSubmit} />
    </div>
  );
}
