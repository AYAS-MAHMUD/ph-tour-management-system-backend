
import { z } from "zod";

export const createDivisionZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long"),

    slug: z
      .string()
      .optional(),

    thumbnail: z
      .string()
      .url("Thumbnail must be a valid URL")
      .optional(),

    description: z
      .string()
      .optional(),
  }),
});