const reportBuild = require('bugsnag-build-reporter');

const { bugsnagApiKey, getAppReleaseData } = require('./bugsnag-config');

const releaseData = getAppReleaseData();

const isValidRelease = (rData = {}) => {
  if (rData.version && rData.version !== '') {
    return true;
  }
  return false;
};

if (releaseData) {
  if (isValidRelease(releaseData)) {
    reportBuild(
      {
        apiKey: bugsnagApiKey,
        appVersion: releaseData.version,
        sourceControl: {
          provider: 'github',
          repository: 'bufferapp/buffer-publish',
          revision: releaseData.version,
        },
        builderName: releaseData.author,
      },
      {}
    )
      .then(() => console.log('[bugsnag:release] SUCCESS'))
      .catch(err => {
        console.log('[bugsnag:release] FAIL', err.messsage);
        process.exit(1);
      });
  } else {
    console.log(
      '[bugsnag:release] FAIL',
      'Invalid or empty release data in `version.json`'
    );
    process.exit(1);
  }
}
