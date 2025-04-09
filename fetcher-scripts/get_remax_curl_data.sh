#!/bin/bash

source ./db_handler.sh

remax_curls=$(ls ./curls/home/remax*)
# echo $remax_curls

echo "$remax_curls" | while read -r remax_curl; do
  # echo $remax_curl
  output=$(cat $remax_curl | bash)

    # echo "$output" | jq -c '.results[]'
    echo "$output" | jq -c '.results[]' | while read -r result; do

      # Extract the descriptionTags and listingTitle using jq, and create the URL
      id=$(echo "$result" | jq -r '.listingTitle')
      price=$(echo "$result" | jq '.listingPrice')
      url=$(echo "$result" | jq -r '"https://www.remax.pt/pt/imoveis/\(.descriptionTags)/\(.listingTitle)"')

      # Crucially, we use printf %q to properly escape the URL for use in the SQL statement, preventing SQL injection.
      escaped_url=$(printf %q "$url")

      upsert_listing "remax-$id" $price $escaped_url "$remax_curl"

    done

done

exit 0