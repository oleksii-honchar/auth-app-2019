#!/usr/bin/env bash
envFile="../configs/local.env"

env-cmd -f $envFile ./scripts/kill-node-zombies.sh
env-cmd -f $envFile ../devops/local/scripts/check-env-vars.sh
env-cmd -f $envFile nodemon
