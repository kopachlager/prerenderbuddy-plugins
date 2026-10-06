# Prerender Buddy for Cursor

Use Prerender Buddy to inspect crawler-visible HTML and discovery files from Cursor. Public audits need no PB account. With an optional Developer API key, you can also review recorded evidence from your PB workspace.

## Requirements

- Node.js 20 or newer, with `node` and `npx` available on your PATH.
- A Cursor version that supports plugins.
- Starter, Growth or Pro on PB for optional workspace evidence.

The Cursor package includes two skills and the pinned `@prerenderbuddy/mcp@0.2.5` server. It uses a Cursor manifest and MCP configuration alongside the existing portable, Codex, Claude and Grok files.

## Install

Once the official listing is approved, install **Prerender Buddy** from Cursor's Marketplace or Customize page. Marketplace approval is separate from publishing this repository.

For local testing, place the contents of `plugins/prerenderbuddy` in `~/.cursor/plugins/local/prerenderbuddy`, then reload Cursor. Open Customize and confirm the two skills and Prerender Buddy MCP server appear. A team administrator may need to permit local plugin imports. [Cursor's local plugin instructions](https://cursor.com/docs/plugins#test-plugins-locally).

Cursor Agent CLI also supports loading a plugin for a single run:

```sh
cursor-agent --plugin-dir /absolute/path/to/prerenderbuddy-plugins/plugins/prerenderbuddy
```

Cursor may request approval for an individual MCP tool even after the server is approved. For headless CLI runs, configure only the needed `Mcp(server:tool)` permissions in the test project's `.cursor/cli.json`; `--approve-mcps` handles server startup rather than every tool call. The plugin does not change your global permission settings. [Cursor CLI permissions](https://cursor.com/docs/cli/reference/permissions).

## Public audits

Allow the local MCP server to start when Cursor asks. `npx` downloads the pinned public package if it is not already cached.

Example prompts:

- “Check whether crawlers can read https://example.com.”
- “Compare the normal HTTP response and the Googlebot profile for https://example.com.”
- “Check robots.txt, sitemap.xml and llms.txt for https://example.com.”

These checks inspect HTTP responses. They do not execute JavaScript, prove indexing or rank a website. Crawler profiles simulate user-agent headers; they are not verified crawler infrastructure.

## Workspace evidence

1. In PB, open your account menu → Developer API keys and create a dedicated key.
2. Select `sites` for website selection. Add `health`, `activity`, `visibility` and `content` for the corresponding evidence tools. Generation and publishing permissions are not needed by this plugin.
3. If your Cursor installation exposes plugin variables, set the optional **Prerender Buddy API key** under Plugins → Configure. The plugin declares the variable name without storing a secret value.
4. Alternatively, supply `PRERENDER_BUDDY_API_KEY` in the environment used to launch Cursor or Cursor Agent. The launcher accepts either plugin configuration or the inherited environment. A configured nonempty key takes precedence.
5. Reload/restart the host so the MCP server starts with the new key. The seven workspace tools appear at startup only when a key is configured.

For CLI use, load a key from a private file outside your repository without printing it:

```sh
IFS= read -r PRERENDER_BUDDY_API_KEY < /absolute/path/to/private-key.txt
export PRERENDER_BUDDY_API_KEY
cursor-agent --plugin-dir /absolute/path/to/prerenderbuddy-plugins/plugins/prerenderbuddy
```

Never put the value in this repository, a committed MCP configuration, a screenshot or a chat message.

Example prompts:

- “List the websites in my Prerender Buddy workspace.”
- “Review the latest recorded website health and AI visibility for my selected website.”
- “Summarize crawler activity and citations, including the coverage dates.”

The plugin reads existing evidence. It does not launch collections, generate articles, publish content or change settings. Tool responses are scoped by the key's workspace and permissions.

## Troubleshooting

- **No workspace tools:** supply a key to the MCP process and restart it. A blank setting or unresolved configuration placeholder keeps public-only mode.
- **401:** the PB key is invalid or revoked; create/replace it in PB and restart the MCP server.
- **403:** check your plan and the permission needed by the requested operation. A successful website-list request does not establish all permissions.
- **No monitoring data:** configure the relevant feature in PB. Missing stored evidence is not proof of an unhealthy website.
- **Server does not start:** verify Node.js 20+, `npx`, network access to npm and MCP approval in Cursor.

## Support and privacy

Contact [support@prerenderbuddy.com](mailto:support@prerenderbuddy.com). See [privacy](https://prerenderbuddy.com/privacy), [terms](https://prerenderbuddy.com/terms) and [security reporting](../SECURITY.md).

Public audit tools fetch the requested public website from the local MCP process. Optional workspace reads send the API key to PB's Developer API over HTTPS. The plugin adds no analytics or telemetry. Cursor processes tool results under its own account/data settings.
