#!/bin/bash

echo "Register all packages globally for development."
PACKAGES=packages/*

if [ -z "$1" ]; then
  echo "Give out a command: link | unlink"
fi

for PACKAGE in $PACKAGES; do
  echo "Package: $PACKAGE"

  if [ "$1" == "link" ]; then
    (cd $PACKAGE && yarn link)
  elif [ "$1" == "unlink" ]; then
    (cd $PACKAGE && yarn unlink)
  fi
done
