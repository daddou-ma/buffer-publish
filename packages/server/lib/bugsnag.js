const Bugsnag = require('@bugsnag/js');

const BUGSNAG_KEY = process.env.BUGSNAG_KEY;
const HOSTNAME = process.env.HOSTNAME;

const isProduction = process.env.NODE_ENV === 'production';

/**
 * String is used to detect what kind of server we're on
 * format was pulled from the current setup in k8s.
 */
const PROD_HOSTNAME_PREFIX = 'buffer-publish-master';

const APP_TYPE_SERVER = 'express-server';
const APP_TYPE_FRONTEND = 'frontend';

/**
 * Get the current `releaseStage` for Bugsnag
 * https://docs.bugsnag.com/platforms/javascript/configuration-options/#releasestage
 */
const getReleaseStage = () => {
  if (HOSTNAME && isProduction) {
    if (HOSTNAME.startsWith(PROD_HOSTNAME_PREFIX)) {
      return 'production';
    }
    return 'staging';
  }
  return 'development';
};

/**
 * Get the `appVersion` for Bugsnag.
 * Just returns the HOSTNAME for now.
 *
 * @todo Use the Git commit hash instead?
 *
 * https://docs.bugsnag.com/platforms/javascript/configuration-options/#appversion
 */
const getAppVersion = () => HOSTNAME;

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
  user: userId ? { id: userId } : null,
});

/**
 * Generate a script to pass Bugsnag config to our React app
 * (see `web/index.jsx` for implementation on the front-end)
 *
 * @param {String} userId  The Buffer user ID
 */
const getBugsnagScript = userId => `
<script type="text/javascript">
  window._bugsnagConfig = ${JSON.stringify(getBugsnagConfig(APP_TYPE_FRONTEND, userId))};
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
  APP_TYPE_SERVER,
  APP_TYPE_FRONTEND,
};
