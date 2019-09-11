#!/usr/bin/env bash
baseDir=${PWD}
echo $baseDir
envFile="$baseDir/../devops/config/production.loc.env"
env-cmd -f $envFile ../devops/local/scripts/check-env-vars.sh
env-cmd -f $envFile webpack --config ./webpack.config.js --mode production
