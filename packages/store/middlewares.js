import { applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import reduxDynamicMiddlewares from 'redux-dynamic-middlewares';

import queueMiddleware from '@bufferapp/publish-queue/middleware';
import sentMiddleware from '@bufferapp/publish-sent/middleware';
import gridMiddleware from '@bufferapp/publish-grid/middleware';
import pastRemindersMiddleware from '@bufferapp/publish-past-reminders/middleware';
import draftsMiddleware from '@bufferapp/publish-drafts/middleware';
import storiesMiddleware from '@bufferapp/publish-stories/middleware';
import postingScheduleSettingsMiddleware from '@bufferapp/publish-posting-schedule/middleware';
import generalSettingsMiddleware from '@bufferapp/publish-general-settings/middleware';
import languageSettingsMiddleware from '@bufferapp/language-preferences/middleware';
import profileSidebarMiddleware from '@bufferapp/publish-profile-sidebar/middleware';
import clientAccessMiddleware from '@bufferapp/client-access/middleware';
import bootstrapMiddleware from '@bufferapp/publish-bootstrap/middleware';
import userMiddleware from '@bufferapp/publish-data-user/middleware';
import orgMiddleware from '@bufferapp/publish-data-organizations/middleware';
import profilesMiddleware from '@bufferapp/publish-data-profiles/middleware';
import i18nMiddleware from '@bufferapp/publish-i18n/middleware';
import asyncDataFetchMiddleware from '@bufferapp/async-data-fetch/lib/middleware';
import pusherSyncMiddleware from '@bufferapp/publish-pusher-sync/middleware';
import notificationsMiddleware from '@bufferapp/notifications/lib/middleware';
import unauthorizedRedirectMiddleware from '@bufferapp/unauthorized-redirect/middleware';
import switchPlanModalMiddleware from '@bufferapp/publish-switch-plan-modal/middleware';
import stripeMiddleware from '@bufferapp/stripe/middleware';
import modalsMiddleware from '@bufferapp/publish-modals/middleware';
import manageAppsMiddleware from '@bufferapp/manage-apps-extras/middleware';
import twoFactorAuthMiddleware from '@bufferapp/publish-two-factor-auth/middleware';
import dateTimePreferencesMiddleware from '@bufferapp/date-time-preferences/middleware';
import maintenanceRedirectMiddleware from '@bufferapp/maintenance-redirect/middleware';
import notificationsProviderMiddleware from '@bufferapp/publish-notifications-provider/middleware';
import profilesDisconnectedModalMiddleware from '@bufferapp/publish-profiles-disconnected-modal/middleware';
import accountNotificationsMiddleware from '@bufferapp/publish-account-notifications/middleware';
import publishCTABannerMiddleware from '@bufferapp/publish-cta-banner/middleware';
import thirdpartyMiddleware from '@bufferapp/publish-thirdparty/middleware';
import campaignFormMiddleware from '@bufferapp/publish-campaign-form/middleware';
import campaignMiddleware from '@bufferapp/publish-campaign/middleware';
import campaignsListMiddleware from '@bufferapp/publish-campaigns-list/middleware';
import deleteCampaignModalMiddleware from '@bufferapp/publish-delete-campaign-modal/middleware';
import bookmarkletsMiddleware from '@bufferapp/publish-bookmarklets/middleware';
import trialCompleteModalMiddleware from '@bufferapp/publish-trial-complete-modal/middleware';
import appShellMiddleware from '@bufferapp/publish-app-shell/middleware';
import igFirstCommentProTrialModalMiddleware from '@bufferapp/publish-ig-first-comment-pro-trial-modal/middleware';
import hashtagGroupsMiddleware from '@bufferapp/publish-hashtag-group-manager/middleware';
import trialMiddleware from '@bufferapp/publish-trial/middleware';
import segmentTrackingMiddleware from '@bufferapp/publish-analytics-middleware/middleware';
import globalAccountMiddleware from '@bufferapp/global-account/middleware';
import closeComposerModalMiddleware from '@bufferapp/publish-close-composer-confirmation-modal/middleware';
import temporaryBannerMiddleware from '@bufferapp/publish-temporary-banner/middleware';
import storyPreviewMiddleware from '@bufferapp/publish-story-preview/middleware';
import storyGroupComposerMiddleware from '@bufferapp/publish-story-group-composer/middleware';
import profileNavMiddleware from '@bufferapp/publish-profile-nav/middleware';

import actionsOnlyForAnalyzeMiddleware from '@bufferapp/publish-analytics/middleware';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const composedMiddlewares = history =>
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      actionsOnlyForAnalyzeMiddleware('hide'),
      asyncDataFetchMiddleware,
      i18nMiddleware,
      profileSidebarMiddleware,
      clientAccessMiddleware,
      bootstrapMiddleware,
      userMiddleware,
      orgMiddleware,
      profilesMiddleware,
      queueMiddleware,
      sentMiddleware,
      gridMiddleware,
      pastRemindersMiddleware,
      postingScheduleSettingsMiddleware,
      generalSettingsMiddleware,
      languageSettingsMiddleware,
      pusherSyncMiddleware,
      notificationsMiddleware,
      unauthorizedRedirectMiddleware,
      switchPlanModalMiddleware,
      manageAppsMiddleware,
      stripeMiddleware,
      modalsMiddleware,
      twoFactorAuthMiddleware,
      dateTimePreferencesMiddleware,
      maintenanceRedirectMiddleware,
      draftsMiddleware,
      notificationsProviderMiddleware,
      profilesDisconnectedModalMiddleware,
      accountNotificationsMiddleware,
      publishCTABannerMiddleware,
      bookmarkletsMiddleware,
      thirdpartyMiddleware,
      campaignFormMiddleware,
      campaignMiddleware,
      campaignsListMiddleware,
      deleteCampaignModalMiddleware,
      trialCompleteModalMiddleware,
      appShellMiddleware,
      igFirstCommentProTrialModalMiddleware,
      hashtagGroupsMiddleware,
      trialMiddleware,
      segmentTrackingMiddleware,
      onboardingMiddleware,
      globalAccountMiddleware,
      closeComposerModalMiddleware,
      storiesMiddleware,
      temporaryBannerMiddleware,
      storyPreviewMiddleware,
      storyGroupComposerMiddleware,
      profileNavMiddleware,

      actionsOnlyForAnalyzeMiddleware('reveal'),
      // Dynamic middlware insertion point (for lazy-loaded components)
      reduxDynamicMiddlewares
    )
  );

export default composedMiddlewares;
