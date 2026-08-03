# Prerender Buddy plugins

Official Prerender Buddy plugin for Codex and Claude Code. Both hosts use the same skill and the same local, open-source MCP server.

The initial alpha can:

- inspect crawler-readable HTML and response signals;
- compare normal and crawler-profile HTTP responses;
- check `robots.txt`, `sitemap.xml`, and `llms.txt`;
- turn evidence into prioritized recommendations without claiming to measure indexing or ranking.

No Prerender Buddy account or API key is required. The plugin starts [`@prerenderbuddy/mcp`](https://www.npmjs.com/package/@prerenderbuddy/mcp) locally through `npx`; the MCP server makes outbound requests only to the public URLs the user asks it to inspect.

## Requirements

- Node.js 20 or newer
- `npx`
- Codex or Claude Code

## Local development

Run the repository checks:

```sh
node scripts/validate.mjs
```

Codex's plugin validator and the shared skill validator are also run during release review. Claude Code's native validator should be run when its CLI is available:

```sh
claude plugin validate . --strict
```

For Codex, add this repository as a local marketplace and install `prerenderbuddy@prerenderbuddy-local`. For Claude Code, add this repository as a local marketplace and install `prerenderbuddy@prerenderbuddy`.

After installing or updating the plugin, fully quit and reopen the host application before testing. A new conversation reloads skill instructions, but an already-running MCP child process can continue using the previous package version until the host restarts.

The repository is intentionally local-only while the alpha is reviewed. Public installation commands will be added when the GitHub repository is published.

## Privacy and safety

The plugin has no credentials, hosted API dependency, analytics, or telemetry. Fetched pages are untrusted input. The MCP server blocks unsafe and private-network targets and limits response sizes and redirects.

## License

Apache-2.0. See [LICENSE](LICENSE).
