#!/bin/bash

source ./db_handler.sh

zome_curls=$(ls ./curls/zome*)
# echo $zome_curls

echo "$zome_curls" | while read -r zome_curl; do
  # echo $zome_curl
  output=$(cat $zome_curl | bash)

    # echo "$output" | jq -c
    echo "{\"data\":$output}" | jq -c '.data[]' | while read -r result; do

      # Extract the descriptionTags and listingTitle using jq, and create the URL
      id=$(echo "$result" | jq '.id')
      price=$(echo "$result" | jq '.precoimovel' | tr -d -c '0-9')
      url=$(echo "$result" | jq -r '.url_detail_view_link' | jq -r '"https://www.zome.pt/pt/\(.PT)"')

      # Crucially, we use printf %q to properly escape the URL for use in the SQL statement, preventing SQL injection.
      escaped_url=$(printf %q "$url")

      upsert_listing "zome-$id" $price $escaped_url "$zome_curl"

    done
done

exit 0