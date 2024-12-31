import { queryLLM } from "../llmService";
import { supabase } from "../supabase";

/**
 * Processes a single product to fetch its characteristics, query the LLM, and save the response.
 * @param product The product data from Supabase.
 */
async function processProduct(product: any) {
  try {
    const characteristics = (product.product_characteristics || []).reduce(
      (
        acc: Record<string, string[]>,
        char: { characteristic_key: string; characteristic_value: string }
      ) => {
        acc[char.characteristic_key] = acc[char.characteristic_key] || [];
        acc[char.characteristic_key].push(char.characteristic_value);
        return acc;
      },
      {}
    );

    // Construct the prompt for ChatGPT
    const prompt = `
      ChatGPT, using the product characteristics given below:
      ${JSON.stringify(characteristics, null, 2)}

      Please generate a detailed "About this product" description. Include:
      - Effects on the user when consuming or applying the product.
      - Key ingredients or materials (if applicable).
      - Battery life (if applicable).
      - How the product works.
      - Any other relevant details or unique selling points.
    `;

    console.log("Generated Prompt:", prompt);

    // Query LLM (ChatGPT)
    const llmResponse = await queryLLM(prompt);

    console.log("LLM Response:", llmResponse);

    // Save the response to the llm_response table
    const { error: insertError } = await supabase.from("llm_response").insert([
      {
        product_id: product.id,
        llm_response: llmResponse,
      },
    ]);

    if (insertError) {
      throw new Error(`Error saving LLM response: ${insertError.message}`);
    }

    console.log(`LLM response saved for product ID: ${product.id}`);
  } catch (error) {
    console.error(`Error processing product ID ${product.id}:`, error);
  }
}

/**
 * Fetches products from Supabase and processes each product.
 */
export async function fetchAndProcessProducts() {
  try {
    // Fetch products and their characteristics
    const { data: products, error } = await supabase
      .from("products")
      .select(
        `
          *,
          product_characteristics (
              characteristic_key,
              characteristic_value
          )
        `
      )
      .eq("is_deleted", false);

    if (error) {
      throw new Error(`Supabase fetch error: ${error.message}`);
    }

    if (!products || products.length === 0) {
      console.log("No products found.");
      return;
    }

    // Process each product
    for (const product of products) {
      await processProduct(product);
    }
  } catch (err) {
    console.error("Error in fetchAndProcessProducts:", err);
  }
}
