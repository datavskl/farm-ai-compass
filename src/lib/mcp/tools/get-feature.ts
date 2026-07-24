import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { FEATURES } from "./list-features";

export default defineTool({
  name: "get_feature",
  title: "Get AgriSmart feature",
  description: "Get details for a single AgriSmart feature by its id (e.g. 'weather', 'soil-health', 'disease-detection', 'accounting').",
  inputSchema: {
    id: z.string().min(1).describe("Feature id, such as 'weather' or 'disease-detection'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const feature = FEATURES.find((f) => f.id === id);
    if (!feature) {
      return {
        content: [{ type: "text", text: `No feature found with id '${id}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(feature, null, 2) }],
      structuredContent: { feature },
    };
  },
});