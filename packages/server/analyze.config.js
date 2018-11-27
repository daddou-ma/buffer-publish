/**
 * List of analyze related packages that we'll ensure are properly transpiled.
 * This is necessary as long as we're pulling in Analyze components.
 * @type {Array}
 */
const analyzePackages = [
  'report-list',
  'summary-table',
  'analyze-csv-export',
  'analyze-png-export',
  'analyze-shared-components',
  'add-report',
  'analyze-date-picker',
  'analyze-profile-selector',
  'micro-rpc',
  'analyze-decorators',
];

const analyzePackagesWhitelist = analyzePackages.map(imp => `(?!/@bufferapp/${imp})`).join('');
 /**
 * Loader required for loading and bundling the .less files that Analyze uses
 * @type {Object}
 */
const analyzeLessLoader = {
  test: /\.less$/,
  exclude: new RegExp(`/node_modules${analyzePackagesWhitelist}/`),
  use: [
    'style-loader',
    { loader: 'css-loader', options: { modules: true } },
    'less-loader',
  ],
};

module.exports = { analyzePackagesWhitelist, analyzeLessLoader };
