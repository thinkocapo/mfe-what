#!/bin/bash
set -e

echo "==> Building all remote MFEs..."
nx run-many --target=build --projects=mfe-header,mfe-one,mfe-two,mfe-three,mfe-four --parallel=5

echo "==> Starting all services (remotes on preview + shell on dev)..."
concurrently \
  "nx run mfe-header:preview" \
  "nx run mfe-one:preview" \
  "nx run mfe-two:preview" \
  "nx run mfe-three:preview" \
  "nx run mfe-four:preview" \
  "sleep 2 && nx run shell:serve" \
  --names "header,one,two,three,four,shell" \
  --prefix-colors "green,blue,yellow,magenta,cyan,white" \
  --kill-others-on-fail
