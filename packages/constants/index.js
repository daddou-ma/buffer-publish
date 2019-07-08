const SERVICE_TWITTER = 'twitter';
const SERVICE_FACEBOOK = 'facebook';
const SERVICE_LINKEDIN = 'linkedin';
const SERVICE_GOOGLE = 'google';
const SERVICE_PINTEREST = 'pinterest';
const SERVICE_INSTAGRAM = 'instagram';
// segment naming convention: APP-VIEW-LOCATION-BUTTON-VERSION
// https://www.notion.so/buffer/CTA-Parameter-Conventions-Call-to-Action-WIP-0ae87bdd99574e3888afb2fe6b75035a
const IG_FIRST_COMMENT_PRO_TRIAL = 'publish-composer-instagramFirstCommentTrialModal-proTrial-1';
const HEADER_PRO_TRIAL = 'publish-app-header-proTrial-1';
const APP_SHELL_PRO_TRIAL = 'publish-appShell-menu-proTrial-1';
const QUEUE_LIMIT_PRO_TRIAL = 'publish-composer-queueLimitNotification-proTrial-1';
const ANALYTICS_OVERVIEW_SBP_TRIAL = 'publish-analyticsOverview-trialCard-sbpTrial-1';
const DRAFTS_SBP_TRIAL = 'publish-drafts-trialCard-sbpTrial-1';

const EXPIRED_TRIAL_PRO_UPGRADE = 'publish-app-expiredTrialModal-proUpgrade-1';
const ANALYTICS_OVERVIEW_BUSINESS_UPGRADE = 'publish-analyticsOverview-upgradeCard-businessUpgrade-1';
const EXPIRED_TRIAL_BUSINESS_UPGRADE = 'publish-app-expiredTrialModal-businessUpgrade-1';
const APP_SHELL_PRO_UPGRADE = 'publish-appShell-menu-proUpgrade-1';
const IG_FIRST_COMMENT_PRO_UPGRADE = 'publish-composer-instagramFirstCommentUpgradeModal-proUpgrade-1';
const LOCKED_PROFILE_PRO_UPGRADE = 'publish-profiles-lockedProfileUpgradeCard-proUpgrade-1';
const DRAFTS_BUSINESS_UPGRADE = 'publish-drafts-upgradeCard-sbpUpgrade-1';
const LOCKED_PROFILE_BUSINESS_UPGRADE = 'publish-profiles-lockedProfileUpgradeCard-businessUpgrade-1';

module.exports = {
  SERVICE_NAMES: [
    SERVICE_TWITTER,
    SERVICE_FACEBOOK,
    SERVICE_LINKEDIN,
    SERVICE_GOOGLE,
    SERVICE_PINTEREST,
    SERVICE_INSTAGRAM,
  ],
  SERVICE_TWITTER,
  SERVICE_FACEBOOK,
  SERVICE_LINKEDIN,
  SERVICE_GOOGLE,
  SERVICE_PINTEREST,
  SERVICE_INSTAGRAM,
  SEGMENT_NAMES: {
    IG_FIRST_COMMENT_PRO_TRIAL,
    HEADER_PRO_TRIAL,
    ANALYTICS_OVERVIEW_SBP_TRIAL,
    DRAFTS_SBP_TRIAL,
    APP_SHELL_PRO_TRIAL,
    QUEUE_LIMIT_PRO_TRIAL,
    EXPIRED_TRIAL_PRO_UPGRADE,
    ANALYTICS_OVERVIEW_BUSINESS_UPGRADE,
    EXPIRED_TRIAL_BUSINESS_UPGRADE,
    APP_SHELL_PRO_UPGRADE,
    IG_FIRST_COMMENT_PRO_UPGRADE,
    LOCKED_PROFILE_PRO_UPGRADE,
    DRAFTS_BUSINESS_UPGRADE,
    LOCKED_PROFILE_BUSINESS_UPGRADE,
  },
};
