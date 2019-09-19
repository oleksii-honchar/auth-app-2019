#!/usr/bin/env bash
set -e

cd /usr/src/svc

if [[ "$ENV_NAME" == "local" ]]; then
    yarn launch:loc
else
    yarn launch
fi
