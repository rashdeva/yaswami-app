import { Tables } from "../../database.types";
import { supabase } from "../lib/supabase";

export async function updateEvent({id, event_type, ...data}: Tables<"events">) {
  return await supabase.from("events").update({
    event_type: Number(event_type),
    ...data
  }).eq('id', id)
}

export async function createEvent({event_type, ...data}: Tables<"events">) {
  const { data: createdData, error } = await supabase.from("events").insert([{
    event_type: Number(event_type),
    ...data,
  }]);
  return { createdData, error };
}

export async function getEventById(eventId: string) {
  try {
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
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getEvents() {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*");

    if (data) {
      return data[0];
    }

    if (error) {
      console.log(error);
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
