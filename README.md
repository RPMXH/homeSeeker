# Home Seeker

Algorithm to find and assess listings (originally for homes)

## Underlying principle, and how does it achieve the objective

* The algorithm performs curl requests, scrapes the response, and stores listings in a database as unassessed listings.
    * Running the algorithm again will only add new records to the database, and update the prices of active listings.
* Then, at any time, by querying the database for unassessed records, and reviewing and assess each listing, as either
  interesting or not
    * The frontend makes the assessment effort much more user-friendly.

The curls requests which are executed by the algorithm must be:

* manually extracted from the browser, and
* added to the correct directory

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
