import { GymPageOverride } from "./page-override";
import type { Plugin } from "@/lib/plugin-types";

export const gymPlugin: Plugin = {
  id: "gym",
  name: "Gym",
  description: "Protein, macros, and workout timing for active lifestyles.",
  PageOverride: GymPageOverride,
};