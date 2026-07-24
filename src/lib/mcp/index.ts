import { defineMcp } from "@lovable.dev/mcp-js";
import listFeaturesTool from "./tools/list-features";
import getFeatureTool from "./tools/get-feature";

export default defineMcp({
  name: "agrismart-mcp",
  title: "AgriSmart MCP",
  version: "0.1.0",
  instructions:
    "Public read-only tools describing the AgriSmart agricultural management app. Use `list_features` to enumerate available capabilities and `get_feature` to fetch details for a specific one.",
  tools: [listFeaturesTool, getFeatureTool],
});