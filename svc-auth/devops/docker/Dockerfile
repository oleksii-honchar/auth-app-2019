#--- BASE ---
FROM tuiteraz/jaba-prod:2.3.0 AS release
CMD ["/etc/service/launch.sh"]
RUN mkdir -p /usr/src/svc/dist
WORKDIR /usr/src/svc

RUN mkdir /etc/service
ADD ./devops/docker/launch.sh /etc/service

#--- BUILD ---
FROM tuiteraz/jaba-build:2.3.0 AS build
WORKDIR /tmp
ARG IS_CI_RUNNER

COPY ./configs/deployment.sh ./configs/deployment.sh

COPY ./package.json ./package.json
RUN yarn install

COPY . .
RUN if [ "$LINT_SVC" = "true" ]; then yarn lint; fi
RUN yarn build

#--- FINAL---
FROM release AS final
WORKDIR /usr/src/svc
COPY . .
RUN yarn install --prod
COPY --from=build /tmp/dist ./dist
