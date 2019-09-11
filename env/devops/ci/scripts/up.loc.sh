#!/usr/bin/env bash
source ./devops/local/scripts/load-env.sh
source ./devops/docker/scripts/login-to-registry.sh

docker-compose -f ./devops/docker/docker-compose/local.yml down
docker-compose -f ./devops/docker/docker-compose/local.yml up --remove-orphans