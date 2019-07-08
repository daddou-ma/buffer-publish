const { SEGMENT_NAMES } = require('@bufferapp/publish-constants');
const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

// const sourceCtaMap = new Map([
//   ['app_sidebar', 'publish-app-sidebar-upgradeToPro-1'],
//   ['app_shell', 'publish-app-shell-upgradeToPro-1'],
//   ['app_header', 'publish-app-header-getMoreOutOfBuffer-1'],
//   ['queue_limit', 'publish-composer-notifications-queueLimitUpgrade-1'],
//   ['profile_limit', 'publish-orgAdmin-connect-profileLimitUpgrade-1'],
//   ['pinterest', 'publish-orgAdmin-connect-upgradeToConnectPinterest-1'],
//   ['org_admin', 'publish-orgAdmin-planOverview-upgradeForMore-1'],
//   ['locked_profile', 'publish-app-lockedProfileTabs-tabsLimitUpgrade-1'],
//   ['pro_trial_expired', 'publish-app-onLoad-proTrialExpired-1'],
//   ['b4b_trial_expired', 'publish-app-onLoad-b4bTrialExpired-1'],
// ]);

const sourceCtaMap = new Map([
  ['app_sidebar', 'publish-app-sidebar-upgradeToPro-1'],
  ['app_shell', SEGMENT_NAMES.APP_SHELL_PRO_UPGRADE],
  ['app_header', SEGMENT_NAMES.HEADER_PRO_UPGRADE],
  ['queue_limit', SEGMENT_NAMES.QUEUE_LIMIT_PRO_UPGRADE],
  ['profile_limit', SEGMENT_NAMES.PROFILE_LIMIT_PRO_UPGRADE],
  ['pinterest', 'publish-orgAdmin-connect-upgradeToConnectPinterest-1'],
  ['org_admin', 'publish-orgAdmin-planOverview-upgradeForMore-1'],
  ['locked_profile', SEGMENT_NAMES.LOCKED_PROFILE_PRO_UPGRADE],
  ['pro_trial_expired', SEGMENT_NAMES.EXPIRED_TRIAL_PRO_UPGRADE],
  ['b4b_trial_expired', SEGMENT_NAMES.EXPIRED_TRIAL_BUSINESS_UPGRADE],
]);

const getCtaFromSource = source =>
  sourceCtaMap.get(source) || null;

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
