import { fetchAndProcessProducts } from "./jobs/services/jobs/fetchAndProcessProducts";

async function main() {
  console.log("Starting the fetch and process job...");
  await fetchAndProcessProducts();
  console.log("Job completed successfully.");
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
