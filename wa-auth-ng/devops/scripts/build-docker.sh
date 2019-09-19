#!/usr/bin/env bash
BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW=$(tput setaf 3)
NC='\033[0m' # No Color

set -euo pipefail

source ./configs/envs/deployment.env
source ./devops/ci/scripts/get-latest-version.sh

start=$SECONDS

if [[ -n "${IS_CI_RUNNER-}" ]] ; then
    # build by gitlab-runner
    ./devops/local/scripts/check-env-vars.sh
    source ./devops/docker/scripts/login-to-registry.sh

    docker build -f "./devops/docker/Dockerfile" \
        --build-arg IS_CI_RUNNER \
        --build-arg LINT_SVC \
        --force-rm=true \
        -t="$IMAGE_NAME:$VERSION" .
else
    # local build
    source ./devops/local/scripts/load-env.sh
    ./devops/local/scripts/check-env-vars.sh

    docker build -f "./devops/docker/Dockerfile" \
        --build-arg LINT_SVC \
        --force-rm=true \
        -t="$IMAGE_NAME:$VERSION" \
        -t="$IMAGE_NAME:latest" .
fi

duration=$(( SECONDS - start ))

./devops/docker/scripts/cleanup-dungling.sh

printf "${LBLUE}Build time:${NC} ${duration}s \n";
