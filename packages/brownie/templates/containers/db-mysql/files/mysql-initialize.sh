#!/bin/bash

VERSION=20210609

set +u

## logger.sh embedded, to manual update: https://gist.github.com/cenk1cenk2/e03d8610534a9c78f755c1c1ed93a293

# coloring
# formats
export RESET='\033[0m'
export BOLD='\033[1m'
export DIM='\033[2m'
export UNDERLINE='\033[4m'

# Regular Colors
export BLACK='\033[38;5;0m'
export RED='\033[38;5;1m'
export GREEN='\033[38;5;2m'
export YELLOW='\033[38;5;3m'
export BLUE='\033[38;5;4m'
export MAGENTA='\033[38;5;5m'
export CYAN='\033[38;5;6m'
export WHITE='\033[38;5;7m'

# Background
export ON_BLACK='\033[48;5;0m'
export ON_RED='\033[48;5;1m'
export ON_GREEN='\033[48;5;2m'
export ON_YELLOW='\033[48;5;3m'
export ON_BLUE='\033[48;5;4m'
export ON_MAGENTA='\033[48;5;5m'
export ON_CYAN='\033[48;5;6m'
export ON_WHITE='\033[48;5;7m'

# predefined
SEPARATOR="${DIM}-------------------------${RESET}"

# default log level and log levels
LOG_LEVEL=${LOG_LEVEL:-"INFO"}

declare -A LOG_LEVELS=([0]=0 [SILENT]=0 [silent]=0 [1]=1 [ERROR]=1 [error]=1 [2]=2 [WARN]=2 [warn]=2 [3]=3 [LIFETIME]=3 [lifetime]=3 [4]=4 [INFO]=4 [info]=4 [5]=5 [DEBUG]=5 [debug]=5)

# log function
log() {
	local LEVEL="${2}"

	if [[ ${LOG_LEVELS[$LEVEL]} ]] && [[ ${LOG_LEVELS[$LOG_LEVEL]} -ge ${LOG_LEVELS[$LEVEL]} ]]; then
		echo -e "${1}"
	fi
}

# general logging function with seperators and level parsing
log_this() {
	INFO="${1:-}"
	SCOPE="${2:-}"
	LEVEL="${3:-"INFO"}"
	SEPARATOR_INSERT="${4:-}"

	DATA="${INFO}"

	if [ -n "${SCOPE}" ] && [ "${SCOPE}" != "false" ]; then
		DATA="[${SCOPE}] ${DATA}"
	fi

	if [ -n "${SEPARATOR_INSERT}" ]; then
		if [[ ${SEPARATOR_INSERT} == "top" ]] || [[ ${SEPARATOR_INSERT} == "both" ]]; then
			DATA="${SEPARATOR}\n${DATA}"
		fi

		if [[ ${SEPARATOR_INSERT} == "bottom" ]] || [[ ${SEPARATOR_INSERT} == "both" ]]; then
			DATA="${DATA}\n${SEPARATOR}"
		fi
	fi

	log "${DATA}" "${LEVEL}"
}

# LOG_LEVEL = 1
log_error() {
	log_this "${1:-}" "${RED}ERROR${RESET}" "ERROR" "${2:-}"
}

log_interrupt() {
	log_this "${1:-}" "${RED}INTERRUPT${RESET}" "ERROR" "${2:-}"
}

# LOG_LEVEL = 2
log_warn() {
	log_this "${1:-}" "${YELLOW}WARN${RESET}" "WARN" "${2:-}"
}

# LOG_LEVEL = 3
log_start() {
	log_this "${1:-}" "${GREEN}START${RESET}" "LIFETIME" "${2:-}"
}

log_finish() {
	log_this "${1:-}" "${GREEN}FINISH${RESET}" "LIFETIME" "${2:-}"
}

# LOG_LEVEL = 4
log_info() {
	log_this "${1:-}" "${CYAN}INFO${RESET}" "INFO" "${2:-}"
}

log_wait() {
	log_this "${1:-}" "${YELLOW}WAIT${RESET}" "INFO" "${2:-}"
}

log_divider() {
	log "${SEPARATOR}" "INFO"
}

# LOG_LEVEL = 5
log_debug() {
	log_this "${1:-}" "${DIM}DEBUG${RESET}" "DEBUG" "${2:-}"
}

## END logger.sh embedded

## greet
SCRIPT_NAME="${YELLOW}mysql-multiple-init${RESET}"
log_this "${VERSION} - Starting up..." "${SCRIPT_NAME}" "LIFETIME" "bottom"

## END greet

## initate-variables.sh, version 202105261454
# set REQUIRED_VARIABLES_NAME for variables required
# set OPTIONAL_VARIABLES_NAME and OPTIONAL_VARIABLES_DEFAULTS for initiating rest of variables

## required variables
REQUIRED_VARIABLES_NAME=("MYSQL_ROOT_PASSWORD")

## optional variables
log_start "Setting defaults for optional environment variables..."
OPTIONAL_VARIABLES_NAME=("MYSQL_USER" "MYSQL_INITDB_MULTIPLE")
OPTIONAL_VARIABLES_DEFAULTS=("${DATABASE_USERNAME:-user}" "${DATABASE_DATABASE[@]}")

for i in "${!OPTIONAL_VARIABLES_NAME[@]}"; do
	VALUE=$(eval "echo \$${OPTIONAL_VARIABLES_NAME[$i]}")
	if [ -z "${VALUE}" ]; then
		log_debug "${OPTIONAL_VARIABLES_NAME[$i]} is not set using default: ${OPTIONAL_VARIABLES_DEFAULTS[$i]}"
		eval "export ${OPTIONAL_VARIABLES_NAME[$i]}='${OPTIONAL_VARIABLES_DEFAULTS[$i]}'"
	fi
done
log_finish "Set some sane-defaults for environment variables."

log_start "Testing required environment variables..."
for i in "${!REQUIRED_VARIABLES_NAME[@]}"; do
	VALUE=$(eval "echo \$${REQUIRED_VARIABLES_NAME[$i]}")
	[ -z "${VALUE}" ] && log_error "${REQUIRED_VARIABLES_NAME[$i]} is unset." && REQUIRED_VARIABLE_IS_UNSET=true
done
log_finish "All required environment variables are in place."

[ -n "$REQUIRED_VARIABLE_IS_UNSET" ] && log_error "Can not run withot the required variables." && exit 127

## END initate-variables.sh

docker_process_sql() {
	mysql -uroot -p${MYSQL_ROOT_PASSWORD} -hlocalhost --batch $@
}

for i in ${MYSQL_INITDB_MULTIPLE[@]}; do

	log_start "Initiating database ${i} with user '${MYSQL_USER}'..." "bottom"

	echo "CREATE DATABASE IF NOT EXISTS ${i};" | docker_process_sql --database=mysql
	echo "GRANT ALL ON ${i}.* TO '${MYSQL_USER}'@'%';" | docker_process_sql --database=mysql

	log_finish "Created database: ${i}" "top"

done

log_this "${VERSION} - Finished." "${SCRIPT_NAME}" "LIFETIME" "top"
