#!/bin/bash
set -e
node build-jsx.js "./node_modules/.bin/babel" "./assets/app"
