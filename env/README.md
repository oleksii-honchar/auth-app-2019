# DF2 Env Component config

<!-- toc -->

- [Purpose](#purpose)
- [Description](#description)
	* [Relation description](#relation-description)
- [Local launch](#local-launch)
	* [Env variables](#env-variables)
	* [Hosts](#hosts)
	* [Run script](#run-script)
- [Dev server setup](#dev-server-setup)
	* [Virtual machine setup](#virtual-machine-setup)
gitlab-runner)
	* [SSH access](#ssh-access)
		+ [server ssh keys setup](#server-ssh-keys-setup)
- [Pipelines](#pipelines) 
- [Setup docker compose config to start your project components](#setup-docker-compose-config-to-start-your-project-components)

<!-- tocstop -->

# Purpose

This repo reflecting dev/qa/stage/prod env server configuration. It's purpose to update and maintain env configuration without connecting to it. It allow you to:

- setup gitlab project jobs for gitlab CI pipeline
- setup docker compose config to start your project components(df2 web-app/service/db) in all envs
- check/try default df2/ci-pipeline jobs

In general your project group-should contain this repo `<PROJECT_NAME>-env`, e.g. `skillum-env`. And setup of projects should be started from this repo.

# Description

![](https://gitlab.ciklum.net/st/delivery-framework/raw/master/lvl2/components/assets/df2-cmp-env.jpg)

Using `gitlab-ci` approach we copy all pipeline and config rules/files from repo to *-env server on `deploy-and-restart-<env>` manual job trigger. SSL certificates stored locally for test purpose and git ignored for security reasons. 

## Relation description

**(1)** Nginx config files for `web-app` & `service` applied when docker-compose runned on *-env server.

**(2)** Necessary env variables stored in gitlab group config - when they used by all repos. Also repo related only vars stored in repo ci config. All of them provided by gitlab-ci to running context of current job as environment variables. So every docker container can be launched with proper config.

**(3)** Manually triggered job make all containers down and then up. This job usually applies any env vars changes or nginx config. Such job created for every env supported by project.

**(4)** When launched locally docker-compose use `project.env` file to get all env vars.

**(5)** Launch scripts from `./devops/..` folder used to launch env locally.

**(6)** Launch scripts from `./devops/..` folder used to serve all operations for any env.

# Local launch

To test env config you can launch it locally using `local` config.

## Env variables

To launch env you need to provide all necessary env variables. For security reason all of them should be stored in gitlab `Settings -> CI/CD -> Variables`.

For local use you can store these creds in `<repo-folder>/project.env` file. **Please git ignore this file**!	

Example of `project.env` file:

```
export REGISTRY_USER=...
export REGISTRY_PWD=...

export WEB_APP_DEV_SERVER_URL=...
export WEB_APP_QA_SERVER_URL=...
export SERVICE_DEV_SERVER_URL=...
export SERVICE_QA_SERVER_URL=...
```

## Hosts

To unified accesst o rpoject resources please add following code to your `/etc/hosts` file:

```
127.0.0.1 svc-loc.PROJECT_NAME.pp.ciklum.com
127.0.0.1 loc.PROJECT_NAME.pp.ciklum.com
```

## Run script

To launch locally env please do following:

- `./devops/scripts/up.prod.loc.sh` script and try `loc.*` routes

# Environment server setup
Dev server used for auto-deploy on every master commit to check if you code is working. This virtual machine should include gitlab-runner. QA and other vms shouldn't has gitlab-runner

## ITD default requests

<details>
<summary>Create named access to registry.ciklum.com.</summary>

<pre>
OBJECTIVES:

- please create registry.ciklum.net new user with r/w access for PROJECT_NAME jira project
	user name: PROJECT_NAME
	pwd example: vzijB7TXHpbHrQRPiehUvUmL
- add this user to gitlab and generate pricate access token called "gitlab-ci-triggers"
- provide creds & private access token to project team

ACCEPTANCE CRITERIA:

- login via creds successful
- gitlab private access token provided and it is valid
- new user can be added in gitlab
</pre>

</details>


<details>
<summary>Create virtual machine + gitlab-runner.</summary>

<pre>
OBJECTIVES:

- setup server(1) to use it as gitlab-runner & env server 
	- ubuntu 18.04 /~2cpu/8Gb Ram/HDD|SSD >=600Mb/s >=20Gb
	- latest docker + docker-compose without sudo
	- add gitlab-runner to sudoers
		$ sudo echo 'gitlab-runner ALL=(ALL:ALL) ALL' /etc/sudoers
	- install jq
		$ sudo apt-get install jq
- setup domain name for server:
	- PROJECT_NAME.pp.ciklum.com
		- any sub domains should be resolved on this domain 
		- *.PROJECT_NAME.pp.ciklum.com -> PROJECT_NAME.pp.ciklum.com
- setup gitlab runner on this current virtual machine
	- it should be shell runner
	- it should be called "PROJECT_NAME-shell"
	- it should be configured using this toml config `/etc/gitlab-runner/config.toml`:
	"
	concurrent = 10
	check_interval = 5

	[[runners]]
	  name = "PROJECT_NAME-shell"
	  url = "https://gitlab.ciklum.net"
	  token = "<actual-token>"
	  executor = "shell"
	  [runners.cache]
	"
	- setup gitlab-runner user to access PROJECT_NAME user and have root acess
- turn on this runner via gitlab admin panel
- set this runner as "group runner" in PROJECT_NAME group CI/CD settings
	- https://gitlab.ciklum.net/PROJECT_NAME
	- use this runner n every projects repos via "Settings > CI/CD > Runners"
- setup gitlab project groups "Jira Integration" to use "gitlab" user to connect to jira. Add "gitlab" user to Jira project
- CI/CD cfg should use `gitlab-runner` deploy user. Same as runner server. SSH keys should be connected from runner server to env server under the same user - `gitlab-runner`.

		
ACCEPTANCE CRITERIA:

- server is available via urls and ping is ok
- access provided with complex pwd
- ssh can be used
- runner is on in gitlab
</pre>

</details>


<details>
<summary>Create production virtual machine.</summary>

<pre>

OBJECTIVES:
	- setup vm(1 pcs) to use it as production env server
		- ubuntu 18.04 /~2cpu/8Gb Ram/HDD|SSD >=600Mb/s >=20Gb
		- docker + docker-compose without sudo 
		- create & add "gitlab-runner" user to sudoers
		- $ sudo apt-get install jq
		- setup NO PASSWORD mode for gitlab-runner user
	- bind domain name for vm -> skillum.ciklum.com
	- setup ssh access from gitlab-runner@172.28.28.77 to new vm
	- open domain skillum.ciklum.com:443 to the world
	- bind listed sub domains to new vm ip:443 :
		- svc-recruitment.skillum.ciklum.com
		- svc-sfia.skillum.ciklum.com
		- svc-im.skillum.ciklum.com
		- svc-auth.skillum.ciklum.com
		- svc-skills.skillum.ciklum.com
		- wa-skills.skillum.ciklum.com
		- wa-portal.skillum.ciklum.com
		- wa-shared.skillum.ciklum.com

ACCEPTANCE CRITERIA:
	- vm is available via urls and ping is ok
	- access provided with complex pwd
	- ssh can be used

</pre>
</details>

## SSH access

* follow general instruction [here](https://help.github.com/articles/checking-for-existing-ssh-keys/) to setup SSH keys on your local machine

### server ssh keys setup
```bash
mkdir ~/.ssh
chmod 700 ~/.ssh
ssh-keygen -t rsa
touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
# add your id_rsa.pub to ~/.ssh/authorized_keys
```

# Pipelines
Currently 3 stages of pipelines available:

- deploy-env - copy env repo sources to target machine and restart it
- monitor-env - run docker logs & stats command on target machine
- cleanup-env - remove images, container & volumes & restart machine

Every stage has environment dedicated jobs.
Please use this jobs only when env machine is stuck.

# Setup docker compose config to start your project components

Please check sources for detailed nginx and docker-compose config. They are self-explainable.

