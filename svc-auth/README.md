# svc-auth

<!-- toc -->

- [Getting started](#getting-started)
    * [Setup dependencies](#setup-dependencies)
    * [Development dependencies](#development-dependencies)
        + [Docker](#docker)
    * [Localhost domains](#localhost-domains)
- [Launch](#launch)
- [Development](#development)
    * [Watch & build](#watch--build)
    * [CI/CD](#cicd)
    * [In depth](#in-depth)
        + [Scripts](#scripts)
    
<!-- tocstop -->

  
# Getting started

## Setup dependencies

There are list of tools should be installed in order to launch app:

- yarn
- node@12
- docker & docker-compose

```bash
# nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm install 12
nvm alias default 12

#yarn 
curl -o- -L https://yarnpkg.com/install.sh | bash

```

## Development dependencies
make sure you have this tools locally to develop - because they included in ci/cd toolchain:

- jq - cli json tool

```bash
brew install jq
```

### Docker

To install docker please follow the official [guide](https://hub.docker.com/?overlay=onboarding). And after you can install docker-compose:

```bash
sudo apt-get --asume-yes=true install curl && \
sudo mkdir -p /tmp && cd /tmp && \
curl -sL "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" > ./docker-compose && \
sudo mv ./docker-compose /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose

# no sudo for docker
sudo groupadd docker
sudo gpasswd -a $USER docker
sudo service docker restart
```

Please reopen your terminal in order to access installed cli tools.

## Localhost domains

Please add this host to the local `/etc/hosts`. This will allow to work properly nginx & CORS

```bash
127.0.0.1 wa-loc.dev.me
127.0.0.1 svc-auth-loc.dev.me
```

There is special `CORS_WHITELIST` env var used in `./configs/envs` to define domains whitelist.

# Launch

In order to launch app you need to have `project.env` in `svc-auth` folder. You can use example content below:

```bash
DOCKER_REGISTRY_USER=i-am
DOCKER_REGISTRY_PWD=my-pwd
DOCKER_REGISTRY_HOST=docker.io

ACCESS_TOKEN_TTL_SECONDS=900
API_SECRET_KEY=12312312312312312312
API_RATE_LIMIT_WINDOW_MINUTES=10
API_RATE_LIMIT_MAX_REQUESTS=10
JWT_TTL_SECONDS=900
```

**FYI** In order to push images you need to use real docker.io credentials.

It's time to install dependencies and start app:

```bash
yarn install
yarn docker:build
yarn docker:up:prod:loc
```

Default urls: 

- [http://svc-auth-loc.dev.me:9000/api/version](http://svc-auth-loc.dev.me:9000/api/version)
- [http://svc-auth-loc.dev.me:9000/docs](http://svc-auth-loc.dev.me:9000/docs)
- [http://svc-auth-loc.dev.me:9000/swagger-editor](http://svc-auth-loc.dev.me:9000/swagger-editor)

# Development



## Watch & build

To run your code via docker with watch & debug option you can use script:

```bash
yarn start
```

It will up mongo & service container and start nodemon inside. You need to have docker build before or it will be downloaded (@latest). In general you do't need to rebuild your docker. It uses your local source files.

## CI/CD

There is 5 basic environment expected: 

- LOCAL - source-maps, debugger, and docs available
- DEVELOPMENT - source-maps, debugger, and docs available
- QA - source-maps, debugger, and docs available
- STAGE - **NO** `/docs` & `/swagger-editor` routes starting from this env.
- PRODUCTION - error log level

Environment variable `ENV_NAME` used to specify for executeds apps in which env it runs.

Check `./configs/envs` for details.

## In depth


### Scripts
There is a set of scripts defined in package.json to help with day-to-day jobs:

- `start`: launch nodemon watch with ts & debug mode
- `build`: build prod via webpack
- `build:analyze`: prod bundle analyze
- `build:loc`: build local via webpack
- `build:loc:analyze`: local bundle analyze
- `cm`: cli commitizen commit
- `check:all`: check ts types & eslint
- `docker:build`: build docker images
- `docker:push`: push current & latest images to docker registry
- `docker:up:loc`: ups docker compose in loc mode 
- `docker:up:prod:loc` : ups docker compose in prod:loc mode
- `launch` -> `launch:prod`: prod launch
- `launch:loc`: local launch with watchers 
- `launch:prod:loc`: prod:loc mode launch from `./dist` folder for bundled app 
- `lint` & `lint:fix`: eslint & fix
- `test:*`: all test stuff
- `types:*`: type checking stuff


The main difference between `launch:*` & `docker:up:*` scripts are:

- `launch:*` are used to launch node.js app either using nodemon or node.js itself. These scripts can be used locally but mostly used by docker container. You should avoid using them for development.
- `docker:up*` are used for local development only. It will up docerk-compose services in differnet modes to get you closer to prod env. It is recommended to use `yarn start` for local development and `docker:up:prod:loc` for final test before merge.
