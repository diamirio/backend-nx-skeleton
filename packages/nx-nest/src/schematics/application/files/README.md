<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>

Web & Söhne is Austrian's leading expert in programming and implementing complex and large web projects.

## Description

This is a boilerplate project used to quickly get a basic API based on [Nest](https://github.com/nestjs/nest) up and running.
It comes with Docker integration, Gitlab continuous integration, linting, a background task and a CLI script.

## Quick Setup with Brownie
Brownie will automatically merge skeleton repositories to the current folder and generate preconfigured "docker-compose.yml" files, depending on the configuration. The configuration will be generated from ".init-docker-compose.yml" file in the skeleton and it will automatically add all the configuration changes and dependencies to the project. This configuration will be a custom tailored one since user is prompted for the variables in configuration.

Read more about brownie the CLI helper [@webundsoehne/brownie](https://gitlab.tailored-apps.com/bdsm/brownie).

```bash
# install brownie globally
yarn global add @webundsoehne/brownie

# run brownie, follow the prompts
$ brownie

# edit environment variables for the container to your liking, all values have default so it is not required
$ nano .env | vim .env

# start the docker compose stack
$ docker-compose up -d
```

## Getting started

To start a new project create an empty gitlab repository and clone it.
Afterwards add this repository as a remote and merge it into your project.

```bash
# clone your new project
$ git clone git@gitlab.tailored-apps.com:backend/project-repo.git
$ cd project-repo

# add skeleton remote
$ git remote add skeleton git@gitlab.tailored-apps.com:backend/nestjs-api-skeleton.git
$ git fetch skeleton

# merge skeleton into your repo
$ git merge skeleton/master

# initial push
$ git push -u origin master
```

## Running the Application Locally

```bash
# install all dependencies
$ yarn

# start your database docker container, if you need one
$ yarn db:start

# run development server
$ yarn dev:start

# run development background task
$ NODE_SERVICE=bgtask yarn dev:start

# run development CLI command
$ yarn dev:command $command
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Documentation

Swagger API documentation is solved of the [@nestjs/swagger](https://www.npmjs.com/package/@nestjs/swagger) module.
While the application is running, you will find the documentation on the `/internal/docs` path.

## Stay in touch

* Author: [Backend Team](mailto:backend@webundsoehne.com)
* Website: [Web & Söhne](https://webundsoehne.com)
