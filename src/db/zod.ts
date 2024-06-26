
import { z, ZodTypeAny } from 'zod';

const nullableToUndefined = <T extends ZodTypeAny>(schema: T) => {
  return schema.nullable().transform((value) => value === null ? undefined : value);
};

export const userSchema = z.object({
  created_at: z.string().optional(),
  first_name: nullableToUndefined(z.string().nullable()),
  id: z.number().optional(),
  language_code: nullableToUndefined(z.string().nullable()),
  last_name: nullableToUndefined(z.string().nullable()),
  photo: nullableToUndefined(z.string().nullable()),
  telegram_id: nullableToUndefined(z.number().nullable()),
  username: nullableToUndefined(z.string().nullable()),
});

export const eventSchema = z.object({
  id: z.number(),
  comment: z.string().optional(),
  description: z.string(),
  end_date: z.string(),
  end_time: z.string(),
  event_type: z.string().optional(),
  location: z.string(),
  max_participants: z.preprocess((val) => Number(val), z.number()).optional(),
  owner_id: z.number(),
  price: z.preprocess((val) => Number(val), z.number()).optional(),
  start_date: z.string(),
  start_time: z.string(),
  thumbnail_url: z.string(),
  title: z.string(),
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

export const preRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  about: z.string().min(1, "About is required").optional(),
  birthday: z.string().optional(),
  city: z.string().min(1, "City is required"),
  event_type: z.string(),
  gender: z.enum(["Male", "Female"]),
  user_id: z.number().optional(),
});
