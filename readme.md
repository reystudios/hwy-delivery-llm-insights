Explanation of Syntax and Structure
LLM Service:
-----
Fetches product data directly from the database.
Uses the product's characteristics to create a meaningful prompt.
Sends the prompt to the LLM API and retrieves enriched details.

Database Integration:
-----


Provides product data to the LLM service.

Backend API:
-----


Exposes an endpoint for our DB to request enriched product details.
Delegates the heavy lifting to the LLM service.

Supplies DB further with new tables/data.

Frontend:
-----


Retrieves enriched data from the API and displays it to the user.


-----

Explanation of Syntax and Structure
LLM Service:
-----
Fetches product data directly from the database.
Uses the product's characteristics to create a meaningful prompt.
Sends the prompt to the LLM API and retrieves enriched details.

Database Integration:
-----


Provides product data to the LLM service.

Backend API:
-----


Exposes an endpoint for our DB to request enriched product details.
Delegates the heavy lifting to the LLM service.

Supplies DB further with new tables/data.

Frontend:
-----


Retrieves enriched data from the API and displays it to the user.



## Project Structure

```plaintext
project-root/
│
├── src/
│   ├── jobs/               # For all cron job scripts
│   │   └── cronJob.ts      # The main cron job script
│   ├── services/           # For service integrations (e.g., Supabase, LLM API)
│   │   ├── supabase.ts     # Supabase client setup
│   │   └── llmService.ts   # LLM service integration logic
│   ├── utils/              # For utility functions or shared code
│   ├── config/             # Configuration and environment-related setup
│   │   └── env.ts          # For loading and managing environment variables
│   └── index.ts            # The main entry point
│
├── .env                    # Environment variables
├── package.json            # npm configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation


