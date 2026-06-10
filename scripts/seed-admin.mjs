#!/usr/bin/env node
import { execFileSync } from "node:child_process";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME ?? "Gestor Fênix Valley";
const remote = process.argv.includes("--remote");

if (!email || !password) {
  console.error("Defina ADMIN_EMAIL e ADMIN_PASSWORD no ambiente.");
  process.exit(1);
}

const ITERATIONS = 100000;
const salt = crypto.getRandomValues(new Uint8Array(16));
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(password),
  "PBKDF2",
  false,
  ["deriveBits"]
);
const bits = await crypto.subtle.deriveBits(
  { name: "PBKDF2", hash: "SHA-256", salt, iterations: ITERATIONS },
  key,
  256
);
const b64 = (bytes) => Buffer.from(bytes).toString("base64");
const hash = `pbkdf2$${ITERATIONS}$${b64(salt)}$${b64(new Uint8Array(bits))}`;

const escape = (value) => value.replaceAll("'", "''");
const sql = `INSERT INTO users (name, email, password_hash, role) VALUES ('${escape(name)}', '${escape(email)}', '${hash}', 'admin') ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, name = excluded.name;`;

execFileSync(
  "yarn",
  ["wrangler", "d1", "execute", "fenixvalley-db", remote ? "--remote" : "--local", "--command", sql],
  { stdio: "inherit" }
);
console.log(`Gestor ${email} criado/atualizado (${remote ? "remote" : "local"}).`);
