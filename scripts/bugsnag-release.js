const reportBuild = require('bugsnag-build-reporter');
const { getAppVersion } = require('../packages/server/lib/bugsnag');

const BUGSNAG_API_KEY = '6d235b284e8baf3c8d669a1991844969';

reportBuild({ apiKey: BUGSNAG_API_KEY, appVersion: getAppVersion() }, { /* opts */ })
  .then(() => console.log('[bugsnag:release] SUCCESS'))
  .catch(err => console.log('[bugsnag:release] FAIL', err.messsage));
