import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as tabsReducer } from '@bufferapp/publish-tabs';
import { reducer as queueReducer } from '@bufferapp/publish-queue';
import { reducer as sentReducer } from '@bufferapp/publish-sent';
import { reducer as gridReducer } from '@bufferapp/publish-grid';
import { reducer as pastRemindersReducer } from '@bufferapp/publish-past-reminders';
import { reducer as draftsReducer } from '@bufferapp/publish-drafts';
import { reducer as postingScheduleReducer } from '@bufferapp/publish-posting-schedule';
import { reducer as generalSettingsReducer } from '@bufferapp/publish-general-settings';
import { reducer as i18nReducer } from '@bufferapp/publish-i18n';
import { reducer as profileSidebarReducer } from '@bufferapp/publish-profile-sidebar';
import { reducer as clientAccessReducer } from '@bufferapp/client-access';
import { reducer as appSidebarReducer } from '@bufferapp/app-sidebar';
import { reducer as productFeaturesReducer } from '@bufferapp/product-features';
import { reducer as asyncDataFetchReducer } from '@bufferapp/async-data-fetch';
import { reducer as notificationsReducer } from '@bufferapp/notifications';
import { reducer as environmentReducer } from '@bufferapp/environment';
import { reducer as appSwitcherReducer } from '@bufferapp/publish-app-switcher';
import { reducer as betaRedirectReducer } from '@bufferapp/publish-beta-redirect';
import { reducer as upgradeModalReducer } from '@bufferapp/publish-upgrade-modal';
import { reducer as stripeReducer } from '@bufferapp/stripe';
import { reducer as modalsReducer } from '@bufferapp/publish-modals';
import { reducer as instagramDirectPostingModalReducer } from '@bufferapp/publish-ig-direct-posting-modal';
import { reducer as manageAppsReducer } from '@bufferapp/manage-apps-extras';
import { reducer as twoFactorAuthReducer } from '@bufferapp/publish-two-factor-auth';
import { reducer as closeAccountReducer } from '@bufferapp/close-account';
import { reducer as profilesDisconnectedModalReducer } from '@bufferapp/publish-profiles-disconnected-modal';
import { reducer as accountNotificationsReducer } from '@bufferapp/publish-account-notifications';
import { reducer as stealProfileModalReducer } from '@bufferapp/publish-steal-profile-modal';
import { reducer as lockedProfileNotificationReducer } from '@bufferapp/publish-locked-profile-notification';
import { reducer as thirdpartyReducer } from '@bufferapp/publish-thirdparty';
import { reducer as b4bTrialCompleteReducer } from '@bufferapp/publish-b4b-trial-complete-modal';
import { reducer as appShellReducer } from '@bufferapp/publish-app-shell';
import { reducer as ctaBannerReducer } from '@bufferapp/publish-cta-banner';
import { reducer as igFirstCommentProTrialModalReducer } from '@bufferapp/publish-ig-first-comment-pro-trial-modal';
import { reducer as trialReducer } from '@bufferapp/publish-trial';
import { reducer as hashtagGroupsReducer } from '@bufferapp/publish-hashtag-group-manager';
import { reducer as disabledQueueReducer } from '@bufferapp/publish-disabled-queue';
import { reducer as onboardingReducer } from '@bufferapp/publish-onboarding';
import { reducer as globalAccountReducer } from '@bufferapp/global-account';
import { reducer as closeComposerModalReducer } from '@bufferapp/publish-close-composer-confirmation-modal';

// Analyze
import { reducer as averageReducer } from '@bufferapp/average-table';
import { reducer as compareChartReducer } from '@bufferapp/compare-chart';
import { reducer as datePickerReducer } from '@bufferapp/analyze-date-picker';
import { reducer as exportPickerReducer } from '@bufferapp/analyze-export-picker';
import { reducer as exportToCSVReducer } from '@bufferapp/analyze-csv-export';
import { reducer as exportToPNGReducer } from '@bufferapp/analyze-png-export';
import { reducer as postsReducer } from '@bufferapp/posts-table';
import { reducer as profileReducer } from '@bufferapp/analyze-profile-selector';
import { reducer as reportListReducer } from '@bufferapp/report-list';
import { reducer as summaryTableReducer } from '@bufferapp/summary-table';
import { reducer as profileLoaderReducer } from '@bufferapp/profile-loader';

export default {
  form: formReducer,
  queue: queueReducer,
  sent: sentReducer,
  grid: gridReducer,
  pastReminders: pastRemindersReducer,
  i18n: i18nReducer,
  tabs: tabsReducer,
  profileSidebar: profileSidebarReducer,
  clientAccess: clientAccessReducer,
  appSidebar: appSidebarReducer,
  asyncDataFetch: asyncDataFetchReducer,
  notifications: notificationsReducer,
  environment: environmentReducer,
  appSwitcher: appSwitcherReducer,
  betaRedirect: betaRedirectReducer,
  upgradeModal: upgradeModalReducer,
  stripe: stripeReducer,
  modals: modalsReducer,
  manageAppsExtras: manageAppsReducer,
  twoFactorAuth: twoFactorAuthReducer,
  closeAccount: closeAccountReducer,
  productFeatures: productFeaturesReducer,
  drafts: draftsReducer,
  generalSettings: generalSettingsReducer,
  postingSchedule: postingScheduleReducer,
  profilesDisconnectedModal: profilesDisconnectedModalReducer,
  instagramDirectPostingModal: instagramDirectPostingModalReducer,
  accountNotifications: accountNotificationsReducer,
  stealProfileModal: stealProfileModalReducer,
  lockedProfileNotification: lockedProfileNotificationReducer,
  thirdparty: thirdpartyReducer,
  b4bTrialComplete: b4bTrialCompleteReducer,
  appShell: appShellReducer,
  ctaBanner: ctaBannerReducer,
  igFirstCommentProTrialModal: igFirstCommentProTrialModalReducer,
  trial: trialReducer,
  onboarding: onboardingReducer,
  hashtagGroups: hashtagGroupsReducer,
  disabledQueue: disabledQueueReducer,
  globalAccount: globalAccountReducer,
  closeComposerModal: closeComposerModalReducer,

  // Analyze
  average: averageReducer,
  compare: compareChartReducer,
  date: datePickerReducer,
  exportPicker: exportPickerReducer,
  exportToPNG: exportToPNGReducer,
  exportToCSV: exportToCSVReducer,
  posts: postsReducer,
  profileLoader: profileLoaderReducer,
  profiles: profileReducer,
  reportList: reportListReducer,
  summary: summaryTableReducer,
};
