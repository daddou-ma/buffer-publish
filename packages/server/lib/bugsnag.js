const Bugsnag = require('@bugsnag/js');
const fs = require('fs');
const { join } = require('path');

const { BUGSNAG_KEY, HOSTNAME, RELEASE_STAGE } = process.env;

const APP_TYPE_SERVER = 'express-server';

/**
 * Get the current `releaseStage` for Bugsnag
 * https://docs.bugsnag.com/platforms/javascript/configuration-options/#releasestage
 */
const getReleaseStage = () => RELEASE_STAGE || 'development';

/**
 * Get the `appVersion` for Bugsnag.
 *
 * https://docs.bugsnag.com/platforms/javascript/configuration-options/#appversion
 */
const getAppVersion = () => {
  try {
    const versionJson = JSON.parse(
      fs.readFileSync(join(__dirname, '..', 'version.json'), 'utf8')
    );
    return versionJson.version;
  } catch (e) {
    return HOSTNAME;
  }
};

/**
 * Return a Bugsnag config for the server.
 *
 * @param {String} appType The type of app (server or front-end)
 */
const getBugsnagConfig = appType => ({
  apiKey: BUGSNAG_KEY,
  releaseStage: getReleaseStage(),
  appVersion: getAppVersion(),
  appType,
});

/**
 * Create a Bugsnag client for our Node/express server
 */
const getBugsnagClient = () => Bugsnag(getBugsnagConfig(APP_TYPE_SERVER));

module.exports = {
  getBugsnagClient,
  getBugsnagConfig,
  getAppVersion,
};
