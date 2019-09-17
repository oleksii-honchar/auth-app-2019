#!/usr/bin/env bash
# for prod ENV vars provided from outside
devops/local/scripts/check-env-vars.sh

debugEnvNames=("local" "development" "qa")

if [[ " ${debugEnvNames[@]} " =~ " ${ENV_NAME} " ]]; then
    node --inspect=0.0.0.0:9229 ./dist/bundle-with-map.js
else
    node ./dist/bundle.js
fi
