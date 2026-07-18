const { spawn, spawnSync } = require("child_process");
const path = require("path");

const hostname = process.env.HOST || process.env.HOSTNAME || "0.0.0.0";
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || "production";
const nextBin = path.join(
  __dirname,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const env = {
  ...process.env,
  HOST: hostname,
  PORT: String(port),
  NODE_ENV: nodeEnv,
};

const buildResult = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: __dirname,
  stdio: "inherit",
  env,
});

if (buildResult.status !== 0) {
  process.exit(buildResult.status || 1);
}

const child = spawn(
  process.execPath,
  [nextBin, "start", "-H", hostname, "-p", String(port)],
  {
    cwd: __dirname,
    stdio: "inherit",
    env,
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code || 0);
});

child.on("error", (error) => {
  console.error("Failed to start Next.js server:", error);
  process.exit(1);
});
