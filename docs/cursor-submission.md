# Cursor marketplace submission

This repository supplies the Cursor marketplace descriptor at `.cursor-plugin/marketplace.json`. Its single plugin lives in `plugins/prerenderbuddy`, with a native Cursor manifest, shared skills and Cursor MCP configuration.

## Listing details

**Name:** Prerender Buddy

**Repository:** https://github.com/kopachlager/prerenderbuddy-plugins

**Homepage:** https://prerenderbuddy.com/developer-tools

**Contact:** support@prerenderbuddy.com

**License:** Apache-2.0

**Icon:** `plugins/prerenderbuddy/assets/prerenderbuddy-blue-transparent.png` — static transparent PNG.

**Short description:** Check crawler readability and discovery files, and review AI visibility, citations and website health from Prerender Buddy.

**Description:**

Prerender Buddy helps you understand what search and AI crawlers can retrieve from a website. Audit public HTML, compare normal and crawler-profile HTTP responses, and inspect robots.txt, sitemap.xml and llms.txt directly from Cursor. Public audits need no Prerender Buddy account.

Connect an optional scoped Developer API key to read existing website-health findings, crawler activity, AI visibility, citations, recommendations and content status from your Prerender Buddy workspace. Workspace access is available on Starter, Growth and Pro and remains subject to key permissions.

The plugin includes two focused agent skills and a pinned, open-source local MCP server. It requires Node.js 20 or newer. These tools inspect HTTP responses and recorded evidence; they do not execute browser JavaScript, prove search indexing, generate articles or publish changes.

**Keywords:** SEO, AEO, GEO, AI visibility, citations, crawler, robots, sitemap, llms, MCP.

## Review access

Public mode provides three functional tools without login or a reviewer credential. After installation and MCP approval, test these prompts:

1. “Check crawler readability for https://prerenderbuddy.com.”
2. “Compare the normal HTTP response and the Googlebot profile for https://prerenderbuddy.com.”
3. “Check robots.txt, sitemap.xml and llms.txt for https://prerenderbuddy.com.”

Optional workspace mode adds seven read-only tools. Use a dedicated key supplied privately if reviewers require account access. Do not commit reviewer credentials. [Setup, permissions and troubleshooting](./cursor-setup.md).

## Submit

1. Finish the actual Cursor installation/skill/tool checks recorded in [release readiness](./release-readiness.md).
2. Merge the reviewed Cursor package into the public repository and confirm its default branch contains the marketplace descriptor and complete package.
3. Sign in at https://cursor.com/marketplace/publish and submit the public repository URL. Use the listing details above if the form requests them.
4. Record the actual submission confirmation and review outcome separately. Publishing source is not marketplace approval.

Cursor documents manual review before official listing. [Plugin submission requirements](https://cursor.com/docs/reference/plugins#submitting-a-plugin).
