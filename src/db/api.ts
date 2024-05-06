import { Tables } from "../database.types";
import { supabase } from "../lib/supabase";

export async function updateEvent({
  id,
  event_type,
  ...data
}: Tables<"events">) {
  const { error } = await supabase
    .from("events")
    .update({
      event_type: Number(event_type),
      ...data,
    })
    .eq("id", id);
  if (error) throw new Error("Failed to update event");
}

export async function createEvent({ event_type, ...data }: Tables<"events">) {
  const { data: createdData, error } = await supabase.from("events").insert([
    {
      event_type: Number(event_type),
      ...data,
    },
  ]);
  return { createdData, error };
}

export async function getEventById(eventId?: string) {
  if (!eventId) return;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", Number(eventId))
    .limit(1);
  if (error) throw new Error("Failed to fetch event data");
  return data;
}

export async function getEvents() {
  const { data, error } = await supabase.from("events").select("*");
  if (error) throw new Error("Failed to fetch event data");
  return data;
}
