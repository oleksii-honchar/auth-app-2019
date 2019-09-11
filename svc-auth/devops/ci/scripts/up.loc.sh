#!/usr/bin/env bash
source ./configs/deployment.env
source ./devops/local/scripts/load-env.sh

envFile="./configs/local.env"
export $(grep -v '^#' $envFile | xargs)

docker-compose -f ./devops/docker/docker-compose/local.yml down
docker-compose -f ./devops/docker/docker-compose/local.yml up
