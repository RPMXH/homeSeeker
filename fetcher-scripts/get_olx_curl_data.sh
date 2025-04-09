
source ./db_handler.sh

get_olx_home_curl_data(){

  local article=$1

  olx_curls=$(ls ./curls/$article/olx*)
  #echo $olx_curls

  loc_prefix="São Mamede De Infesta E Senhora Da Hora"

  echo "$olx_curls" | while read -r olx_curl; do
    #echo $olx_curl

    output=$(cat $olx_curl | bash)

      #echo "$output" | pup -c 'div[data-cy="l-card"] json{}' | jq '.[1]'
      echo "$output" | pup 'div[data-cy="l-card"] json{}' | jq -c '.[]' | while read -r result; do
        id=$(echo "$result" | jq -r '.id')

        html_result=$(echo "$result" | jq '.children[0].children[0].children[1]')
        loc=$(echo "$html_result" | jq -r '.children[2].children[0].text')

        if [[ ! "$loc" =~ ^"$loc_prefix" ]]; then
          continue
        fi

        price=$(echo "$html_result" | jq '.children[0].children[1].text' | tr -d -c '0-9')
        url=$(echo "$html_result" | jq -r '.children[0].children[0].href')

        if !  echo "$url" | grep -q "^http"; then
          continue
        fi

        # Crucially, we use printf %q to properly escape the URL for use in the SQL statement, preventing SQL injection.
        escaped_url=$(printf %q "$url")

        upsert_listing "$article-olx-$id" $price "$escaped_url" "$olx_curl"

      done
  done
}

get_olx_curl_data(){

  local article=$1

  olx_curls=$(ls ./curls/$article/olx*)
  #echo $olx_curls

  echo "$olx_curls" | while read -r olx_curl; do
    #echo $olx_curl

    output=$(cat $olx_curl | bash)

      #echo "$output" | pup -c 'div[data-cy="l-card"] json{}' | jq '.[1]'
      echo "$output" | pup 'div[data-cy="l-card"] json{}' | jq -c '.[]' | while read -r result; do
        id=$(echo "$result" | jq -r '.id')
        html_result=$(echo "$result" | jq '.children[0].children[0].children[1]')
        price=$(echo "$html_result" | jq '.children[0].children[1].text' | tr -d -c '0-9')
        url=$(echo "$html_result" | jq -r '.children[0].children[0].href')

        # Crucially, we use printf %q to properly escape the URL for use in the SQL statement, preventing SQL injection.
        escaped_url=$(printf %q "$url")

        upsert_listing "$article-olx-$id" $price "https://www.olx.pt$escaped_url" "$olx_curl"

      done
  done
}