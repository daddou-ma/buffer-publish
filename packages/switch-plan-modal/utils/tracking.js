const { SEGMENT_NAMES } = require('@bufferapp/publish-constants');

const sourceCtaMap = new Map([
  ['app_shell', SEGMENT_NAMES.APP_SHELL_PRO_UPGRADE],
  ['app_header', SEGMENT_NAMES.HEADER_PRO_UPGRADE],
  ['queue_limit', SEGMENT_NAMES.QUEUE_LIMIT_PRO_UPGRADE],
  ['profile_limit', SEGMENT_NAMES.PROFILE_LIMIT_PRO_UPGRADE],
  ['cta_banner_upgrade_premium', SEGMENT_NAMES.CTA_BANNER_PREMIUM_UPGRADE],
  ['cta_banner_upgrade_small', SEGMENT_NAMES.CTA_BANNER_SMALL_UPGRADE],
  ['cta_banner_upgrade_pro', SEGMENT_NAMES.CTA_BANNER_PRO_UPGRADE],
  ['pinterest', SEGMENT_NAMES.PINTEREST_PRO_UPGRADE],
  ['org_admin', SEGMENT_NAMES.PLAN_OVERVIEW_PRO_UPGRADE],
  ['locked_profile', SEGMENT_NAMES.LOCKED_PROFILE_PRO_UPGRADE],
  ['pro_trial_expired', SEGMENT_NAMES.EXPIRED_TRIAL_PRO_UPGRADE],
  ['b4b_trial_expired', SEGMENT_NAMES.EXPIRED_TRIAL_BUSINESS_UPGRADE],
  ['plans_pro_upgrade', SEGMENT_NAMES.PLANS_PRO_UPGRADE],
  ['plans_pro_downgrade', SEGMENT_NAMES.PLANS_PRO_DOWNGRADE],
  ['plans_premium_upgrade', SEGMENT_NAMES.PLANS_PREMIUM_UPGRADE],
  ['plans_premium_downgrade', SEGMENT_NAMES.PLANS_PREMIUM_DOWNGRADE],
  ['plans_small_upgrade', SEGMENT_NAMES.PLANS_SMALL_UPGRADE],
  ['plans_small_downgrade', SEGMENT_NAMES.PLANS_SMALL_DOWNGRADE],
]);

const getCtaFromSource = source => sourceCtaMap.get(source) || null;

export default getCtaFromSource;
