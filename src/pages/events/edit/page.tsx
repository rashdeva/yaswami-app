import { getEventById, updateEvent } from "../../../db/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../../../db/zod";
import { z } from "zod";
import { Tables } from "../../../database.types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EventForm2 } from "~/components/event-form2";
import { useBack } from "~/hooks/useBack";

export default function EventPage() {
  useBack('/');
  
  const { eventId } = useParams();
  

  const { data } = useQuery({
    queryKey: ["event"],
    queryFn: () => getEventById(eventId!),
    enabled: !!eventId,
  });

  const updateEventMutation = useMutation({
    mutationFn: updateEvent,
  });

  const form = useForm<z.infer<typeof eventSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(eventSchema),
    defaultValues: { ...(data ? data[0] : {}) },
  });

  const handleSubmit = async (data: Tables<"events">) => {
    updateEventMutation.mutate(data);
  };

  useEffect(() => {
    if (data) {
      form.reset({ ...data[0] });
    }
  }, [data]);

  return (
    <div className="container py-8">
      <EventForm2 form={form} onSubmit={handleSubmit} />
    </div>
  );
}
