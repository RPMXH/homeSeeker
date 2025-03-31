#!/bin/bash

strong_echo () {
  local value_to_echo=$1

  echo ""
  echo "#####"
  echo "##### $value_to_echo"
  echo "#####"
  echo ""
}

echo "#############################"
echo "##### GET ALL CURL DATA #####"
echo "#############################"

strong_echo "REMAX"
./get_remax_curl_data.sh

strong_echo "ERA"
./get_era_curl_data.sh

strong_echo "IMOVIRTUAL"
./get_imovirtual_curl_data.sh

strong_echo "ZOME"
./get_zome_curl_data.sh

strong_echo "IDEALISTA"
./get_idealista_curl_data.sh

strong_echo "OLX"
./get_olx_curl_data.sh

strong_echo "CUSTO JUSTO"
./get_custojusto_curl_data.sh

exit 0

