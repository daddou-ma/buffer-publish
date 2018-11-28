/**
 * List of analyze related packages that we'll ensure are properly transpiled.
 * This is necessary as long as we're pulling in Analyze components.
 * @type {Array}
 */
const analyzePackages = [
  'add-report',
  'analyze-csv-export',
  'analyze-date-picker',
  'analyze-decorators',
  'analyze-png-export',
  'analyze-profile-selector',
  'analyze-shared-components',
  'average-table',
  'micro-rpc',
  'report-list',
  'summary-table',
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
