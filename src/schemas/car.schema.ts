import { z } from "zod";
import type { CarFormData } from "../types/report-form.types";

export const carSchema: z.ZodType<CarFormData> = z.object({
  brand: z.string().min(2, "Marka musi mieć co najmniej 2 znaki"),
  model: z.string().min(1, "Model jest wymagany"),
  vin: z.string().length(17, "Numer VIN musi składać się z dokładnie 17 znaków"),
  email: z.email("Niepoprawny format email").or(z.literal("")),
});
