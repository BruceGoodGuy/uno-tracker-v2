import { object, string } from "yup";

export const playerSchema = object({
  name: string().required().max(50).min(3),
});
