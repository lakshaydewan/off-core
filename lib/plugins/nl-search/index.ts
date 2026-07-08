import { NLSearchPageOverride } from "./page-override";
import type { Plugin } from "@/lib/plugin-types";

export const nlSearchPlugin: Plugin = {
  id: "nl-search",
  name: "NL Search",
  description: "Replaces the browse page with a natural language search experience.",
  PageOverride: NLSearchPageOverride,
};
