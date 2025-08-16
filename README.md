# Home Seeker

# Home Seeker

An application to find, fetch, and assess online listings. Originally built for real estate, but designed to be extensible for other categories.

## The Workflow

The project operates in two main phases:

1.  **Data Fetching (The `fetcher` service):** A containerized set of shell scripts executes `curl` requests that you provide. It scrapes the resulting data and saves new or updated listings to a MySQL database.
2.  **Assessment (The `frontend` service):** A web application reads from the database and provides a simple UI to let you review the fetched listings, marking them as "interesting" or "not interesting".

---

## How to Use

### Step 1: Initial Setup

First, start the core services (Database, Backend, Frontend). From the project's root directory, run:

### Step 2: Add Your Searches
The power of this tool comes from the searches you want it to perform.

1. Get the cURL command:
   * In your web browser, open the Developer Tools (usually F12) and go to the "Network" tab.
   * Perform the search you want on a supported website (e.g., a search for T2 apartments in Lisbon on Idealista).
   * Find the main network request that fetches the search results.
   * Right-click on it and select Copy > Copy as cURL (bash).
2. Save the cURL command:
   * Create a new .txt file inside the fetcher-scripts/curls/ directory. It's best to organize by category (e.g., home/, car/).
   * Paste the copied curl command into this file.
   * Example path: fetcher-scripts/curls/home/idealista_t2_lisbon.txt

## Supported Sources

* Real Estate - Portugal:
  * ERA
  * Remax
  * Zome
  * Idealista
  * OLX
  * Imovirtual
  * CustoJusto

* Other Products:
  * OLX
  * CustoJusto



## Dependencies

The core fetching logic relies on common command-line tools:

*   `curl`: For making HTTP requests.
*   `jq`: For parsing JSON responses.
*   `pup`: For parsing HTML responses. (Install via package manager, e.g., `brew install pup`)
*   `mysql-client`: For interacting with the database.
*   Standard Unix tools (`bash`, `cat`, `ls`, `sed`, `tr`, `awk`, etc.)

*Note: The Docker setup handles these dependencies automatically when running the full application.*

## Steps to run Algorithm

### Extract cUrl request from browser

#### Describe or Video of extracting a curl from browser

Open DevTools -> Network Tab -> <Find Request> -> Right Click -> Copy -> Copy as cURL

### Save in a txt file in the correct directory

### Setup application

In the project root directory run the command 'docker compose up -d'

### Run algorithm
#### Algorithm running (in command line)
In the fetcher-scripts directory, run the command 'get_all_curl_data.sh'

## Assessing listings (using the frontend)

In a browser, open a new tab on 'localhost:3000'
Start assessing according to THIS video
