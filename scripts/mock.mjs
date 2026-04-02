import { spawn } from "node:child_process"

const rawArgs = process.argv.slice(2)

const targets = []
const passthroughArgs = []

for (const arg of rawArgs) {
  if (arg.startsWith("-")) {
    passthroughArgs.push(arg)
  } else {
    targets.push(arg)
  }
}

const resolvedTargets = targets.length > 0 ? targets : ["web"]
const filterArgs = resolvedTargets.flatMap((target) => ["--filter", target])

const child = spawn("pnpm", [...filterArgs, "mock", ...passthroughArgs], {
  stdio: "inherit",
  shell: process.platform === "win32",
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})
