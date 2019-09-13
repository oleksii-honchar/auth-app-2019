#!/usr/bin/env bash
baseDir=${PWD}
envFile="$baseDir/configs/envs/production.loc.env"
env-cmd -f $envFile webpack --config ./configs/webpack.config.js --mode production
