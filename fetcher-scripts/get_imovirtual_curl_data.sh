#!/bin/bash

source ./db_handler.sh

extract_listing_id() {
  local hyperlink="$1"
  local id=""

  # Extract the part after the last '-'
  # ${hyperlink##*-} removes the longest match of '*-' from the beginning of the string
  id="${hyperlink##*-}"

  # If the extracted part contains a '?', remove everything from '?' onwards
  # ${id%%\?*} removes the shortest match of '?*' from the end of the string
  id="${id%%\?*}"

  # If the resulting ID ends with a double quote, remove it
  # ${id%"\""} removes the shortest match of '"' from the end of the string
  id="${id%\"}"

  echo "$id"
}

imovirtual_curls=$(ls ./curls/home/imovirtual*)
# echo $imovirtual_curls

echo "$imovirtual_curls" | while read -r imovirtual_curl; do
  # echo $imovirtual_curl
  output=$(cat $imovirtual_curl | bash)

    #echo $output | pup 'article[data-cy="listing-item"] > section json{}' | jq '.[1]'
    echo $output | pup 'article[data-cy="listing-item"] > section json{}' | jq -c '.[]' | while read -r result; do

      href=$(echo $result | jq '.children[1].children[1].href')

      id=$(extract_listing_id "$href")
      url=$(echo "$href" | jq -r '"https://www.imovirtual.com\(.)"')
      escaped_url=$(printf %q "$url")
      price=$(echo "$result" | jq '.children[1].children[0].children[0].children[0].text' | tr -d -c '0-9')

      upsert_listing "imovirtual-$id" $price $escaped_url "$imovirtual_curl"

    done
done

exit 0