#!/usr/bin/env bash

BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

currDir=${PWD}

if [ -f 'project.env' ]; then
    printf "Gonna load root project.env file ";
    source 'project.env';

    if [ $? -eq 0 ]; then
        printf "${GREEN}[Ok]${NC}\n";
        printf "$currDir/project.env\n";
    else
        printf "${RED}[Error]${NC}\n";
        exit 1;
    fi
else
    printf "${RED}No project.env file found in: ${NC}$currDir\n"
    printf "Please read docs for details.\n"
    exit 1;
fi
