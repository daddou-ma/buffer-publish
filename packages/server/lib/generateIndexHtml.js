const fs = require('fs');
const { join } = require('path');

const getSegmentScript = require('./embeds/segment');
const getStripeScript = require('./embeds/stripe');
const getNotificationScript = require('./embeds/notification');
const getModalScript = require('./embeds/modal');
const getAppcuesScript = require('./embeds/appcues');
const getFullstoryScript = require('./embeds/fullstory');
const getIterateScript = require('./embeds/iterate');
const getBugsnagScript = require('./embeds/bugsnag');
const getUserScript = require('./embeds/user');
const getBufferDataScript = require('./embeds/bufferData');

const { getFaviconCode } = require('./favicon');
const { getRuntimeScript } = require('./assets');

const getHtml = ({
  staticAssets,
  isProduction,
  notification,
  userId,
  modalKey,
  modalValue,
  user,
  profiles,
}) => {
  return fs
    .readFileSync(join(__dirname, '..', 'index.html'), 'utf8')
    .replace('{{{runtime}}}', getRuntimeScript({ isProduction, staticAssets }))
    .replace('{{{vendor}}}', staticAssets['vendor.js'])
    .replace('{{{bundle}}}', staticAssets['bundle.js'])
    .replace('{{{bundle-css}}}', staticAssets['bundle.css'])
    .replace('{{{stripeScript}}}', getStripeScript())
    .replace('{{{bugsnagScript}}}', getBugsnagScript({ isProduction, userId }))
    .replace('{{{notificationScript}}}', getNotificationScript(notification))
    .replace('{{{showModalScript}}}', getModalScript(modalKey, modalValue))
    .replace('{{{appcues}}}', getAppcuesScript({ isProduction }))
    .replace('{{{iterateScript}}}', getIterateScript({ isProduction }))
    .replace('{{{userScript}}}', getUserScript({ id: userId }))
    .replace('{{{favicon}}}', getFaviconCode({ cacheBust: 'v1' }))
    .replace('{{{segmentScript}}}', getSegmentScript({ isProduction }))
    .replace('{{{bufferData}}}', getBufferDataScript({ user, profiles }))
    .replace(
      '{{{fullStoryScript}}}',
      getFullstoryScript({ user, isProduction })
    );
};

module.exports = getHtml;
