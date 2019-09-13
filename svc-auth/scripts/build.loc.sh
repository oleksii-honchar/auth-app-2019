#!/usr/bin/env bash
baseDir=${PWD}
envFile="$baseDir/configs/envs/local.env"
env-cmd -f $envFile webpack --config ./configs/webpack.config.js --mode development --progress
