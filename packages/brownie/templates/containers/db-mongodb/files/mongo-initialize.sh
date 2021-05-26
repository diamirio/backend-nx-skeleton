#!/bin/bash

# Constants
RESET='\033[0m'
RED='\033[38;5;1m'
GREEN='\033[38;5;2m'
YELLOW='\033[38;5;3m'
MAGENTA='\033[38;5;5m'
CYAN='\033[38;5;6m'
SEPARATOR="\033[90m-------------------------${RESET}"

VERSION=v2.1.0
SCRIPT_NAME="${YELLOW}mongodb-multiple-init${RESET}"

########## START-OF common.sh
# source me: source <(curl -s "https://gist.githubusercontent.com/cenk1cenk2/0446f3be22a39c9f5fe5ee1cfb3cca63/raw/common.sh?$(date +%s)")

stdout_print() {
	# 'is_boolean_yes' is defined in libvalidations.sh, but depends on this file so we cannot source it
	local bool="${QUIET:-false}"
	# comparison is performed without regard to the case of alphabetic characters
	shopt -s nocasematch
	if ! [[ $bool == 1 || $bool =~ ^(yes|true)$ ]]; then
		echo -e "${RESET}${1}"
	fi
}

log_debug() {
	# 'is_boolean_yes' is defined in libvalidations.sh, but depends on this file so we cannot source it
	local bool="${DEBUG:-false}"
	# comparison is performed without regard to the case of alphabetic characters
	shopt -s nocasematch
	if [[ $bool == 1 || $bool =~ ^(yes|true)$ ]]; then
		log_this "${1:-}" "${MAGENTA}DEBUG${RESET}" "${2}"
	fi
}

log_this() {
	INFO="${1:-}"
	SCOPE="${2:-}"
	SEPARATOR_INSERT="${3:-}"

	DATA="${INFO}"

	if [ ! -z "${SCOPE}" ] && [ "${SCOPE}" != "false" ]; then
		DATA="[${SCOPE}] ${DATA}"
	fi

	if [ ! -z "${SEPARATOR_INSERT}" ]; then
		if [[ ${SEPARATOR_INSERT} == "top" ]] || [[ ${SEPARATOR_INSERT} == "both" ]]; then
			DATA="${SEPARATOR}\n${DATA}"
		fi

		if [[ ${SEPARATOR_INSERT} == "bottom" ]] || [[ ${SEPARATOR_INSERT} == "both" ]]; then
			DATA="${DATA}\n${SEPARATOR}"
		fi
	fi

	stdout_print "${DATA}"
}

log_start() {
	log_this "${1:-}" "${GREEN}START${RESET}" "${2:-}"
}

log_finish() {
	log_this "${1:-}" "${GREEN}FINISH${RESET}" "${2:-}"
}

########## END-OF common.sh

log_this "${VERSION} - Starting up..." "${SCRIPT_NAME}" "bottom"

# a default non-root role
MONGO_NON_ROOT_USERNAME="${DATABASE_USERNAME:-user}"
MONGO_NON_ROOT_PASSWORD="${DATABASE_PASSWORD:-secret}"
MONGO_INITDB_DATABASE="${DATABASE_DATABASE:-${MONGO_INITDB_DATABASE}}"
MONGO_INITDB_MULTIPLE="${MONGO_INITDB_MULTIPLE:-${MONGO_INITDB_DATABASE}}"
MONGO_NON_ROOT_ROLE="${MONGO_NON_ROOT_ROLE:-readWrite}"
MONGO_INITDB_ROOT_PASSWORD="${MONGO_INITDB_ROOT_PASSWORD:-${MONGODB_ROOT_PASSWORD}}"

if [ ! -z "${MONGO_INITDB_ROOT_PASSWORD}" ]; then
	MONGO_AUTHENTICATION_STRING="--authenticationDatabase admin --username root -p${MONGO_INITDB_ROOT_PASSWORD}"
else
	MONGO_AUTHENTICATION_STRING=""
fi

for i in ${MONGO_INITDB_MULTIPLE[@]}; do

	log_start "Init database: ${i} with user '${MONGO_NON_ROOT_USERNAME}'" "bottom"

	# for many users in array
	if [ -n "${MONGO_NON_ROOT_USERNAME:-}" ] && [ -n "${MONGO_NON_ROOT_PASSWORD:-}" ]; then

		mongo ${MONGO_AUTHENTICATION_STRING} ${i} <<-EOJS
			    if (db.collection.count() === 0) {
			      db.created.insert({"time": new Timestamp() })
			      db.createUser({
			        user: "$MONGO_NON_ROOT_USERNAME",
			        pwd: "$MONGO_NON_ROOT_PASSWORD",
			        roles: [ { role: "$MONGO_NON_ROOT_ROLE", db: "$i" } ]
			        })
			    }
		EOJS
	fi

	log_finish "Init database: ${i}" "top"

done

log_this "${VERSION} - Finished." "${SCRIPT_NAME}" "top"
