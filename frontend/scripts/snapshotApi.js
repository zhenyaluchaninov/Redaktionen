import fetch from "node-fetch";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL =
  process.env.API_BASE_URL ?? "https://redaktionen.innovationsarenan.dev/api";
const OUTPUT_DIR = path.join(__dirname, "..", "src", "apiData");

const endpoints = [
  { endpoint: "signals", filename: "signals.json" },
  { endpoint: "reports", filename: "reports.json" },
  { endpoint: "summaries", filename: "summaries.json" },
  { endpoint: "agents", filename: "agents.json" },
];

const ensureOutputDir = () => fs.mkdir(OUTPUT_DIR, { recursive: true });

export const fetchAndSave = async (endpoint, filename) => {
  const url = `${BASE_URL}/${endpoint}`;
  console.log(`[FETCH] ${url}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed fetch ${endpoint}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const filePath = path.join(OUTPUT_DIR, filename);
  await ensureOutputDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

  const count = Array.isArray(data) ? data.length : data && typeof data === "object"
    ? Object.keys(data).length
    : 0;
  console.log(`[OK] ${filename} saved (${count} items)`);
};

export const snapshotApiData = async () => {
  for (const { endpoint, filename } of endpoints) {
    try {
      await fetchAndSave(endpoint, filename);
    } catch (error) {
      console.error(`[ERROR] ${endpoint}: ${error.message}`);
    }
  }
};

if (process.argv[1] === __filename) {
  snapshotApiData().catch((error) => {
    console.error("[ERROR] Unexpected failure:", error);
    process.exitCode = 1;
  });
}
