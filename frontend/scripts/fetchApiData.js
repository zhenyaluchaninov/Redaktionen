import { snapshotApiData } from "./snapshotApi.js";

snapshotApiData().catch((error) => {
  console.error("[ERROR] Unexpected failure:", error);
  process.exitCode = 1;
});
