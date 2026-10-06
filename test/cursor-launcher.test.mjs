import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, writeFile, chmod, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const exec = promisify(execFile);
const launcher = resolve("plugins/prerenderbuddy/scripts/start-cursor-mcp.mjs");

test("Cursor launcher passes stdio, preserves the pinned command and selects credentials without requiring them", {
  skip: process.platform === "win32",
}, async () => {
  const fixture = await mkdtemp(join(tmpdir(), "pb-cursor-launcher-"));
  try {
    const stub = join(fixture, "npx");
    await writeFile(stub, `#!${process.execPath}\nprocess.stdin.pipe(process.stdout);\nconsole.log(JSON.stringify({args:process.argv.slice(2),key:process.env.PRERENDER_BUDDY_API_KEY??null,alias:process.env.PB_CURSOR_API_KEY??null}));\n`);
    await chmod(stub, 0o755);
    const cases = [
      { plugin: "", inherited: "", expected: null },
      { plugin: "${PRERENDER_BUDDY_API_KEY}", inherited: "", expected: null },
      { plugin: "${PRERENDER_BUDDY_API_KEY}", inherited: "pb_test_inherited", expected: "pb_test_inherited" },
      { plugin: "", inherited: "pb_test_inherited", expected: "pb_test_inherited" },
      { plugin: "pb_test_configured", inherited: "pb_test_inherited", expected: "pb_test_configured" },
    ];
    for (const row of cases) {
      const child = execFile(process.execPath, [launcher], {
        env: { ...process.env, PATH: fixture, PB_CURSOR_API_KEY: row.plugin, PRERENDER_BUDDY_API_KEY: row.inherited },
        timeout: 5000,
      });
      child.stdin.end("stdio probe\n");
      const output = await new Promise((accept, reject) => {
        let stdout = "";
        child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
        child.on("error", reject);
        child.on("exit", (code) => code === 0 ? accept(stdout) : reject(new Error(`Launcher exited ${code}`)));
      });
      const [metadata, echoed] = output.trim().split("\n");
      const parsed = JSON.parse(metadata);
      assert.deepEqual(parsed.args, ["--yes", "@prerenderbuddy/mcp@0.2.5"]);
      assert.equal(parsed.key, row.expected);
      assert.equal(parsed.alias, null);
      assert.equal(echoed, "stdio probe");
    }
    await assert.rejects(exec(process.execPath, [launcher], {
      env: { ...process.env, PATH: join(fixture, "missing") },
      timeout: 5000,
    }), (error) => error.code === 1 && /Install Node.js 20 or newer/.test(error.stderr));
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
