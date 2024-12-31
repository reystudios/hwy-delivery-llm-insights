import { queryLLM } from "../llmService";
import { supabase } from "../supabase";

async function main() {
  try {
    console.log("Fetching product data from Supabase...");
    // Fetch product data from Supabase
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.log("No products found in the database.");
      return;
    }

    // Example: Generate prompt for the first product
    const product = data[0];
    console.log("Product fetched:", product);

    const prompt = `
      Tell me about this product:
      Name: ${product.name}
      Characteristics: ${JSON.stringify(product.characteristics)}
      Price: ${product.price}
    `;

    console.log("Generated prompt for LLM:", prompt);

    // Query LLM
    console.log("Querying LLM...");
    const response = await queryLLM(prompt);

    console.log("LLM Response:", response);

    // Save the response back to Supabase
    console.log("Updating the product with LLM description...");
    const updateResponse = await supabase
      .from("products")
      .update({ llmDescription: response })
      .eq("id", product.id);

    if (updateResponse.error) {
      throw new Error(`Supabase Update Error: ${updateResponse.error.message}`);
    }

    console.log("Product description updated successfully.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
  }
}

main();
