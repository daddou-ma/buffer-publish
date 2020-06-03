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

function getStaticAssets({
  isProduction,
  isStandalone,
  usePrecompiledBundles,
}) {
  /**
   * We use the webpack manifest file when we're in production and NOT running in standalone mode
   * (which is treated as production locally) otherwise we assume we're running locally with
   * `webpack-dev-server` (aka yarn run watch) serving assets on port 8080
   * (See the `wdsStaticAssets` var above.)
   *
   * It's also possible that we're running in GitHub Actions. In this case we'll start up the server in
   * standalone mode and create another server to serve the already-compiled bundles at the same URL:PORT
   * as webpack-dev-server [1]. However they will have hashes in their names, so we'll still reference the
   * manifest file in this case; hence the `usePrecompiledBundles` condition below.
   *
   * [1] See the `serveStaticAssets` method in `standalone/index.js` for details.
   */
  if ((isProduction && !isStandalone) || usePrecompiledBundles) {
    const pathToAssets = usePrecompiledBundles
      ? join(__dirname, '..', '..', '..', 'dist', 'webpackAssets.json')
      : join(__dirname, '..', 'webpackAssets.json');
    const staticAssets = JSON.parse(
      // Load the `webpackAssets.json` produced by our webpack config's `ManifestPlugin`
      fs.readFileSync(pathToAssets, 'utf8')
    );

    // Ensure that static assets is not empty (e.g., the webpack build failed)
    if (Object.keys(staticAssets).length === 0) {
      // eslint-disable-next-line
      console.error(
        'Failed loading `webpackAssets.json` manifest file - file is empty!'
      );
      process.exit(1);
    }

    return staticAssets;
  }
  // Assume we're in local
  return wdsStaticAssets;
}

/**
 * Webpack runtime script, inline into the HTML in prod, locally just include the script:
 * https://survivejs.com/webpack/optimizing/separating-manifest/
 */
const getRuntimeScript = ({ staticAssets, isProduction, isStandalone }) => {
  if (isProduction && !isStandalone) {
    const runtimeFilename = staticAssets['runtime.js'].split('/').pop();
    return `<script>${fs.readFileSync(
      join(__dirname, '..', runtimeFilename),
      'utf8'
    )}</script>`;
  }
  return `<script crossorigin src="${staticAssets['runtime.js']}"></script>`;
};

module.exports = {
  getStaticAssets,
  getRuntimeScript,
};
