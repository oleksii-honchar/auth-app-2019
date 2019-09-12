#!/usr/bin/env bash
envFile="configs/envs/production.loc.env"

source ./devops/local/scripts/load-env.sh

env-cmd -f $envFile ./scripts/kill-node-zombies.sh
env-cmd -f $envFile devops/local/scripts/check-env-vars.sh
env-cmd -f $envFile node dist/bundle.js
