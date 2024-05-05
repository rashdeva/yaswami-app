import * as z from "zod";

export const eventSchema = z.object({
  id: z.number(),
  comment: z.string().nullable(),
  description: z.string().nullable(),
  end_date: z.string().nullable(),
  end_time: z.string().nullable(),
  event_type: z.number().nullable(),
  location: z.string().nullable(),
  max_participants: z.number().nullable(),
  owner_id: z.number().nullable(),
  price: z.preprocess((val) => Number(val), z.number()).nullable(),
  start_date: z.string().nullable(),
  start_time: z.string().nullable(),
  thumbnail_url: z.string().nullable(),
  title: z.string().min(1, "Title is required"),
});

export const createEventSchema = eventSchema.pick({
  title: true,
  description: true,
  price: true
});