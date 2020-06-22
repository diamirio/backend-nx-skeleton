#!/bin/bash

SEPERATOR="------------------------"

source /.env

# Clean up all services
rm -r /etc/services.d && mkdir -p /etc/services.d

if [[ ! -z ${RUN_IN_BAND} ]]; then
  echo -e "[supervisor] RUN_IN_BAND set will run in sequential mode."
  echo "RUN_IN_BAND_ITEM=0" >/.lock
fi

echo "${SEPERATOR}"
for SERVICE in $(echo "${SERVICES}" | sed -r "s/:/ /g"); do
  # Get service options
  SERVICE_ARRAY=($(echo "${SERVICE}" | sed "s/,/ /g"))
  SERVICE_PATH=${SERVICE_ARRAY[0]}
  SERVICE_DIR_SAFE=$(echo "${SERVICE_PATH}" | sed -r "s/\//_/g")
  SERVICE_OPTIONS=$(echo "${SERVICE_ARRAY[@]:1}")

  # check for options
  OFF=$(echo "${SERVICE_OPTIONS[@]}" | grep -q off || grep -q OFF)
  PACKAGE_START_OVERRIDE=$(echo "${SERVICE_OPTIONS[@]}" | grep -o -E "override=('|\")?(.*)('|\")?" | sed -r "s/override=('|\")?(.*)('|\")?/\2/g")

  if [[ -z "${OFF}" ]]; then
    # Package start
    FINAL_START_COMMAND=${PACKAGE_START_OVERRIDE:-${PACKAGE_START_COMMAND}}

    # Create the service directory
    mkdir -p /etc/services.d/${SERVICE_DIR_SAFE}
    printf "#!/bin/bash

    # If execution order is set
    if [[ ! -z \${RUN_IN_BAND} ]]; then
      RUN_IN_BAND=($(echo "${RUN_IN_BAND}" | sed "s/:/ /g"))
      while [[ -f /.lock && -z \${RUN_IN_BAND_DAVAI} ]]; do
        source /.lock
        if [[ \"\${RUN_IN_BAND[\${RUN_IN_BAND_ITEM}]}\" == \"${SERVICE_PATH}\" ]]; then
          if [[ \${#RUN_IN_BAND[@]} -eq \$((\${RUN_IN_BAND_ITEM} + 1)) ]]; then
            rm /.lock
            echo '${SEPERATOR}\n[supervisor] Removing lock file, no more in queue.\n${SEPERATOR}'
          else
            echo \"RUN_IN_BAND_ITEM=\$((\${RUN_IN_BAND_ITEM} + 1))\" >/.lock
            RUN_IN_BAND_DAVAI=1
          fi
        else
          echo -e '${SEPERATOR}\n[wait] ${SERVICE_PATH}\n${SEPERATOR}'
          s6-sleep ${RUN_IN_BAND_WAIT:-10}
        fi
      done
    fi

    # Change directory to package
    cd /data/app/${SERVICE_PATH}

    # Get directory env variables if exists
    if [[ -d .env ]]; then
      source .env
    fi

    # For more distinction
    echo -e '${SEPERATOR}\n[start] ${SERVICE_PATH}\n${SEPERATOR}'

    # Package start command
    DEBUG_PORT=${DEBUG_PORT} yarn ${FINAL_START_COMMAND}

    # For run in band on crash
    if [[ -f /.lock ]]; then
      echo \"RUN_IN_BAND_ITEM=\$((\${RUN_IN_BAND_ITEM} - 1))\" >/.lock
    fi

    # For more distinction
    echo -e '${SEPERATOR}\n[crash] ${SERVICE_PATH}\n${SEPERATOR}'

    s6-sleep 5
    " >/etc/services.d/${SERVICE_DIR_SAFE}/run

    # Punch debug port
    DEBUG_PORT=$((${DEBUG_PORT} + 1))
    echo "DEBUG_PORT=${DEBUG_PORT}" >>/.env

    chmod +x /etc/services.d/${SERVICE_DIR_SAFE}/run

    echo "[add] ${SERVICE_PATH}@/etc/services.d/${SERVICE_DIR_SAFE}."
  else
    echo "[skipping] [off] ${SERVICE_PATH}."
  fi
done
echo "${SEPERATOR}"
