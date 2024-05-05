import { Tables } from "../../database.types";
import { supabase } from "../lib/supabase";

export async function updateEvent({id, ...data}: Tables<"events">) {
  return await supabase.from("events").update(data).eq('id', id)
}

export async function createEvent(data: Tables<"events">) {
  const { data: createdData, error } = await supabase.from("events").insert([data]);
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

      console.log(data, error)

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
