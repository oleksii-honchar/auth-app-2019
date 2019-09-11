#!/usr/bin/env bash

freeSpacePerc="$(df -Ph . | awk 'NR==2 {print $5}' | awk 'match($0, /[0-9]+/) { print substr( $0, RSTART, RLENGTH ) }')"

echo $freeSpacePerc
if [ $freeSpacePerc -ge 90 ]; then
    docker system prune -f
fi
