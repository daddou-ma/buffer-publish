const fs = require('fs');
const { join } = require('path');

const getSegmentScript = require('./embeds/segment');
const getStripeScript = require('./embeds/stripe');
const getNotificationScript = require('./embeds/notification');
const getModalScript = require('./embeds/modal');
const getAppcuesScript = require('./embeds/appcues');
const getIterateScript = require('./embeds/iterate');
const getBugsnagScript = require('./embeds/bugsnag');
const getBundleReminderHtml = require('./embeds/bundleReminder');
const getDatadogRumScript = require('./embeds/datadogRum');

const { getFaviconCode } = require('./favicon');
const { getRuntimeScript } = require('./assets');

const getHtml = ({
  staticAssets,
  isProduction,
  isStandalone,
  notification,
  userId,
  modalKey,
  modalValue,
  user,
}) => {
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
    .replace('{{{notificationScript}}}', getNotificationScript(notification))
    .replace('{{{showModalScript}}}', getModalScript(modalKey, modalValue))
    .replace('{{{appcues}}}', getAppcuesScript({ isProduction, isStandalone }))
    .replace(
      '{{{iterateScript}}}',
      getIterateScript({ isProduction, isStandalone })
    )
    .replace('{{{favicon}}}', getFaviconCode({ cacheBust: 'v1' }))
    .replace('{{{segmentScript}}}', getSegmentScript({ isProduction }))
    .replace(
      '{{{bugsnagScript}}}',
      getBugsnagScript({ userId, isProduction, isStandalone })
    )
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
