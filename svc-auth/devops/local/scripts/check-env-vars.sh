#!/usr/bin/env bash

BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW=$(tput setaf 3)
NC='\033[0m' # No Color

function checkVar () {
    printf "$1 ";

    eval value='$'$1

    if [ -z "$value" ]
    then
        printf "${RED}[NOT FOUND]${NC}\n";
        return 1
    else
        printf "${GREEN}[OK]${NC}\n";
        return 0
    fi
}

printf "${LBLUE}Gonna check env vars...${NC}\n";

checkVar DOCKER_REGISTRY_USER
checkVar DOCKER_REGISTRY_PWD
checkVar DOCKER_REGISTRY_HOST

checkVar ENV_NAME
checkVar LOG_LEVEL
checkVar NODE_ENV

checkVar SVC_PORT
checkVar SVC_DEBUG_PORT
checkVar SVC_MOUNT_POINT
checkVar MONGO_DB
checkVar WA_BASE_URL
checkVar API_SECRET_KEY
checkVar JWT_TTL_SECONDS
checkVar ACCESS_TOKEN_TTL_SECONDS

printf "${LBLUE}Check completed${NC}\n";
