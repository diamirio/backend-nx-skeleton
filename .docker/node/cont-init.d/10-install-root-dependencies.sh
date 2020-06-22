#!/bin/bash

if [ ! -d 'node_modules' ]; then
  yarn --frozen-lock-file
fi

yarn ${COMMAND_INIT_ENV:-'dev:init-env'} || echo "Init command not found."
