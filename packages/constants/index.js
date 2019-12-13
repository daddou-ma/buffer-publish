const keyMirror = require('keymirror');

const SERVICE_TWITTER = 'twitter';
const SERVICE_FACEBOOK = 'facebook';
const SERVICE_LINKEDIN = 'linkedin';
const SERVICE_GOOGLE = 'google';
const SERVICE_PINTEREST = 'pinterest';
const SERVICE_INSTAGRAM = 'instagram';

const PRO_PLAN_ID = '5';
const SOLO_PREMIUM_BUSINESS_PLAN_ID = '8';
const PREMIUM_BUSINESS_PLAN_ID = '9';
const SMALL_PLAN_ID = '10';

// segment naming convention: APP-VIEW-LOCATION-BUTTON-VERSION
// https://www.notion.so/buffer/CTA-Parameter-Conventions-Call-to-Action-WIP-0ae87bdd99574e3888afb2fe6b75035a
const ANALYTICS_OVERVIEW_SBP_TRIAL =
  'publish-analyticsOverview-trialCard-sbpTrial-1';
const ANALYTICS_OVERVIEW_BUSINESS_UPGRADE =
  'publish-analyticsOverview-upgradeCard-businessUpgrade-1';
const APP_SHELL_PRO_TRIAL = 'publish-appShell-menu-proTrial-1';
const APP_SHELL_PRO_UPGRADE = 'publish-appShell-menu-proUpgrade-1';
const CTA_BANNER_PREMIUM_UPGRADE = 'publish-app-ctaBanner-premiumUpgrade-1';
const CTA_BANNER_SMALL_UPGRADE = 'publish-app-ctaBanner-smallUpgrade-1';
const CTA_BANNER_PRO_UPGRADE = 'publish-app-ctaBanner-proUpgrade-1';
const DRAFTS_SBP_TRIAL = 'publish-drafts-trialCard-sbpTrial-1';
const DRAFTS_BUSINESS_UPGRADE = 'publish-drafts-upgradeCard-businessUpgrade-1';
const EXPIRED_TRIAL_PRO_UPGRADE = 'publish-app-expiredTrialModal-proUpgrade-1';
const EXPIRED_TRIAL_PREMIUM_UPGRADE =
  'publish-app-expiredTrialModal-premiumUpgrade-1';
const EXPIRED_TRIAL_BUSINESS_UPGRADE =
  'publish-app-expiredTrialModal-businessUpgrade-1';
const HEADER_PRO_TRIAL = 'publish-app-header-proTrial-1';
const HEADER_PRO_UPGRADE = 'publish-app-header-proUpgrade-1';
const IG_FIRST_COMMENT_PRO_TRIAL =
  'publish-composer-instagramFirstCommentTrialModal-proTrial-1';
const IG_FIRST_COMMENT_PRO_UPGRADE =
  'publish-composer-instagramFirstCommentUpgradeModal-proUpgrade-1';
const LOCKED_PROFILE_PRO_UPGRADE =
  'publish-profiles-lockedProfileUpgradeCard-proUpgrade-1';
const LOCKED_PROFILE_BUSINESS_UPGRADE =
  'publish-profiles-lockedProfileUpgradeCard-businessUpgrade-1';
const PROFILE_LIMIT_PRO_UPGRADE =
  'publish-orgAdminConnect-profileLimitUpgrade-proUpgrade-1';
const QUEUE_LIMIT_PRO_TRIAL =
  'publish-composer-queueLimitNotification-proTrial-1';
const QUEUE_LIMIT_PRO_UPGRADE =
  'publish-composer-queueLimitNotification-proUpgrade-1';
const PINTEREST_PRO_UPGRADE =
  'publish-orgAdminConnect-upgradeToConnectPinterest-proUpgrade-1';
const REMINDERS_MODAL = 'publish-app-setRemindersModal-setReminders-1';
const REMINDERS_BANNER = 'publish-queue-remindersBanner-setReminders-1';
const REMINDERS_POST = 'publish-queue-remindersPost-setReminders-1';
const REMINDERS_STORIES = 'publish-stories-remindersButton-setReminders-1';
const PLAN_OVERVIEW_PRO_UPGRADE =
  'publish-orgAdminConnect-planOverview-proUpgrade-1';
const PLANS_SOLO_PREMIUM_UPGRADE =
  'publish-plans-switchPlansModal-premium35Upgrade-1';
const PLANS_SOLO_PREMIUM_DOWNGRADE =
  'publish-plans-switchPlansModal-premium35Downgrade-1';
const PLANS_PRO_UPGRADE = 'publish-plansPage-switchPlansModal-proUpgrade-1';
const PLANS_PRO_DOWNGRADE = 'publish-plans-switchPlansModal-proDowngrade-1';
const PLANS_PREMIUM_UPGRADE = 'publish-plans-switchPlansModal-premiumUpgrade-1';
const PLANS_PREMIUM_DOWNGRADE =
  'publish-plans-switchPlansModal-premiumDowngrade-1';
const PLANS_SMALL_UPGRADE = 'publish-plans-switchPlansModal-smallUpgrade-1';
const PLANS_SMALL_DOWNGRADE = 'publish-plans-switchPlansModal-smallDowngrade-1';
const STORIES_PREVIEW_COMPOSER = 'publish-stories-composer-preview-1';
const STORIES_PREVIEW_QUEUE = 'publish-stories-queue-preview-1';
const STORIES_CREATE_STORY_GROUP =
  'publish-stories-composer-createStoryGroup-1';
const STORIES_UPDATE_STORY_GROUP =
  'publish-stories-composer-updateStoryGroup-1';
const STORIES_COMPOSER_ADD_NOTE = 'publish-stories-composer-addNote-1';
const STORIES_PREVIEW_QUEUE_ADD_NOTE = 'publish-stories-queuePreview-addNote-1';
const STORIES_PREVIEW_COMPOSER_ADD_NOTE =
  'publish-stories-composerPreview-addNote-1';
const STORIES_IMAGE_ASPECT_RATIO_UPLOADED =
  'publish-stories-composer-imageAspectRatioUploaded-1';

const ImageDimensions = {
  large: {
    width: 306,
    height: 544,
  },
  regular: {
    width: 180,
    height: 320,
  },
  thumbnail: {
    width: 110,
    height: 198,
  },
};

const UploadTypes = keyMirror({
  LINK_THUMBNAIL: null,
  MEDIA: null,
});

const MediaTypes = keyMirror({
  IMAGE: null,
  VIDEO: null,
  GIF: null,
});

const AppEnvironments = keyMirror({
  EXTENSION: null,
  WEB_DASHBOARD: null,
  ONBOARDING: null,
});

const PUSHER = {
  API_KEY: 'bd9ba9324ece3341976e',
  CLUSTER: 'mt1',
  AUTH_ENDPOINT: '/pusher_receiver/auth',
};

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
  PLAN_IDS: {
    PRO_PLAN_ID,
    SOLO_PREMIUM_BUSINESS_PLAN_ID,
    PREMIUM_BUSINESS_PLAN_ID,
    SMALL_PLAN_ID,
  },
  SEGMENT_NAMES: {
    ANALYTICS_OVERVIEW_SBP_TRIAL,
    ANALYTICS_OVERVIEW_BUSINESS_UPGRADE,
    APP_SHELL_PRO_TRIAL,
    APP_SHELL_PRO_UPGRADE,
    CTA_BANNER_PREMIUM_UPGRADE,
    CTA_BANNER_SMALL_UPGRADE,
    CTA_BANNER_PRO_UPGRADE,
    DRAFTS_SBP_TRIAL,
    DRAFTS_BUSINESS_UPGRADE,
    EXPIRED_TRIAL_PRO_UPGRADE,
    EXPIRED_TRIAL_PREMIUM_UPGRADE,
    EXPIRED_TRIAL_BUSINESS_UPGRADE,
    HEADER_PRO_TRIAL,
    HEADER_PRO_UPGRADE,
    IG_FIRST_COMMENT_PRO_TRIAL,
    IG_FIRST_COMMENT_PRO_UPGRADE,
    LOCKED_PROFILE_PRO_UPGRADE,
    LOCKED_PROFILE_BUSINESS_UPGRADE,
    PINTEREST_PRO_UPGRADE,
    REMINDERS_MODAL,
    REMINDERS_BANNER,
    REMINDERS_POST,
    REMINDERS_STORIES,
    PLAN_OVERVIEW_PRO_UPGRADE,
    PLANS_SOLO_PREMIUM_UPGRADE,
    PLANS_SOLO_PREMIUM_DOWNGRADE,
    PLANS_PRO_UPGRADE,
    PLANS_PRO_DOWNGRADE,
    PLANS_PREMIUM_UPGRADE,
    PLANS_PREMIUM_DOWNGRADE,
    PLANS_SMALL_UPGRADE,
    PLANS_SMALL_DOWNGRADE,
    STORIES_PREVIEW_COMPOSER,
    STORIES_PREVIEW_QUEUE,
    PROFILE_LIMIT_PRO_UPGRADE,
    QUEUE_LIMIT_PRO_TRIAL,
    QUEUE_LIMIT_PRO_UPGRADE,
    STORIES_CREATE_STORY_GROUP,
    STORIES_UPDATE_STORY_GROUP,
    STORIES_COMPOSER_ADD_NOTE,
    STORIES_PREVIEW_COMPOSER_ADD_NOTE,
    STORIES_PREVIEW_QUEUE_ADD_NOTE,
    STORIES_IMAGE_ASPECT_RATIO_UPLOADED,
  },
  MediaTypes,
  UploadTypes,
  AppEnvironments,
  PUSHER,
  ImageDimensions,
};
