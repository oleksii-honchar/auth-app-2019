#--- BASE ---
FROM tuiteraz/jaba-node:2.4.0 AS release
CMD ["/etc/service/launch.sh"]
RUN mkdir -p /usr/src/svc/dist
WORKDIR /usr/src/svc

RUN mkdir /etc/service
ADD ./devops/docker/launch.sh /etc/service

#--- BUILD ---
FROM tuiteraz/jaba-build:2.4.0 AS build
WORKDIR /tmp
ARG IS_CI_RUNNER

COPY ./configs/envs/deployment.env ./configs/envs/deployment.env

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install

COPY . .
RUN yarn build

#--- FINAL---
FROM release AS final
WORKDIR /usr/src/svc
COPY . .
COPY --from=build /tmp/dist ./dist
