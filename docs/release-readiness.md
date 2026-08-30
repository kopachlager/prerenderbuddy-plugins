# Plugin release readiness

This document separates implemented compatibility from external publication and production verification.

## Implemented

- Shared crawler-visibility and workspace-review Agent Skills.
- Local `@prerenderbuddy/mcp@0.2.0` stdio server.
- Optional read-only Pro workspace evidence through the scoped Developer API.
- Agent Plugins 1.0 root manifest and MCP configuration.
- Native Codex and Claude Code manifests.
- Codex and Claude marketplace descriptors.
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
