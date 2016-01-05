#!/bin/bash
set -e

if [ "$1" = "build" ]
  then
    sh build.sh
fi

node index.js
