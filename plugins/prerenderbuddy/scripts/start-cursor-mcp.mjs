import { spawn } from "node:child_process";

// Cursor configuration is optional. An unresolved placeholder is not a key.
const configuredKey = (value) => {
  const key = String(value ?? "").trim();
  return /^\$\{[^}]+\}$/.test(key) ? "" : key;
};
const env = { ...process.env };
const apiKey = configuredKey(env.PB_CURSOR_API_KEY) || configuredKey(env.PRERENDER_BUDDY_API_KEY);
delete env.PB_CURSOR_API_KEY;
if (apiKey) env.PRERENDER_BUDDY_API_KEY = apiKey;
else delete env.PRERENDER_BUDDY_API_KEY;

// Use the same reviewed package as the portable and other native manifests.
const child = spawn("npx", ["--yes", "@prerenderbuddy/mcp@0.2.5"], {
  env,
  stdio: "inherit",
  shell: process.platform === "win32",
  windowsHide: true,
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("error", () => {
  console.error("Prerender Buddy could not start. Install Node.js 20 or newer and ensure npx is on your PATH.");
  process.exitCode = 1;
});
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal === "SIGINT" ? 130 : 143);
});
