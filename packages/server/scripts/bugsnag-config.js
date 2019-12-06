const fs = require('fs');

const bugsnagApiKey = '6d235b284e8baf3c8d669a1991844969';

const getAppReleaseData = () => {
  try {
    const versionJson = JSON.parse(
      fs.readFileSync('/src/version.json', 'utf8')
    );
    return versionJson;
  } catch (e) {
    return null;
  }
};

module.exports = { bugsnagApiKey, getAppReleaseData };
