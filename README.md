<p align="middle"><h1 align="center"> Buffer Publish </h1></p>
<p align="center" style="padding-top: -100px;">
  <a href="https://buffer.com/">
    <img src="https://rawgit.com/bufferapp/buffer-publish/master/logo.png" width="250" alt="Buffer Publish">
  </a>
</p>

[![Build Status](https://travis-ci.org/bufferapp/buffer-publish.svg?branch=master)](https://travis-ci.org/bufferapp/buffer-publish)

Welcome to the Buffer Publish monorepo.
<p>—<br><em>Formerly Project Donut</em>&nbsp;🍩</p>

## Table of contents

- [What is Buffer Publish?](#what-is-buffer-publish)
- [Quick Start](#quick-start)
- [The Publish Server](#the-publish-server)
- [Yarn Workspaces](#yarn-workspaces)
- [Publishing Packages](#publishing-packages)
- [Contributing](#contributing-🚀)
- [Package Scripts](#package-scripts)
- [Standalone Mode](#standalone-mode) ⭐️ **NEW**
- [External Packages](#external-packages)

## What is Buffer Publish?

<img src="https://rawgit.com/bufferapp/buffer-publish/master/screenshot.png">

Buffer Publish is [Buffer](https://buffer.com)'s new dashboard with a focus on one thing; **managing and publishing content on your social accounts.** It's a redesign and refresh of the current Buffer dashboard, both in appearance and front-end architecture.

Buffer Publish is being actively developed right now! This code is open source for any and all to see and learn from — see our [copyright](#copyright) below for more details.

If you have any questions feel free to [create an issue](https://github.com/bufferapp/buffer-publish/issues/new) or Tweet us [@bufferdevs](https://twitter.com/bufferdevs). We'd love to chat!

⚠️  **Important Note**: While you can pull this code down freely, it won't work correctly without some key components (including our API) which are not open source.

## Quick Start

To get started on local development and testing:

1. **Get your `buffer-dev` environment setup**
  → https://github.com/bufferapp/buffer-dev

2. **Install the latest version of `yarn`**
  → [Installing Yarn](https://yarnpkg.com/en/docs/install)

3. **Make sure you have node with version <= 12**
    ```
    $ node -v
    ```

4. **Install Dependencies**
    ```bash
    $ cd ~/buffer-dev/buffer-publish  # Or wherever yours is located
    $ yarn
   ```

5. **Start up the publish docker containers**
    ```bash
    $ cd ../buffer-dev
    $ ./dev up publish
   ```
   With this command, docker-compose starts up all the necessary containers for Publish.

6. **Start bundling the frontend with webpack**
    ```bash
    # in buffer-publish/
    $ yarn run watch
   ```
     While you're waiting for the bundle to finish, head on over to https://local.buffer.com to login. (We're not quite ready to view Publish yet.)

7. You should now be able to visit https://publish.local.buffer.com — party time! 🎉 🙌

### Troubleshooting Dev Environment Issues

If after running the `./dev up` command you get an error specifying Publish was not able to start, try running the `doctor` tool:

```bash
# in ~/buffer-dev
$ ./dev doctor
```

That will generate a doctor.txt file in your `~/buffer-dev` directory, you can send the generated file in **#eng-local-dev** Slack channel to ask for help!

## The Publish Server

When you run the `./dev up` command from the [quick start](#quick-start) it spins up a number of containers on which Publish depends. It also spins up the `publish` container itself, which is [an Express server](/packages/server/index.js) with two purposes:

1. **Serve [`index.html`](/packages/server/index.html) for all requests to https://publish.local.buffer.com**
3. **Provide an `/rpc/**` endpoint/proxy** for making API calls in the front-end

## Yarn Workspaces

Buffer Publish is a _monorepo_. That means it's composed of several separate parts, or _packages._ (You can take a look at these packages in the [`/packages` directory](/packages)) These are essentially the same as packages on npm. We use `yarn workspaces` to make this magic possible. 🎩.  (_And if you're confused by this at all, skimming their [README](https://yarnpkg.com/en/docs/workspaces) files should help!_)

## ~~Publishing Packages~~

No need to publish local packages anymore for deployments 🎉

## Contributing 🚀
For usage instructions and how to add, update, and work with the components, see our [CONTRIBUTING.md](/CONTRIBUTING.md) doc!

## Package Scripts

We have a few helpful commands defined in this project's `package.json`.

| Command | Description |
|--|--|
| `yarn`  | This goes through all packages, installs dependencies and links local packages together! ✨ |
| `yarn run clean`  | Deletes all `node_modules` from all packages. Use this first if you see any odd dependency errors and then follow with `yarn`. |
| `yarn run test`  | Runs `yarn test` on all packages. |
| `yarn run test-update`  | Runs `yarn run test-update` on all packages to update all snapshot tests. |
| 🆕 `yarn run test-package <path-to-package>`  | Start watching tests in coverage for a specific package directory. [Learn more](https://github.com/bufferapp/buffer-publish/pull/624). |
`yarn test:debug <path to test>` | Runs `"node --inspect node_modules/.bin/jest --runInBand"` with the test you specify.
| `yarn run start`  | Starts up the Publish Express server, [as explained above](#the-publish-server), and is run automatically when you start Publish with `./dev up`. (So in most cases you won't be running this command.) |

## Standalone Mode

In standalone mode Publish runs directly on your machine, no `buffer-dev` or Docker containers required. 
User authentication is bypassed (see below) and all requests are sent directly to the production dev API (`dev-api`).

Some caveats:

  * `buffer-dev` services cannot be running at the same time.
  * Only Publish is started; so for example the only way to connect a new social account is by going to production and doing it.
  * In the same vein; you can't visit Classic or other services / APIs (i.e., Account, Login, Analyze, etc.)
  * This depends on a correct Node setup locally, but since we already bundle outside the container, this shouldn't be a problem.

### Why would I use this?

Right now the primary purpose is to support easy end-to-end testing in CI (Continuous Integration), like GitHub Actions. When we can run the entire Publish app without other development / local dependencies then it makes simple end-to-end testing really simple.

That said, because of how quick this is to boot up it's also a great way to quickly fix or work on a Publish-only task, or as a way to debug an issue occuring with production services while keeping the front-end code local for a fast feedback loop while making changes.

### Configuration

#### Step 1: Create a session JSON file

When running in standalone mode Publish requires a `standalone-session.json` file to be present in the `packages/server/standalone` 
directory. This file is a static representation of your logged in user/session.

To generate this file for your own user (or for another user) visit the Buffer Admin and look for the _"Download Standalone Session JSON"_ link.

### Step 2: Start Standalone Mode

Once you have created your configuration file, you're ready to start standalone mode. 

First ensure you have stopped `buffer-dev`, if it's running.

```bash
# in buffer-dev
./dev stop
```

Now, start the standalone Publish server.

```bash
# in buffer-publish
yarn run start:standalone
```

You should also ensure that you are watching/bundling the React app, as usual:

```bash
# in buffer-publish
yarn run watch
```

Now visit https://publish.local.buffer.com – Publish should load. ✨

Don't forget this is the production database you're interacting with now – but the cool part is you can still edit and work on the React app same as you do normally! 💪

#### Note on Environment Variables

The standalone server will automatically pull the environment vars from the [buffer-dev publish config](https://github.com/bufferapp/buffer-dev-config/blob/655827f8f9098a212e25bd91dded209aa9d6ae4c/config.yaml#L413). You can override any of those or add new ones by modifying the [`standalone.env` file in `packages/server/standalone`](/packages/server/standalone/standalone.env). 
Right now the `standalone.env` is used to point to the Publish `dev-api`.

## External Packages

These are packages that have been moved outside of the Publish application.

### Notifications

https://github.com/bufferapp/buffer-js-notifications


Notification display system

### Publish Parsers

https://github.com/bufferapp/buffer-js-publish-parsers

Data parsing functions for the Publish application

### Unauthorized Redirect

https://github.com/bufferapp/buffer-js-unauthorized-redirect

Redux middleware to redirect 401 - unauthorized requests back to `Login`

### Async Data Fetch

https://github.com/bufferapp/buffer-js-async-data-fetch

Redux middleware for making requests and managing request life-cycles

### Environment

https://github.com/bufferapp/buffer-js-environment

Redux middleware for fetching the environment from the backend

## Copyright

© 2018 Buffer Inc.

This project is open source as a way to transparently share our work with the
community for the purpose of creating opportunities for learning. Buffer
retains all rights to the code in this repository and no one may reproduce,
distribute, or create derivative works from this.
