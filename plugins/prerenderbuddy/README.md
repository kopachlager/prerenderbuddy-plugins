# Prerender Buddy

Audit what public search and AI crawlers can retrieve, and optionally review evidence from a Prerender Buddy workspace.

This package contains:

- one public crawler-visibility Agent Skill;
- one authenticated workspace-review Agent Skill;
- a local Prerender Buddy MCP server configuration;
- native compatibility manifests for Codex and Claude Code.

The MCP server runs through `npx --yes @prerenderbuddy/mcp@0.2.0`. It requires Node.js 20 or newer. Its three public audit tools need no account, API key, analytics, or telemetry. When `PRERENDER_BUDDY_API_KEY` is available to the MCP process, it also registers read-only workspace tools backed by the scoped Pro Developer API. Restart the agent host after adding or changing the key.

Never paste the API key into a chat or commit it to a repository. Create a narrowly scoped key in Prerender Buddy and expose it to the local MCP process through the host environment.

The package conforms to the [Agent Plugins 1.0](https://agent-plugins.org/) directory format. Client support and installation methods vary; conformance does not automatically publish this package to a client marketplace.

See the [repository documentation](https://github.com/kopachlager/prerenderbuddy-plugins) for setup, source code, security reporting and release notes.
