const reportBuild = require('bugsnag-build-reporter');

const { bugsnagApiKey, getAppReleaseData } = require('./bugsnag-config');

const releaseData = getAppReleaseData();

if (releaseData) {
  reportBuild({
    apiKey: bugsnagApiKey,
    appVersion: releaseData.version,
    sourceControl: {
      provider: 'github',
      repository: 'bufferapp/buffer-publish',
      revision: releaseData.version,
    },
    builderName: releaseData.author,
  }, { /* opts */ })
    .then(() => console.log('[bugsnag:release] SUCCESS'))
    .catch(err => console.log('[bugsnag:release] FAIL', err.messsage));
}
