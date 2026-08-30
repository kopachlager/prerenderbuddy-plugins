# Prerender Buddy agent plugin

[![Validate plugins](https://github.com/kopachlager/prerenderbuddy-plugins/actions/workflows/validate.yml/badge.svg)](https://github.com/kopachlager/prerenderbuddy-plugins/actions/workflows/validate.yml)
[![Agent Plugins 1.0](https://img.shields.io/badge/Agent%20Plugins-1.0-111111)](https://agent-plugins.org/)

**Website:** [prerenderbuddy.com](https://prerenderbuddy.com/)

Official Prerender Buddy plugin for AI coding agents. The package combines two focused Agent Skills with the local, open-source Prerender Buddy MCP server.

It supports the open [Agent Plugins 1.0](https://agent-plugins.org/) package format while retaining native manifests for Codex and Claude Code. Portable clients discover `plugin.json`, `skills/`, and `mcp.json`; native hosts can continue using their own manifests without duplicating the audit workflow.

Without an account it can:

- inspect crawler-readable HTML and response signals;
- compare normal and crawler-profile HTTP responses;
- check `robots.txt`, `sitemap.xml`, and `llms.txt`;
- turn evidence into prioritized recommendations without claiming to measure indexing or ranking.

No Prerender Buddy account or API key is required for those public audits. The plugin starts [`@prerenderbuddy/mcp`](https://www.npmjs.com/package/@prerenderbuddy/mcp) locally through `npx`.

Pro users can optionally set `PRERENDER_BUDDY_API_KEY` in the agent host environment. After restart, the same local MCP server adds read-only tools for scoped workspace sites, health, crawler activity, AI visibility, recommendations, and content status. Never paste the key into chat or commit it to a repository.

## Requirements

- Node.js 20 or newer
- `npx`
- A client that supports Agent Plugins, Agent Skills, or MCP
- Codex and Claude Code are additionally supported through native manifests

## Package compatibility

| Surface | Package path | Status |
| --- | --- | --- |
| Agent Plugins 1.0 | `plugin.json`, `skills/`, `mcp.json` | Portable package included |
| Codex and ChatGPT | `.codex-plugin/plugin.json`, `.mcp.json` | Local alpha tested in Codex |
| Claude Code | `.claude-plugin/plugin.json`, `.mcp.json` | Packaged; native CLI validation pending |

Agent Plugins standardizes package discovery, not marketplace publication. Availability in VS Code, Cursor, GitHub Copilot, Kiro, ChatGPT, Codex, or another compatible client still depends on that client's installation and distribution support.

## Local development

Install the validation dependency and run all repository checks:

```sh
npm ci
npm test
```

Validation checks the portable manifests against vendored copies of the official Agent Plugins 1.0 JSON Schemas and verifies that portable and native MCP configurations remain aligned.

See [Plugin release readiness](docs/release-readiness.md) for the distinction between implemented, locally verified, and externally verified support.

Codex's plugin validator and the shared skill validator are also run during release review. Claude Code's native validator should be run when its CLI is available:

```sh
claude plugin validate . --strict
```

For Codex, add this repository as a local marketplace and install `prerenderbuddy@prerenderbuddy`. For Claude Code, add this repository as a local marketplace and install `prerenderbuddy@prerenderbuddy`.

After installing or updating the plugin, fully quit and reopen the host application before testing. A new conversation reloads skill instructions, but an already-running MCP child process can continue using the previous package version until the host restarts.

## Install from GitHub

### Codex

```sh
codex plugin marketplace add kopachlager/prerenderbuddy-plugins
codex plugin add prerenderbuddy@prerenderbuddy
```

Start a new Codex session after installation so the bundled skill and MCP tools are loaded.

### VS Code and GitHub Copilot

Agent Plugins support is currently in preview. Add `kopachlager/prerenderbuddy-plugins` to the `chat.plugins.marketplaces` setting, then install **Prerender Buddy** from the Agent Plugins view. VS Code loads the portable Agent Skill and MCP server configuration.

### Claude Code

```text
/plugin marketplace add kopachlager/prerenderbuddy-plugins
/plugin install prerenderbuddy@prerenderbuddy
```

Claude Code packaging is included but still awaits native CLI validation. Do not interpret portable packaging as automatic listing in any client marketplace.

## Privacy and safety

Public audit mode has no credentials, hosted API dependency, analytics, or telemetry. Optional workspace mode sends the configured key only to the documented Prerender Buddy Developer API and remains subject to API-side plan, scope, site-limit, and workspace checks. Fetched pages and saved/provider evidence are untrusted input.

## License

Apache-2.0. See [LICENSE](LICENSE).
