#!/usr/bin/env bash
set -e

cd /usr/src/svc

if [[ "$NODE_ENV" == "development" ]]; then
    /usr/bin/npm run svc:launch:loc
else
    /usr/bin/npm run svc:launch
fi
