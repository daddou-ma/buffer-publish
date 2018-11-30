const reportBuild = require('bugsnag-build-reporter');
const fs = require('fs');

const bugsnagApiKey = '6d235b284e8baf3c8d669a1991844969';

const getAppReleaseData = () => {
  try {
    const versionJson = JSON.parse(fs.readFileSync('/src/version.json', 'utf8'));
    return versionJson;
  } catch (e) {
    return null;
  }
};

const releaseData = getAppReleaseData();

if (releaseData) {
  reportBuild({
    apiKey: bugsnagApiKey,
    appVersion: releaseData.version,
    sourceControl: {
      provider: 'github',
      repository: 'git+https://github.com/bufferapp/buffer-publish.git',
      revision: releaseData.version,
    },
    builderName: releaseData.author,
  }, { /* opts */ })
    .then(() => console.log('[bugsnag:release] SUCCESS'))
    .catch(err => console.log('[bugsnag:release] FAIL', err.messsage));
}
