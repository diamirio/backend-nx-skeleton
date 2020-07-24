#!/bin/bash

if [ -z "$1" ]; then
  echo "First parameter should be the subfolder name."
fi

rm -rf $1

mkdir $1

(cd $1 &&
  brownie workspace create)

(cd $1 && yarn link @webundsoehne/nx-nest @webundsoehne/nx-builders @webundsoehne/nx-tools)
