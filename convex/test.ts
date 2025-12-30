import { query } from "./_generated/server";

export const hello = query({
  handler: async () => {
    return "Convex is working 🚀";
  },
});