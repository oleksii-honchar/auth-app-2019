#!/usr/bin/env bash
envFile="$PWD/configs/envs/local.env"
env-cmd -f $envFile "$PWD/devops/local/scripts/check-env-vars.sh"

env-cmd -f $envFile npm run ng:build
