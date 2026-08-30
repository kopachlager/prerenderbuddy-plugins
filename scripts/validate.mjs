import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const root = resolve(import.meta.dirname, "..");
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const required = async (path) => access(resolve(root, path));
const fail = (message) => {
  throw new Error(message);
};

const codex = await readJson("plugins/prerenderbuddy/.codex-plugin/plugin.json");
const claude = await readJson("plugins/prerenderbuddy/.claude-plugin/plugin.json");
const portable = await readJson("plugins/prerenderbuddy/plugin.json");
const portableMcp = await readJson("plugins/prerenderbuddy/mcp.json");
const nativeMcp = await readJson("plugins/prerenderbuddy/.mcp.json");
const portablePluginSchema = await readJson("schemas/agent-plugins/1.0.0/plugin.schema.json");
const portableMcpSchema = await readJson("schemas/agent-plugins/1.0.0/mcp.schema.json");
const codexMarketplace = await readJson(".agents/plugins/marketplace.json");
const claudeMarketplace = await readJson(".claude-plugin/marketplace.json");
const evals = await readJson("evals/crawler-visibility-audit.json");
const workspaceEvals = await readJson("evals/workspace-discoverability-review.json");

for (const manifest of [codex, claude]) {
  if (manifest.name !== "prerenderbuddy") fail("Plugin names must match.");
  if (manifest.mcpServers !== "./.mcp.json") fail("Manifest must use the shared MCP config.");
  if (manifest.skills !== "./skills/") fail("Manifest must use the shared skills directory.");
}
if (!/^0\.2\.0(?:\+codex\.[0-9]+)?$/.test(codex.version)) fail("Unexpected Codex plugin version.");
if (claude.version !== "0.2.0") fail("Unexpected Claude plugin version.");
if (portable.version !== "0.2.0") fail("Unexpected portable plugin version.");

const ajv = new Ajv2020({ allErrors: true, strict: true });
const validatePortablePlugin = ajv.compile(portablePluginSchema);
const validatePortableMcp = ajv.compile(portableMcpSchema);
if (!validatePortablePlugin(portable)) {
  fail(`Portable plugin manifest is invalid: ${ajv.errorsText(validatePortablePlugin.errors)}`);
}
if (!validatePortableMcp(portableMcp)) {
  fail(`Portable MCP configuration is invalid: ${ajv.errorsText(validatePortableMcp.errors)}`);
}

const portableSchemaVersion = portable.$schema.match(/schemas\/(\d+\.\d+\.\d+)\//)?.[1];
const portableMcpSchemaVersion = portableMcp.$schema.match(/schemas\/(\d+\.\d+\.\d+)\//)?.[1];
if (!portableSchemaVersion || portableSchemaVersion !== portableMcpSchemaVersion) {
  fail("Portable manifest and MCP configuration must target the same Agent Plugins version.");
}

for (const field of ["name", "description", "author", "homepage", "repository", "license"]) {
  if (JSON.stringify(portable[field]) !== JSON.stringify(claude[field])) {
    fail(`Portable and native manifest field ${field} must match.`);
  }
}

const nativeServer = nativeMcp.mcpServers?.prerenderbuddy;
const portableServer = portableMcp.mcpServers?.prerenderbuddy;
for (const server of [nativeServer, portableServer]) {
  if (server?.command !== "npx") fail("MCP server must start through npx.");
  if (server?.args?.join(" ") !== "--yes @prerenderbuddy/mcp@0.2.0") {
    fail("MCP package must be pinned to the reviewed version.");
  }
}
if (portableServer?.type !== "stdio") fail("Portable MCP transport must be explicit stdio.");
if (JSON.stringify(portableServer.args) !== JSON.stringify(nativeServer.args)) {
  fail("Portable and native MCP arguments must match.");
}

if (codexMarketplace.plugins?.[0]?.name !== "prerenderbuddy") fail("Codex marketplace plugin name is incorrect.");
if (codexMarketplace.plugins?.[0]?.source?.path !== "./plugins/prerenderbuddy") {
  fail("Codex marketplace source is incorrect.");
}
if (claudeMarketplace.plugins?.[0]?.name !== "prerenderbuddy") fail("Claude marketplace plugin name is incorrect.");
if (claudeMarketplace.plugins?.[0]?.source !== "./plugins/prerenderbuddy") {
  fail("Claude marketplace source is incorrect.");
}
if (codexMarketplace.name !== "prerenderbuddy") fail("Unexpected Codex marketplace name.");
if (claudeMarketplace.name !== "prerenderbuddy") fail("Unexpected Claude marketplace name.");
if (!Array.isArray(evals.cases) || evals.cases.length < 6) fail("Evaluation coverage is incomplete.");
if (!Array.isArray(workspaceEvals.cases) || workspaceEvals.cases.length < 6) fail("Workspace evaluation coverage is incomplete.");

await required("plugins/prerenderbuddy/skills/crawler-visibility-audit/SKILL.md");
await required("plugins/prerenderbuddy/skills/workspace-discoverability-review/SKILL.md");
await required("plugins/prerenderbuddy/README.md");
await required("plugins/prerenderbuddy/NOTICE");
const repositoryLicense = await readFile(resolve(root, "LICENSE"), "utf8");
const packageLicense = await readFile(resolve(root, "plugins/prerenderbuddy/LICENSE"), "utf8");
if (repositoryLicense !== packageLicense) fail("Package and repository licenses must match.");
await required("LICENSE");
await required("NOTICE");
await required("SECURITY.md");
await required("CODE_OF_CONDUCT.md");

console.log("Validated Agent Plugins 1.0 package, native host manifests, marketplaces, MCP parity, skills, and evals.");
