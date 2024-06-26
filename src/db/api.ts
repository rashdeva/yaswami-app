import { Tables } from "~/database.types";
import { supabase } from "../lib/supabase";
import { userSchema } from "./zod";
import { z } from "zod";

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

export async function participateEvent({
  event_id,
  user_id,
}: {
  event_id: number;
  user_id: number;
}) {
  const { data, error } = await supabase.from("event_participants").insert({
    event_id,
    user_id,
  });
  if (error) throw new Error("Failed to participate");
  return { data, error };
}

export async function unparticipateEvent({
  event_id,
  user_id,
}: {
  event_id: number;
  user_id: number;
}) {
  const { data, error } = await supabase
    .from("event_participants")
    .delete()
    .eq("event_id", event_id)
    .eq("user_id", user_id);
  if (error) throw new Error("Failed to unparticipate");
  return { data, error };
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

export async function registerTeacher(values: Tables<"teachers">) {
  const { data, error } = await supabase.from("teachers").insert([values]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTeacher(userId: number) {
  return await supabase
    .from("teachers")
    .select("*")
    .eq("user_id", userId)
    .limit(1);
}

export async function createUser({ ...data }: z.infer<typeof userSchema>) {
  const { data: createdData, error } = await supabase
    .from("users")
    .insert([data]);
  return { data: createdData, error };
}

export async function getEventById(eventId: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", Number(eventId))
    .limit(1);
  if (error) throw new Error("Failed to fetch event data");
  return data;
}

export async function getEventTypes() {
  const { data, error } = await supabase.from("event_types").select("*");
  if (error) throw new Error("Failed to fetch event types data");
  return data;
}

export async function getUserById(userId: number) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("telegram_id", userId)
    .limit(1);
  if (error) throw new Error("Failed to fetch event data");
  return data;
}

export async function getParticipateStatus(eventId: number, userId: number) {
  // Check if both eventId and userId are provided
  if (!eventId || !userId) {
    console.error("Invalid input: eventId and userId are required");
    return false;
  }

  try {
    const { data, error } = await supabase
      .from("event_participants")
      .select("*")
      .eq("event_id", eventId)
      .eq("user_id", userId)
      .limit(1);

    if (error) {
      console.error("Failed to fetch event data:", error.message);
      throw new Error("Failed to fetch event data");
    }

    // Return true if there is at least one participant matching the criteria
    return data.length > 0;
  } catch (error) {
    // Optionally handle or log the error differently here
    throw error;
  }
}

export async function getParticipantsByEventId(eventId: number) {
  // Check if both eventId and userId are provided
  if (!eventId) {
    console.error("Invalid input: eventId is required");
    return false;
  }

  try {
    const { data, error } = await supabase
      .from("event_participants")
      .select(
        `*, user:user_id(id, username, first_name, telegram_id, last_name)`
      )
      .eq("event_id", eventId);

    if (error) {
      console.error("Failed to fetch event data:", error.message);
      throw new Error("Failed to fetch event data");
    }

    // Return true if there is at least one participant matching the criteria
    return data;
  } catch (error) {
    // Optionally handle or log the error differently here
    throw error;
  }
}

export async function getEvents() {
  const { data, error } = await supabase.from("events").select("*");
  if (error) throw new Error("Failed to fetch event data");
  return data;
}
