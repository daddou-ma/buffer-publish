/* eslint no-console: "off" */

const fs = require('fs');
const { join, extname } = require('path');
const express = require('express');
const https = require('https');
const cors = require('cors');
const PublishAPI = require('../publishAPI');

const basePath = join(__dirname, '..');
const paths = {
  standaloneEnv: join(basePath, 'standalone', 'standalone.env'),
  tempEnv: '/tmp/buffer-publish-standalone.env',
  certKey: join(
    basePath,
    '../../../reverseproxy/certs/local.buffer.com-wildcard.key'
  ),
  certCrt: join(
    basePath,
    '../../../reverseproxy/certs/local.buffer.com-wildcard.crt'
  ),
  certKeyGHActions: join(
    basePath,
    'standalone',
    'local.buffer.com-wildcard.key'
  ),
  certCrtGHActions: join(
    basePath,
    'standalone',
    'local.buffer.com-wildcard.crt'
  ),
  standaloneSession: join(basePath, 'standalone', 'standalone-session.json'),
  webpackAssets: join(basePath, '..', '..', 'build'),
};

function getBufferDevConfig() {
  try {
    const YAML = require('yaml'); // eslint-disable-line global-require
    return YAML.parse(
      fs.readFileSync(
        join(basePath, '../../../buffer-dev-config/config.yaml'),
        'utf8'
      )
    );
  } catch (e) {
    console.log(
      'No buffer-dev-config directory found, assuming CI environment.'
    );
    return null;
  }
}

/**
 * Returns config that is passed to `https.createServer`
 * This ensures that our HTTPS server can accept connections at:
 *   https://publish.buffer.com
 *
 * Checks for the certificates stored in buffer-dev-config first,
 * and if that fails (i.e., in CI/GitHub Action where that folder
 * won't exist) it looks for files of the same name in the server
 * folder. (Check the GitHub action workflow file:
 *  .github/actions/cypress.yml to see how we put those files there
 * at build time.)
 */
function getServerHttpsConfig() {
  try {
    return {
      key: fs.readFileSync(paths.certKey),
      cert: fs.readFileSync(paths.certCrt),
    };
  } catch (e) {
    return {
      key: fs.readFileSync(paths.certKeyGHActions),
      cert: fs.readFileSync(paths.certCrtGHActions),
    };
  }
}

/**
 * Read ENV vars from the `buffer-dev` config and combine
 * them with user defined env vars.
 */
function loadEnv() {
  const dotenv = require('dotenv'); // eslint-disable-line global-require

  // This only works locally and grabs any env vars we don't have
  // from the buffer-dev-config YAML file
  const config = getBufferDevConfig();
  if (config) {
    const envVars = config.services.publish.composeConfig.environment.join(
      '\n'
    );

    // Read any overrides
    const envOverrides = fs.readFileSync(paths.standaloneEnv, 'utf8');

    // Write the combined env vars
    fs.writeFileSync(paths.tempEnv, `${envVars}\n${envOverrides}`);

    // Load env
    dotenv.config({ path: paths.tempEnv });
  } else {
    // Just load the overrides, we're probably running in CI / GitHub actions
    dotenv.config({ path: paths.standaloneEnv });
  }
}

/**
 * Create the publish server. We use `https` since it needs to directly accept HTTPS connections.
 * (There's no reverseproxy like when it's running with Docker.)
 *
 * @param {Express} app
 */
function createServer(app) {
  return https.createServer(getServerHttpsConfig(), app);
}

/**
 * Get the standalone session data from the local JSON file
 */
function getStandaloneSessionData() {
  try {
    return JSON.parse(fs.readFileSync(paths.standaloneSession));
  } catch (error) {
    console.log(
      `
-------------------------------------------------------------------------------------------------------
🚧  Please ensure you have created a \`standalone-session.json\` file in the packages/server/standalone directory.
   For more details see the "Standalone Mode" section of the README.md.
-------------------------------------------------------------------------------------------------------

`,
      error.message
    );
  }
}

/**
 * Middleware that adds our static user session data to the server.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
function setStandaloneSessionMiddleware(req, res, next) {
  const standaloneSessionData = getStandaloneSessionData();
  if (!standaloneSessionData) {
    process.exit();
  }
  req.session = standaloneSessionData;
  return next();
}

function serveStaticAssets(app) {
  app.use(cors());
  app.use(function(req, res, next) {
    const whitelist = [
      /\/rpc\//,
      /\/health-check/,
      /\/maintenance/,
      /pusher\/auth/,
    ];
    const isStaticAsset = extname(req.path).length > 0;
    const isApiRequest = whitelist.some(r => req.path.match(r));
    if (isApiRequest || isStaticAsset) {
      return next();
    }
    // should force return `index.html` for any other request
    req.url = '/index.html';
    return next();
  });
  app.use('/', express.static(paths.webpackAssets));
}

async function onBoot({ usePrecompiledBundles }) {
  const dim = '\x1b[2m';
  const reset = '\x1b[0m';
  const u = '\x1b[4m';
  const blue = '\x1b[33m';

  const precompiledBundlesMessage = `
📦  Serving precompiled assets`;

  // Ensure we have a valid session
  const session = getStandaloneSessionData();
  if (session) {
    const user = await PublishAPI.get({
      uri: `1/user.json`,
      session,
    });

    console.log(`
🚀  Publish is now running in Standalone Mode → ${u}https://publish.local.buffer.com${reset}${dim}
    • User ${blue}${user.email}${reset}${dim} (https://buffer.com/admin/${user._id})${reset}`);
    if (!usePrecompiledBundles) {
      console.log(
        `    ${dim}• Don't forget: ${blue}yarn run watch${reset}${dim} in another terminal.${reset}`
      );
    }
    if (usePrecompiledBundles) {
      console.log(precompiledBundlesMessage);
    }
  }
}

module.exports = {
  loadEnv,
  createServer,
  setStandaloneSessionMiddleware,
  serveStaticAssets,
  onBoot,
};
