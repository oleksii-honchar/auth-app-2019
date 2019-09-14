# svc-auth

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
127.0.0.1 auth-app-loc.dev.me
```

# Launch

In order to launch app you need to have `project.env` in `svc-auth` folder. You can use example content below:

```bash
DOCKER_REGISTRY_USER=i-am
DOCKER_REGISTRY_PWD=my-pwd
DOCKER_REGISTRY_HOST=docker.io

API_SECRET_KEY=any
JWT_TTL_SECONDS=100
ACCESS_TOKEN_TTL_SECONDS=100
```

In order to push images you need to use real docker.io credentials.

It's time to install dependencies and start app:

```bash
yarn install
yarn start
```

# Development

## Scripts

There is a set of scripts defined in package.json to help with day-to-day jobs:

- `start`: launch nodemon watch with ts & debug mode
- `build`: build prod via webpack
- `build:analyze`: prod bundle analyze
- `build:loc`: build local via webpack
- `build:loc:analyze`: local bundle analyze
- `cm`: cli commitizen commit
- `check:all`: check ts types & eslint
- `docker:build`: build docker images
- `docker:up` : ups docker compose in prod:loc mode
- `docker:up:loc`: ups docker compose in loc mode 
- `launch` -> `launch:prod`: prod launch
- `launch:loc`: local launch with watchers 
- `launch:prod:loc`: prod:loc mode launch from `./dist` folder for bundled app 
- `lint` & `lint:fix`: eslint & fix
- `test:*`: all test stuff
- `types:*`: type checking stuff