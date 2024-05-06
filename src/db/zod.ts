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
  price: z
    .preprocess((val) => Number(val), z.number())
    .transform((value) => {
      const number = parseInt(value as unknown as string, 10);
      if (isNaN(number)) {
        throw new Error("Event type must be a number");
      }
      return number;
    })
    .nullable(),
  start_date: z.string().nullable(),
  start_time: z.string().nullable(),
  thumbnail_url: z.string().nullable(),
  title: z.string().nullable(),
});

export const createEventSchema = eventSchema.pick({
  title: true,
  description: true,
  price: true,
  comment: true,
  end_date: true,
  end_time: true,
  start_date: true,
  start_time: true,
  event_type: true,
  max_participants: true,
  thumbnail_url: true,
});
