const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

const sourceCtaMap = new Map([
  ['app_sidebar', 'publish-app-sidebar-upgradeToPro-1'],
  ['app_header', 'publish-app-header-getMoreOutOfBuffer-1'],
  ['queue_limit', 'publish-composer-notifications-queueLimitUpgrade-1'],
  ['profile_limit', 'publish-orgAdmin-connect-profileLimitUpgrade-1'],
  ['pinterest', 'publish-orgAdmin-connect-upgradeToConnectPinterest-1'],
  ['org_admin', 'publish-orgAdmin-planOverview-upgradeForMore-1'],
  ['locked_profile', 'publish-app-lockedProfileTabs-tabsLimitUpgrade-1'],
]);
const getCtaFromSource = source =>
  sourceCtaMap.get(source) || (`publish-${source || 'unknown'}`);

module.exports = method(
  'upgradeToPro',
  'upgrade user to the pro plan',
  async ({ cycle, token, source }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/billing/start-or-update-subscription.json`,
        method: 'POST',
        strictSSL: process.env.NODE_ENV !== 'development',
        json: true,
        form: {
          cycle,
          stripeToken: token,
          cta: getCtaFromSource(source),
          access_token: session.publish.accessToken,
          product: 'publish',
          plan: 'pro',
        },
      });
    } catch (response) {
      throw createError({
        message: response.error,
      });
    }
    return result;
  },
);
