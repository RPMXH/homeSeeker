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

``` shell
docker compose up -d db backend frontend
```

### Step 2: Add Your Searches

The power of this tool comes from the searches you want it to perform.

1. Get the cURL command:
   * In your web browser, open the Developer Tools (usually F12) and go to the "Network" tab.
   * Perform the search you want on a supported website (e.g., a search for T2 apartments in Lisbon on Idealista).
   * Find the network request that fetches the search results.
     * Review the [network request for supported sources](./supported-sources-network-request.md).
   * Right-click on it and select Copy > Copy as cURL (bash).
2. Save the cURL command:
   * Create a new .txt file inside the fetcher-scripts/curls/ directory. The directories are organized by category (i.e. home, items)
   * Paste the copied curl command into this file.
   * Example path: fetcher-scripts/curls/home/idealista_t2_lisbon.txt



### Run algorithm
#### Algorithm running (in command line)
In the fetcher-scripts directory, run the command 'get_all_curl_data.sh'

## Assessing listings (using the frontend)

In a browser, open a new tab on 'localhost:3000'
Start assessing according to THIS video
