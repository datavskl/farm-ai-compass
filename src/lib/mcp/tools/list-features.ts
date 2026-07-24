import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const FEATURES = [
  { id: "weather", name: "Weather Intelligence", description: "AI-powered weather predictions and farming recommendations." },
  { id: "soil-health", name: "Soil Health Assessment", description: "Comprehensive soil analysis and health recommendations." },
  { id: "disease-detection", name: "Plant Disease Detection", description: "AI-powered crop disease identification and treatment advice." },
  { id: "accounting", name: "Farm Accounting", description: "Financial management for income, expenses, and profitability." },
  { id: "market", name: "Market Analytics", description: "Real-time price predictions and market intelligence." },
  { id: "consultation", name: "Expert Consultation", description: "Connect with agricultural experts and community." },
];

export default defineTool({
  name: "list_features",
  title: "List AgriSmart features",
  description: "List the AgriSmart app's available features with a short description of each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(FEATURES, null, 2) }],
    structuredContent: { features: FEATURES },
  }),
});

export { FEATURES };