import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const required = async (path) => access(resolve(root, path));
const fail = (message) => {
  throw new Error(message);
};

const codex = await readJson("plugins/prerender-buddy/.codex-plugin/plugin.json");
const claude = await readJson("plugins/prerender-buddy/.claude-plugin/plugin.json");
const mcp = await readJson("plugins/prerender-buddy/.mcp.json");
const codexMarketplace = await readJson(".agents/plugins/marketplace.json");
const claudeMarketplace = await readJson(".claude-plugin/marketplace.json");
const evals = await readJson("evals/crawler-visibility-audit.json");

for (const manifest of [codex, claude]) {
  if (manifest.name !== "prerender-buddy") fail("Plugin names must match.");
  if (manifest.mcpServers !== "./.mcp.json") fail("Manifest must use the shared MCP config.");
  if (manifest.skills !== "./skills/") fail("Manifest must use the shared skills directory.");
}
if (!/^0\.1\.0(?:\+codex\.[0-9]+)?$/.test(codex.version)) fail("Unexpected Codex alpha version.");
if (claude.version !== "0.1.0") fail("Unexpected Claude alpha version.");

const server = mcp.mcpServers?.prerenderbuddy;
if (server?.command !== "npx") fail("MCP server must start through npx.");
if (server?.args?.join(" ") !== "--yes @prerenderbuddy/mcp@0.1.4") {
  fail("MCP package must be pinned to the reviewed version.");
}

if (codexMarketplace.plugins?.[0]?.name !== "prerender-buddy") fail("Codex marketplace plugin name is incorrect.");
if (codexMarketplace.plugins?.[0]?.source?.path !== "./plugins/prerender-buddy") {
  fail("Codex marketplace source is incorrect.");
}
if (claudeMarketplace.plugins?.[0]?.name !== "prerender-buddy") fail("Claude marketplace plugin name is incorrect.");
if (claudeMarketplace.plugins?.[0]?.source !== "./plugins/prerender-buddy") {
  fail("Claude marketplace source is incorrect.");
}
if (codexMarketplace.name !== "prerenderbuddy-local") fail("Unexpected Codex marketplace name.");
if (claudeMarketplace.name !== "prerenderbuddy") fail("Unexpected Claude marketplace name.");
if (!Array.isArray(evals.cases) || evals.cases.length < 6) fail("Evaluation coverage is incomplete.");

await required("plugins/prerender-buddy/skills/crawler-visibility-audit/SKILL.md");
await required("LICENSE");
await required("NOTICE");
await required("SECURITY.md");
await required("CODE_OF_CONDUCT.md");

console.log("Validated shared plugin, host manifests, marketplaces, MCP pin, skill, and evals.");
