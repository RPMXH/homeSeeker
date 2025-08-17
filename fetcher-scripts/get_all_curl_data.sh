#!/bin/bash

source ./get_olx_curl_data.sh
source ./get_custojusto_curl_data.sh

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

# HOME

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

strong_echo "CUSTO JUSTO - HOME"
get_custojusto_curl_data "home"

# ITEMS

strong_echo "OLX - ITEMS"
get_olx_curl_data "items"

strong_echo "CUSTO JUSTO - ITEMS"
get_custojusto_curl_data "items"

exit 0

