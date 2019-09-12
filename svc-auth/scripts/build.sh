#!/usr/bin/env bash
baseDir=${PWD}
echo $baseDir
envFile="$baseDir/configs/envs/production.loc.env"
env-cmd -f $envFile devops/local/scripts/check-env-vars.sh
env-cmd -f $envFile webpack --config ./configs/webpack.config.js --mode production
