import { EventForm } from "../components/event-form";
import { updateEvent } from "../db/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../db/zod";
import { z } from "zod";
import { Tables } from "../database.types";
import { supabase } from "~/lib/supabase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function EventPage() {
  const {eventId} = useParams();
  const [data, setData] = useState<any>();

  const form = useForm<z.infer<typeof eventSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(eventSchema),
    defaultValues: { ...data },
  });

  const handleSubmit = async (data: Tables<"events">) => {
    console.log(data);
    await updateEvent(data);
  }

  useEffect(() => {
    supabase
    .from("events")
    .select("*")
    .eq("id", Number(eventId))
    .limit(1).then(({ data, error }) => {
        if (error || (data && Object.keys(data).length === 0)) {
          return;
        }
        setData(data[0]);
        form.reset({...data[0]});
      });
  }, [eventId]);


  console.log(data)

  return (
    data && (
      <div className="container py-8">
        <EventForm form={form} onSubmit={handleSubmit} />
      </div>
    )
  );
}
