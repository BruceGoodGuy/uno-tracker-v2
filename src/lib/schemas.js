import { object, string } from "yup";

export const playerSchema = object({
  name: string().required().max(50).min(3),
});

export const gameSchema = object({
  name: string().optional().max(100).min(3),
  // description: string().max(500),
  // isPublic: string().oneOf(["true", "false"]).default("true"),
  // maxPlayers: string().oneOf(["2", "3", "4", "5", "6"]).default("4"),
  // allowSpectators: string().oneOf(["true", "false"]).default("false"),
});
