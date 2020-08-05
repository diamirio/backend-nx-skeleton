#!/bin/bash

# SEPERATOR
SEPERATOR="-------------------------"

echo -e "${SEPERATOR}\n[started] [MYSQL] MULTIPLE DB INIT\n${SEPERATOR}"

for i in ${MYSQL_INITDB_MULTIPLE[@]}; do

  echo -e "${SEPERATOR}\n[started] [MYSQL] Initiating DB '${i}'.\n${SEPERATOR}"

  echo "CREATE DATABASE IF NOT EXISTS ${i};" | mysql -uroot -p${MYSQL_ROOT_PASSWORD} --database=mysql
  echo "GRANT ALL ON ${i}.* TO '${MYSQL_USER}'@'%';" | mysql -uroot -p${MYSQL_ROOT_PASSWORD} --database=mysql

  echo -e "${SEPERATOR}\n[finished] [MYSQL] Initiated database '${i}' with user '${MYSQL_USER}'.\n${SEPERATOR}"

done

echo -e "${SEPERATOR}\n[finished] [MYSQL] MULTIPLE DB INIT\n${SEPERATOR}"
