#!/bin/bash

# source me: source <(curl -s "https://gist.githubusercontent.com/cenk1cenk2/02a6451d92f063c7ad1233dd73ba6059/raw/POSTGRES-initialize.sh?$(date +%s)")

VERSION=v2.1.0
SCRIPT_NAME="${YELLOW}postgresql-multiple-init${RESET}"

########## START-OF common.sh
# source me: source <(curl -s "https://gist.githubusercontent.com/cenk1cenk2/0446f3be22a39c9f5fe5ee1cfb3cca63/raw/common.sh?$(date +%s)")

# Constants
RESET='\033[0m'
RED='\033[38;5;1m'
GREEN='\033[38;5;2m'
YELLOW='\033[38;5;3m'
MAGENTA='\033[38;5;5m'
CYAN='\033[38;5;6m'
SEPERATOR="\033[90m-------------------------${RESET}"

stdout_print() {
  # 'is_boolean_yes' is defined in libvalidations.sh, but depends on this file so we cannot source it
  local bool="${QUIET:-false}"
  # comparison is performed without regard to the case of alphabetic characters
  shopt -s nocasematch
  if ! [[ "$bool" = 1 || "$bool" =~ ^(yes|true)$ ]]; then
    echo -e "${RESET}${1}"
  fi
}

log_debug() {
  # 'is_boolean_yes' is defined in libvalidations.sh, but depends on this file so we cannot source it
  local bool="${DEBUG:-false}"
  # comparison is performed without regard to the case of alphabetic characters
  shopt -s nocasematch
  if [[ "$bool" = 1 || "$bool" =~ ^(yes|true)$ ]]; then
    log_this "${1:-}" "${MAGENTA}DEBUG${RESET}" "${2}"
  fi
}

log_this() {
  INFO="${1:-}"
  SCOPE="${2:-}"
  SEPERATOR_INSERT="${3:-}"

  DATA="${INFO}"

  if [ ! -z "${SCOPE}" ] && [ "${SCOPE}" != "false" ]; then
    DATA="[${SCOPE}] ${DATA}"
  fi

  if [ ! -z "${SEPERATOR_INSERT}" ]; then
    if [[ ${SEPERATOR_INSERT} == "top" ]] || [[ ${SEPERATOR_INSERT} == "both" ]]; then
      DATA="${SEPERATOR}\n${DATA}"
    fi

    if [[ ${SEPERATOR_INSERT} == "bottom" ]] || [[ ${SEPERATOR_INSERT} == "both" ]]; then
      DATA="${DATA}\n${SEPERATOR}"
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

docker_process_sql() {
  psql --username "${POSTGRES_USER}" --dbname "${POSTGRES_DB}" $@
}

for i in ${POSTGRES_INITDB_MULTIPLE[@]}; do

  log_start "Init database: ${i} with user '${POSTGRES_USER}'" "bottom"

  echo "CREATE USER \"${POSTGRES_USER}\"" | docker_process_sql
  echo "CREATE DATABASE \"${i}\";" | docker_process_sql
  echo "GRANT ALL PRIVILEGES ON DATABASE \"${i}\" TO \"${POSTGRES_USER}\";" | docker_process_sql

  log_finish "Init database: ${i}" "top"

done

log_this "${VERSION} - Finished." "${SCRIPT_NAME}" "top"
