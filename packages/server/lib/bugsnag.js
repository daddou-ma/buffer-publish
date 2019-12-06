const Bugsnag = require('@bugsnag/js');
const fs = require('fs');
const { join } = require('path');

const { BUGSNAG_KEY, HOSTNAME, RELEASE_STAGE } = process.env;

const APP_TYPE_SERVER = 'express-server';
const APP_TYPE_FRONTEND = 'frontend';

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
 * Return a Bugsnag config for the frontend or server.
 *
 * @param {String} appType The type of app (server or front-end)
 * @param {String} userId  The Buffer user ID
 */
const getBugsnagConfig = (appType, userId) => ({
  apiKey: BUGSNAG_KEY,
  releaseStage: getReleaseStage(),
  appVersion: getAppVersion(),
  appType,
  user: userId
    ? {
        id: userId,
        adminLink: `https://buffer.com/admin/user/${userId}`,
      }
    : null,
});

/**
 * Generate a script to pass Bugsnag config to our React app
 * (see `web/index.jsx` for implementation on the front-end)
 *
 * @param {String} userId  The Buffer user ID
 */
const getBugsnagScript = userId => `
<script type="text/javascript">
  window._bugsnagConfig = ${JSON.stringify(
    getBugsnagConfig(APP_TYPE_FRONTEND, userId)
  )};
</script>
`;

/**
 * Create a Bugsnag client for our Node/express server
 */
const getBugsnagClient = () => Bugsnag(getBugsnagConfig(APP_TYPE_SERVER));

module.exports = {
  getBugsnagClient,
  getBugsnagScript,
  getBugsnagConfig,
  getAppVersion,
};
