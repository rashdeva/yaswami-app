import { EventForm } from "../../../components/event-form";
import { createEvent } from "../../../db/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema } from "../../../db/zod";
import { z } from "zod";
import { Tables } from "../../../database.types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

export default function EventsCreatePage() {
  const form = useForm<z.infer<typeof createEventSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(createEventSchema),
  });

  const createEventMutation = useMutation({
    mutationFn: createEvent,
  });

  const handleSubmit = async (data: Tables<"events">) => {
    createEventMutation.mutate(data);
  };

  return (
    <div className="container py-8">
      <EventForm form={form} onSubmit={handleSubmit} />
    </div>
  );
}
