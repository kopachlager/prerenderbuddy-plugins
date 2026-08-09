# Prerender Buddy

Audit what public search and AI crawlers can retrieve from a website.

This package contains:

- one portable crawler-visibility Agent Skill;
- a local Prerender Buddy MCP server configuration;
- native compatibility manifests for Codex and Claude Code.

The MCP server runs through `npx --yes @prerenderbuddy/mcp@0.1.6`. It requires Node.js 20 or newer and makes outbound requests only to public URLs selected by the user. No Prerender Buddy account, API key, analytics or telemetry is required.

The package conforms to the [Agent Plugins 1.0](https://agent-plugins.org/) directory format. Client support and installation methods vary; conformance does not automatically publish this package to a client marketplace.

See the [repository documentation](https://github.com/kopachlager/prerenderbuddy-plugins) for setup, source code, security reporting and release notes.
