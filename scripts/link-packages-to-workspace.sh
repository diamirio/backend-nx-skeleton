#!/bin/bash

if [ -z "$1" ]; then
	echo "First parameter should be link | unlink"
	exit 127
fi

if [ -z "$2" ]; then
	echo "Second parameter should be the pwd of created workspace."
	exit 127
fi

[ ! -d "$2" ] && echo "Directory $2 not found."

PACKAGES=packages/*/package.json

echo "Running against directory: $2"

for PACKAGE in "${PACKAGES[@]}"; do
	PKG_NAME=$(cat $PACKAGE | jq -r .name)
	(cd "$2" && yarn $1 $PKG_NAME)
done
