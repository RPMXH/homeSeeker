# Home Seeker

Algorithm to find and assess listings (originally for homes, but extensible to other categories).

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

## Underlying Principle

1.  **Data Fetching:** Shell scripts (`fetcher-scripts/`) execute `curl` requests based on saved files, scrape the HTML/JSON responses, and store/update listing details (ID, price, link, source) in a MySQL database. Listings are initially marked as unassessed.
2.  **Assessment:** A separate frontend application (running on `localhost:3000`) allows users to efficiently review unassessed listings from the database and mark them as interesting or not interesting.

The curls requests which are executed by the algorithm must be:

* manually extracted from the browser, and
* added to the correct directory

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
