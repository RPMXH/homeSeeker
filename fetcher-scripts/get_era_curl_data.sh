#!/bin/bash

source ./db_handler.sh

era_curls=$(ls ./curls/home/era*)
# echo $era_curls

echo "$era_curls" | while read -r era_curl; do
  # echo $era_curl
  output=$(cat $era_curl | bash)

    #echo "$output" | jq '.PropertyList[]'
    echo "$output" | jq -c '.PropertyList[]' | while read -r result; do

      # Extract the descriptionTags and listingTitle using jq, and create the URL
      id=$(echo "$result" | jq -r '.Reference')
      price=$(echo "$result" | jq '.SellPrice.Value' | tr -d -c '0-9')
      url=$(echo "$result" | jq -r '.DetailUrl')

      # Crucially, we use printf %q to properly escape the URL for use in the SQL statement, preventing SQL injection.
      escaped_url=$(printf %q "$url")

      upsert_listing "era-$id" $price $escaped_url "$era_curl"

    done
done

exit 0