import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  studioHost: "matt-deal-studio",
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  },
});
