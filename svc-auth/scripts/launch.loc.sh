#!/usr/bin/env bash
envFile="configs/envs/local.env"

source ./devops/local/scripts/load-env.sh

env-cmd -f $envFile ./scripts/kill-node-zombies.sh
env-cmd -f $envFile devops/local/scripts/check-env-vars.sh
env-cmd -f $envFile nodemon --config ./configs/nodemon.json
