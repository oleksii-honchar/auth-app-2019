#!/usr/bin/env bash
source ./configs/envs/deployment.env
source ./devops/local/scripts/load-env.sh

envFile="./configs/envs/production.loc.env"
export $(grep -v '^#' $envFile | xargs)

docker-compose -f ./configs/docker-compose/production.loc.yml down
docker-compose -f ./configs/docker-compose/production.loc.yml up
