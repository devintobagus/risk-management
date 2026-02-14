import fs from "fs"
import path from "path"

const envPath = path.resolve(".env")
const outPath = path.resolve("env.d.ts")

if (!fs.existsSync(envPath)) {
  console.error(".env.local not found")
  process.exit(1)
}

const env = fs.readFileSync(envPath, "utf-8")

const keys = env
  .split("\n")
  .map(l => l.trim())
  .filter(l => l && !l.startsWith("#"))
  .map(l => l.split("=")[0])

const content = `/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
${keys.map(k => `    ${k}: string`).join("\n")}
  }
}
`

fs.writeFileSync(outPath, content)
console.log("✅ env.d.ts generated")
