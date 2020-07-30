#!/bin/bash

# 20200414, v1.1
# a default non-root role
MONGO_NON_ROOT_USERNAME="${DATABASE_USERNAME:-user}"
MONGO_NON_ROOT_PASSWORD="${DATABASE_PASSWORD:-secret}"
MONGO_INITDB_DATABASE="${DATABASE_DATABASE:-$MONGO_INITDB_DATABASE}"
MONGO_INITDB_MULTIPLE=${MONGO_INITDB_MULTIPLE:-"${MONGO_INITDB_DATABASE}"}
MONGO_NON_ROOT_ROLE="${MONGO_NON_ROOT_ROLE:-readWrite}"

if [ ! -z "${MONGO_INITDB_ROOT_USERNAME}" ] && [ ! -z ${MONGO_INITDB_ROOT_PASSWORD} ]; then
  MONGO_AUTHENTICATION_STRING=--username ${MONGO_INITDB_ROOT_USERNAME} -p${MONGO_INITDB_ROOT_PASSWORD}
fi

# _js_escape 'some "string" value'
_js_escape() {
  jq --null-input --arg 'str' "$1" '$str'
}

# SEPERATOR
SEPERATOR="-------------------------"

echo -e "${SEPERATOR}\n[started] [MONGODB] MULTIPLE DB INIT\n${SEPERATOR}"

for i in ${MONGO_INITDB_MULTIPLE[@]}; do

  echo -e "${SEPERATOR}\n[started] [MONGODB] Initiating DB '${i}'.\n${SEPERATOR}"

  # for many users in array
  if [ -n "${MONGO_NON_ROOT_USERNAME:-}" ] && [ -n "${MONGO_NON_ROOT_PASSWORD:-}" ]; then

    mongo ${MONGO_AUTHENTICATION_STRING:-} ${i} --authenticationDatabase admin <<-EOJS
    if (db.collection.count() === 0) {
      db.created.insert({"time": new Timestamp() })
      db.createUser({
        user: $(_js_escape "$MONGO_NON_ROOT_USERNAME"),
        pwd: $(_js_escape "$MONGO_NON_ROOT_PASSWORD"),
        roles: [ { role: $(_js_escape "$MONGO_NON_ROOT_ROLE"), db: $(_js_escape "$i") } ]
        })
    }
	EOJS
  fi

  echo -e "${SEPERATOR}\n[finished] [MONGODB] Initiated database '${i}' with user '${MONGO_NON_ROOT_USERNAME}'.\n${SEPERATOR}"

done

echo -e "${SEPERATOR}\n[finished] [MONGODB] MULTIPLE DB INIT\n${SEPERATOR}"
