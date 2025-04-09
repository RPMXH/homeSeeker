#!/bin/bash

source ./db_handler.sh

idealista_curls=$(ls ./curls/home/idealista*)
# echo $idealista_curls

echo "$idealista_curls" | while read -r idealista_curl; do
  #echo $idealista_curl

  output=$(cat $idealista_curl | bash)

    #echo "$output" | pup -c 'article.item json{}' | jq -c '.[1]'
    echo "$output" | pup 'article.item json{}' | jq -c '.[]' | while read -r result; do

      # Extract the descriptionTags and listingTitle using jq, and create the URL
      price=$(echo "$result" | jq -r '.children[1].children[2].children[0].text' | tr -d -c '0-9')
      url=$(echo "$result" | jq -r '"https://www.idealista.pt\(.children[1].children[1].href)"')
      id=$(echo "$url" | tr -d -c '0-9')

      if [ -z "$id" ]; then
        continue
      fi

      # Crucially, we use printf %q to properly escape the URL for use in the SQL statement, preventing SQL injection.
      escaped_url=$(printf %q "$url")

      upsert_listing "idealista-$id" $price $escaped_url "$idealista_curl"

    done
done

exit 0