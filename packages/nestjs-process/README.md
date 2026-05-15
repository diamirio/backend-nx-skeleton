# nestjs-process

## Description

Bunch of general process utils used to set default header and environment variables.

---

<!-- TOC -->
* [nestjs-process](#nestjs-process)
  * [Description](#description)
  * [SetApiInfoHeaderMiddleware](#setapiinfoheadermiddleware)
  * [setEnvironmentVariables](#setenvironmentvariables)
  * [requireNodeEnv](#requirenodeenv)
  * [registerExitListeners](#registerexitlisteners)
* [Links](#links)
<!-- TOC -->

---

## SetApiInfoHeaderMiddleware

NestJs middleware to set

- `X-Api-Name`: read from `process.env?.PACKAGE_NAME`
- `X-Api-Version`: rad from `process.env?.PACKAGE_VERSION`

response header. (To be used with [setEnvironmentVariables](#setenvironmentvariables))

## setEnvironmentVariables

Writes additional env-vars to the process:
- `process.env.PACKAGE_NAME`
- `process.env.PACKAGE_VERSION`

Sets the `process.title` to the Package-Name and -Version from `npm_` env vars or reading from the `package.json`

## requireNodeEnv

Throw error if `process.env.NODE_ENV` is not set

## registerExitListeners

Register `SIGTERM` and `SIGINT` listener

# Links
- [Diamir](https://diamir.io/)
- [nestjs](https://nestjs.com/)
