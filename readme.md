Explanation of Syntax and Structure
LLM Service:
 "###"
Fetches product data directly from the database.
Uses the product's characteristics to create a meaningful prompt.
Sends the prompt to the LLM API and retrieves enriched details.
 "###"
Database Integration:

Provides product data to the LLM service.
 "###"
Backend API:

Exposes an endpoint for our DB to request enriched product details.
Delegates the heavy lifting to the LLM service.

Supplies DB further with new tables/data.
 "###"
Frontend:

Retrieves enriched data from the API and displays it to the user.
