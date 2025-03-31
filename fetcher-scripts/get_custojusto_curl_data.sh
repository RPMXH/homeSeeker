#!/bin/bash

source ./db_handler.sh

cj_curls=$(ls ./curls/custojusto*)
cj_prefix=$(cat ./curls/cj_prefix.txt)
cj_suffix=$(cat ./curls/cj_suffix.txt)
# echo $cj_curls

echo "$cj_curls" | while read -r cj_curl; do
  #echo $cj_curl

  output=$(cat $cj_curl | bash)

    echo $output | pup 'a[class^="itemCard_link"]' | while read -r result; do
      if ! [[ "${result:0:2}" == '<a' ]]; then
        continue
      fi

      href_str=$(awk -F'href' '{print $2}' <<< "$result")
      href_str_length=${#href_str}
      href=$(echo ${href_str:2:$((href_str_length-4))})

      id=${href: -8:8}

      page_html=$(echo "$cj_prefix$href$cj_suffix --silent" | bash)
      price=$(echo "$page_html" | pup 'span[class^="vi_price"] json{}' | jq '.[1].children[1].text' | tr -d -c '0-9')

      url=$(echo "https://www.custojusto.pt$href")

      # Crucially, we use printf %q to properly escape the URL for use in the SQL statement, preventing SQL injection.
      escaped_url=$(printf %q "$url")

      upsert_listing "custojusto-$id" $price $escaped_url "$cj_curl"

    sleep 4

    done
done

exit 0