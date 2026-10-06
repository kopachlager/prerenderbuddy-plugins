# Plugin release readiness

This document separates implemented compatibility from external publication and production verification.

## Implemented

- Shared crawler-visibility and workspace-review Agent Skills.
- Local `@prerenderbuddy/mcp@0.2.5` stdio server.
- Optional read-only Starter, Growth and Pro workspace evidence through the scoped Developer API.
- Agent Plugins 1.0 root manifest and MCP configuration.
- Native Cursor, Codex, Claude Code and Grok Build manifests.
- Cursor, Codex, Claude and Grok marketplace descriptors.
- Cursor optional key configuration, transparent blue logo and setup documentation.
- Portable/native manifest parity validation.
- Vendored Agent Plugins 1.0 schemas with automated JSON Schema validation.
- Node.js 20, 22 and 24 CI matrix.
- Package-local license, notice and usage documentation.

## Verified

- Repository validation passes.
- Agent Plugins manifests match the official 1.0 schemas.
- Vendored schema copies match the upstream canonical files.
- Agent Skill validation passes.
- Codex plugin validation passes.
- Local Codex installation and cache refresh pass.
- MCP initialization and required tool discovery pass.
- Grok Build plugin validation passes for the native package.
- Dependency audit reports no known vulnerabilities.

## External gates before public release

- Validate the native package with the Claude Code CLI.
- Install the portable package in at least one non-Codex Agent Plugins client.
- Re-run the representative audit evaluation set after each host installation.
- Verify the published Codex installation commands from a clean marketplace checkout.
- Verify the VS Code marketplace flow and portable MCP startup.
- Verify the documented Claude Code commands with its native CLI.
- Tag the 0.2 workspace-evidence release and attach a short compatibility matrix.
- Submit to relevant client directories separately; Agent Plugins conformance is not a registry submission.

## Release policy

Keep portable support additive while Agent Plugins 1.0 remains a working draft. Do not remove native manifests until the corresponding clients document that the portable package provides equivalent installation, metadata and runtime behavior.

## Cursor preparation October 6 2026

Implemented the native Cursor package and repository marketplace descriptor, reusing the same two skills and MCP 0.2.5 runtime. Cursor-specific configuration uses a small stdio launcher so public audits work with no account and workspace credentials can come from plugin configuration or the inherited host environment. A static transparent 512px blue PNG and [setup](./cursor-setup.md)/[submission](./cursor-submission.md) instructions are included.

Verification completed:

- Shared manifest/schema validation and Cursor package paths passed.
- Cursor's official template validator passed, pinned to `cursor/plugin-template` commit `46216072ac5750f782f95bb325b4d12b7c3ae9c9`. Its optional-hooks warning is expected; the plugin has no hooks.
- Launcher subprocess checks passed: no key, unresolved key, inherited key, configured key precedence, stdio forwarding and missing `npx` failure.
- The exact published MCP package initialized as 0.2.5. All three public audit calls and all seven sample-workspace read calls passed through the new launcher. All exposed tools declare read-only/non-destructive behavior.
- An unresolved optional variable correctly registered only the three public tools.
- Cursor Agent CLI `2026.08.11-e8db854` discovered three public tools without credentials and all ten tools with the privately supplied workspace key through the actual MCP runtime in an isolated workspace, using the package's resolved configuration. This command reads project MCP configuration rather than `--plugin-dir`; it does not establish plugin skill discovery.
- The logo has an alpha channel and was visually checked.
- Updated the existing validator's `fast-uri` dependency within its allowed 3.x range; npm reported zero vulnerabilities after the update.

Still required before claiming a verified Cursor marketplace release: load the package with an authenticated Cursor Agent/IDE session, confirm both skills and its plugin MCP configuration are discovered together, and run a representative public audit through that session. The installed CLI was signed out; a one-time browser sign-in was started. IDE installation UI and other operating systems have not been verified. Public submission and manual approval remain separate, unconfirmed steps.
