import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listFeaturesTool from "./tools/list-features";
import getFeatureTool from "./tools/get-feature";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "agrismart-mcp",
  title: "AgriSmart MCP",
  version: "0.1.0",
  instructions:
    "Read-only tools describing the AgriSmart agricultural management app. Use `list_features` to enumerate available capabilities and `get_feature` to fetch details for a specific one.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listFeaturesTool, getFeatureTool],
});