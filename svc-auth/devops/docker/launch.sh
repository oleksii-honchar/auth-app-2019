#!/usr/bin/env bash
set -e

cd /usr/src/svc

if [[ "$ENV_NAME" == "local" ]]; then
    yarn start
else
    yarn launch
fi
