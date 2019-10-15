import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tabsReducer from '@bufferapp/publish-tabs/reducer';
import queueReducer from '@bufferapp/publish-queue/reducer';
import sentReducer from '@bufferapp/publish-sent/reducer';
import gridReducer from '@bufferapp/publish-grid/reducer';
import storiesReducer from '@bufferapp/publish-stories/reducer';
import pastRemindersReducer from '@bufferapp/publish-past-reminders/reducer';
import draftsReducer from '@bufferapp/publish-drafts/reducer';
import postingScheduleReducer from '@bufferapp/publish-posting-schedule/reducer';
import generalSettingsReducer from '@bufferapp/publish-general-settings/reducer';
import i18nReducer from '@bufferapp/publish-i18n/reducer';
import profileSidebarReducer from '@bufferapp/publish-profile-sidebar/reducer';
import clientAccessReducer from '@bufferapp/client-access/reducer';
import appSidebarReducer from '@bufferapp/app-sidebar/lib/reducer';
import productFeaturesReducer from '@bufferapp/product-features/reducer';
import asyncDataFetchReducer from '@bufferapp/async-data-fetch/lib/reducer';
import notificationsReducer from '@bufferapp/notifications/lib/reducer';
import environmentReducer from '@bufferapp/environment/lib/reducer';
import appSwitcherReducer from '@bufferapp/publish-app-switcher/reducer';
import betaRedirectReducer from '@bufferapp/publish-beta-redirect/reducer';
import switchPlanModalReducer from '@bufferapp/publish-switch-plan-modal/reducer';
import stripeReducer from '@bufferapp/stripe/reducer';
import modalsReducer from '@bufferapp/publish-modals/reducer';
import instagramDirectPostingModalReducer from '@bufferapp/publish-ig-direct-posting-modal/reducer';
import manageAppsReducer from '@bufferapp/manage-apps-extras/reducer';
import twoFactorAuthReducer from '@bufferapp/publish-two-factor-auth/reducer';
import profilesDisconnectedModalReducer from '@bufferapp/publish-profiles-disconnected-modal/reducer';
import accountNotificationsReducer from '@bufferapp/publish-account-notifications/reducer';
import stealProfileModalReducer from '@bufferapp/publish-steal-profile-modal/reducer';
import lockedProfileNotificationReducer from '@bufferapp/publish-locked-profile-notification/reducer';
import thirdpartyReducer from '@bufferapp/publish-thirdparty/reducer';
import b4bTrialCompleteReducer from '@bufferapp/publish-b4b-trial-complete-modal/reducer';
import appShellReducer from '@bufferapp/publish-app-shell/reducer';
import ctaBannerReducer from '@bufferapp/publish-cta-banner/reducer';
import igFirstCommentProTrialModalReducer from '@bufferapp/publish-ig-first-comment-pro-trial-modal/reducer';
import trialReducer from '@bufferapp/publish-trial/reducer';
import hashtagGroupsReducer from '@bufferapp/publish-hashtag-group-manager/reducer';
import onboardingReducer from '@bufferapp/publish-onboarding/reducer';
import globalAccountReducer from '@bufferapp/global-account/reducer';
import closeComposerModalReducer from '@bufferapp/publish-close-composer-confirmation-modal/reducer';
import storyPreviewReducer from '@bufferapp/publish-story-preview/reducer';
import storyGroupComposerReducer from '@bufferapp/publish-story-group-composer/reducer';
import plansReducer from '@bufferapp/publish-plans/reducer';
import creditCardFormReducer from '@bufferapp/publish-credit-card-form/reducer';

// Analyze
import averageReducer from '@bufferapp/average-table/reducer';
import compareChartReducer from '@bufferapp/compare-chart/reducer';
import datePickerReducer from '@bufferapp/analyze-date-picker/reducer';
import exportPickerReducer from '@bufferapp/analyze-export-picker/reducer';
import exportToCSVReducer from '@bufferapp/analyze-csv-export/reducer';
import exportToPNGReducer from '@bufferapp/analyze-png-export/reducer';
import postsReducer from '@bufferapp/posts-table/reducer';
import profileReducer from '@bufferapp/analyze-profile-selector/reducer';
import reportListReducer from '@bufferapp/report-list/reducer';
import summaryTableReducer from '@bufferapp/summary-table/reducer';
import profileLoaderReducer from '@bufferapp/profile-loader/reducer';

export default {
  form: formReducer,
  queue: queueReducer,
  sent: sentReducer,
  grid: gridReducer,
  stories: storiesReducer,
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
  switchPlanModal: switchPlanModalReducer,
  stripe: stripeReducer,
  modals: modalsReducer,
  manageAppsExtras: manageAppsReducer,
  twoFactorAuth: twoFactorAuthReducer,
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
  globalAccount: globalAccountReducer,
  closeComposerModal: closeComposerModalReducer,
  storyPreview: storyPreviewReducer,
  storyGroupComposer: storyGroupComposerReducer,
  plans: plansReducer,
  creditCardForm: creditCardFormReducer,

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
