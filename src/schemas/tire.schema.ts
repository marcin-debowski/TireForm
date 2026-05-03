import { z } from "zod";
import type { TireFormData, TiresFormData } from "../types/report-form.types";

export const tireSchema: z.ZodType<TireFormData> = z.object({
  brand: z.string().min(2, "Marka opony jest wymagana"),
  size: z.string().min(3, "Podaj rozmiar opony (np. 205/55 R16)"),
  tread_depth: z
    .string()
    .min(1, "Głębokość bieżnika jest wymagana")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Głębokość bieżnika musi być liczbą większą od 0"),
  dot_code: z
    .string()
    .regex(/^\d{4}$/, "DOT musi składać się z 4 cyfr (np. 1223)")
    .or(z.literal("")),
  rating: z.string().min(1, "Ocena jest wymagana"),
  notes: z.string().optional().default(""),
});

export const tiresSchema: z.ZodType<TiresFormData> = z.object({
  front_right: tireSchema,
  front_left: tireSchema,
  rear_right: tireSchema,
  rear_left: tireSchema,
});
