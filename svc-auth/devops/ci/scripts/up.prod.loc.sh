#!/usr/bin/env bash
source ./configs/deployment.env
source ./devops/local/scripts/load-env.sh

envFile="./configs/production.loc.env"
export $(grep -v '^#' $envFile | xargs)

docker-compose -f ./devops/docker/docker-compose/production.loc.yml down
docker-compose -f ./devops/docker/docker-compose/production.loc.yml up
