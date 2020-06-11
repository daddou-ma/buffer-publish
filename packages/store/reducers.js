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
import languageSettingsReducer from '@bufferapp/language-preferences/reducer';
import i18nReducer from '@bufferapp/publish-i18n/reducer';
import profileSidebarReducer from '@bufferapp/publish-profile-sidebar/reducer';
import clientAccessReducer from '@bufferapp/client-access/reducer';
import productFeaturesReducer from '@bufferapp/product-features/reducer';
import asyncDataFetchReducer from '@bufferapp/async-data-fetch/lib/reducer';
import notificationsReducer from '@bufferapp/notifications/lib/reducer';
import environmentReducer from '@bufferapp/environment/lib/reducer';
import initialLoadingReducer from '@bufferapp/publish-initial-loading/reducer';
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
import trialCompleteModalReducer from '@bufferapp/publish-trial-complete-modal/reducer';
import appShellReducer from '@bufferapp/publish-app-shell/reducer';
import ctaBannerReducer from '@bufferapp/publish-cta-banner/reducer';
import campaignFormReducer from '@bufferapp/publish-campaign-form/reducer';
import campaignReducer from '@bufferapp/publish-campaign/reducer';
import campaignsListReducer from '@bufferapp/publish-campaigns-list/reducer';
import deleteCampaignModalReducer from '@bufferapp/publish-delete-campaign-modal/reducer';
import igFirstCommentProTrialModalReducer from '@bufferapp/publish-ig-first-comment-pro-trial-modal/reducer';
import trialReducer from '@bufferapp/publish-trial/reducer';
import hashtagGroupsReducer from '@bufferapp/publish-hashtag-group-manager/reducer';
import onboardingReducer from '@bufferapp/publish-onboarding/reducer';
import globalAccountReducer from '@bufferapp/global-account/reducer';
import closeComposerModalReducer from '@bufferapp/publish-close-composer-confirmation-modal/reducer';
import storyPreviewReducer from '@bufferapp/publish-story-preview/reducer';
import storyGroupComposerReducer from '@bufferapp/publish-story-group-composer/reducer';
import plansReducer from '@bufferapp/publish-plans/reducer';
import temporaryBannerReducer from '@bufferapp/publish-temporary-banner/reducer';
import creditCardFormReducer from '@bufferapp/publish-credit-card-form/reducer';
import userReducer from '@bufferapp/publish-data-user/reducer';
import orgReducer from '@bufferapp/publish-data-organizations/reducer';
import profilesReducer from '@bufferapp/publish-data-profiles/reducer';

export default {
  user: userReducer,
  organizations: orgReducer,
  publishProfiles: profilesReducer,
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
  asyncDataFetch: asyncDataFetchReducer,
  notifications: notificationsReducer,
  environment: environmentReducer,
  initialLoading: initialLoadingReducer,
  switchPlanModal: switchPlanModalReducer,
  stripe: stripeReducer,
  modals: modalsReducer,
  manageAppsExtras: manageAppsReducer,
  twoFactorAuth: twoFactorAuthReducer,
  productFeatures: productFeaturesReducer,
  drafts: draftsReducer,
  generalSettings: generalSettingsReducer,
  languageSettings: languageSettingsReducer,
  postingSchedule: postingScheduleReducer,
  profilesDisconnectedModal: profilesDisconnectedModalReducer,
  instagramDirectPostingModal: instagramDirectPostingModalReducer,
  accountNotifications: accountNotificationsReducer,
  stealProfileModal: stealProfileModalReducer,
  lockedProfileNotification: lockedProfileNotificationReducer,
  thirdparty: thirdpartyReducer,
  trialCompleteModal: trialCompleteModalReducer,
  appShell: appShellReducer,
  ctaBanner: ctaBannerReducer,
  campaignForm: campaignFormReducer,
  campaign: campaignReducer,
  campaignsList: campaignsListReducer,
  deleteCampaignModal: deleteCampaignModalReducer,
  igFirstCommentProTrialModal: igFirstCommentProTrialModalReducer,
  trial: trialReducer,
  onboarding: onboardingReducer,
  hashtagGroups: hashtagGroupsReducer,
  globalAccount: globalAccountReducer,
  closeComposerModal: closeComposerModalReducer,
  storyPreview: storyPreviewReducer,
  storyGroupComposer: storyGroupComposerReducer,
  plans: plansReducer,
  temporaryBanner: temporaryBannerReducer,
  creditCardForm: creditCardFormReducer,
};
