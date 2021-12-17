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

echo "Running against directory: $2"
cd "$2" || exit 127

declare -a PACKAGES=(@webundsoehne-private/nx-nest @webundsoehne/nx-builders @webundsoehne/nx-tools @webundsoehne-private/nx-workspace @webundsoehne/eslint-config @webundsoehne/nestjs-util @webundsoehne/patch-package @webundsoehne/nestjs-graphql-typeorm-dataloader @webundsoehne/ts-utility-types @webundsoehne/deep-merge @webundsoehne/nestjs-keycloak @webundsoehne/nestjs-keycloak-seeder)

for i in "${PACKAGES[@]}"; do
	yarn $1 $i
done
