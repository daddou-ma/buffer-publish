const fs = require('fs');
const { join } = require('path');

const getSegmentScript = require('./embeds/segment');
const getStripeScript = require('./embeds/stripe');
const getAppcuesScript = require('./embeds/appcues');
const getIterateScript = require('./embeds/iterate');
const getBundleReminderHtml = require('./embeds/bundleReminder');
const getDatadogRumScript = require('./embeds/datadogRum');

const { getFaviconCode } = require('./favicon');
const { getRuntimeScript } = require('./assets');

const getHtml = ({ staticAssets, isProduction, isStandalone }) => {
  return fs
    .readFileSync(join(__dirname, '..', 'index.html'), 'utf8')
    .replace(
      '{{{runtime}}}',
      getRuntimeScript({ staticAssets, isProduction, isStandalone })
    )
    .replace('{{{vendor}}}', staticAssets['vendor.js'])
    .replace('{{{bundle}}}', staticAssets['bundle.js'])
    .replace('{{{bundle-css}}}', staticAssets['bundle.css'])
    .replace('{{{stripeScript}}}', getStripeScript())
    .replace('{{{appcues}}}', getAppcuesScript({ isProduction, isStandalone }))
    .replace(
      '{{{iterateScript}}}',
      getIterateScript({ isProduction, isStandalone })
    )
    .replace('{{{favicon}}}', getFaviconCode({ cacheBust: 'v1' }))
    .replace('{{{segmentScript}}}', getSegmentScript({ isProduction }))
    .replace(
      '{{{bundleReminder}}}',
      getBundleReminderHtml({ isProduction, isStandalone })
    )
    .replace(
      '{{{datadogRum}}}',
      getDatadogRumScript({ isProduction, isStandalone })
    );
};

module.exports = getHtml;
