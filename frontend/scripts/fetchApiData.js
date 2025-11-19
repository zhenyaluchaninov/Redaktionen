import fetch from "node-fetch";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = "https://redaktionen.innovationsarenan.dev/api";
const OUTPUT_DIR = path.join(__dirname, "..", "src", "apiData");

async function fetchAndSave(endpoint, filename) {
  const url = `${BASE_URL}/${endpoint}`;
  console.log(`[FETCH] ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[ERROR] Failed fetch ${endpoint}: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    const filePath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

    const count = Array.isArray(data) ? data.length : Object.keys(data || {}).length;
    console.log(`[OK] ${filename} saved (${count} items)`);
  } catch (error) {
    console.error(`[ERROR] ${endpoint} request failed: ${error.message}`);
  }
}

async function main() {
  await fetchAndSave("signals", "signals.json");
  await fetchAndSave("reports", "reports.json");
  await fetchAndSave("summaries", "summaries.json");
}

main().catch((error) => {
  console.error("[ERROR] Unexpected failure:", error);
  process.exitCode = 1;
});
