upsert_listing () {
  local id=$1
  local price=$2
  local escaped_url=$3
  local curl=$4

  # Use mysql -e to execute a SQL command.
  sql_result_count=$(mysql -h localhost -P 3306 --protocol=tcp listing_database \
    -e "SELECT * FROM listings WHERE listing_id = '$id';" | wc -l)

  if [ $sql_result_count -gt 1 ] ; then
    mysql -h localhost -P 3306 --protocol=tcp listing_database \
      -e "UPDATE listings SET price ='$price' WHERE listing_id = '$id';"

    # Check for MySQL errors.
    if [ $? -ne 0 ]; then
      echo "MySQL update failed for URL: $escaped_url"
      #  You might want to log the error or take other corrective action here.
    else
      echo "Updated record: $escaped_url" #Optional to know it is going as supposed
    fi
  else
    mysql -h localhost -P 3306 --protocol=tcp listing_database \
     -e "INSERT INTO listings (listing_id, price, listing_link, source)
           VALUES ('$id', '$price', '$escaped_url', '$curl');"

    # Check for MySQL errors.
    if [ $? -ne 0 ]; then
      echo "MySQL insertion failed for URL: $escaped_url"
      #  You might want to log the error or take other corrective action here.
    else
      echo "Inserted record: $escaped_url" #Optional to know it is going as supposed
    fi
  fi


}