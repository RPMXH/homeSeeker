upsert_listing () {
  local id=$1
  local price=$2
  local escaped_url=$3
  local curl_source=$4

  # Use mysql -e to execute a SQL command.
  sql_select_command="SELECT * FROM listings WHERE listing_id = '$id';"
  sql_result_count=$(execute_mysql_command "$sql_select_command" | wc -l)

  if [ $sql_result_count -gt 1 ] ; then
    sql_update_command="UPDATE listings SET price ='$price' WHERE listing_id = '$id';"
    execute_mysql_command "$sql_update_command"

    # Check for MySQL errors.
    if [ $? -ne 0 ]; then
      echo "MySQL update failed for URL: $escaped_url"
      #  You might want to log the error or take other corrective action here.
    else
      echo "Updated record: $escaped_url" #Optional to know it is going as supposed
    fi
  else
    sql_insert_command="INSERT INTO listings (listing_id, price, listing_link, source)
           VALUES ('$id', '$price', '$escaped_url', '$curl_source');"
    execute_mysql_command "$sql_insert_command"

    # Check for MySQL errors.
    if [ $? -ne 0 ]; then
      echo "MySQL insertion failed for URL: $escaped_url"
      #  You might want to log the error or take other corrective action here.
    else
      echo "Inserted record: $escaped_url" #Optional to know it is going as supposed
    fi
  fi
}

execute_mysql_command() {
  local sql_command="$1"

  # The -N flag suppresses column headers, -s is for silent mode
  mysql -h "$MYSQL_HOST" \
    --port=3306 \
    --protocol=tcp \
    "$MYSQL_DATABASE" \
    --user="$MYSQL_USER" \
    --password="$MYSQL_PASSWORD" \
    --execute="$sql_command"
}