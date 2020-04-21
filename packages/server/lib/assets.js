const fs = require('fs');
const { join } = require('path');

const WEBPACK_DEV_SERVER_URI = 'https://local.buffer.com:8080/static';

/**
 * Paths to webpack dev server assets.
 * When running Publish locally with `yarn run watch` locally.
 */
const wdsStaticAssets = {
  'vendor.js': `${WEBPACK_DEV_SERVER_URI}/vendor.js`,
  'runtime.js': `${WEBPACK_DEV_SERVER_URI}/runtime.js`,
  'bundle.js': `${WEBPACK_DEV_SERVER_URI}/bundle.js`,
  'bundle.css': `${WEBPACK_DEV_SERVER_URI}/bundle.css`,
};

function getStaticAssets({ isProduction }) {
  if (isProduction) {
    const staticAssets = JSON.parse(
      // Load the `webpackAssets.json` produced by our webpack config's `ManifestPlugin`
      fs.readFileSync(join(__dirname, '..', 'webpackAssets.json'), 'utf8')
    );

    // Ensure that static assets is not empty (e.g., the webpack build failed)
    if (Object.keys(staticAssets).length === 0) {
      // eslint-disable-next-line
      console.error(
        'Failed loading `webpackAssets.json` manifest file - file is empty!'
      );
      process.exit(1);
    }
  } else {
    // Assume we're in local
    return wdsStaticAssets;
  }
}

module.exports = {
  getStaticAssets,
};
