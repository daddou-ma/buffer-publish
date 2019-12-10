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
import profileSidebarMiddleware from '@bufferapp/publish-profile-sidebar/middleware';
import clientAccessMiddleware from '@bufferapp/client-access/middleware';
import bootstrapMiddleware from '@bufferapp/publish-bootstrap/middleware';
import userMiddleware from '@bufferapp/publish-data-user/middleware';
import profilesMiddleware from '@bufferapp/publish-data-profiles/middleware';
import productFeatureMiddleware from '@bufferapp/product-features/middleware';
import i18nMiddleware from '@bufferapp/publish-i18n/middleware';
import asyncDataFetchMiddleware from '@bufferapp/async-data-fetch/lib/middleware';
import pusherSyncMiddleware from '@bufferapp/publish-pusher-sync/middleware';
import notificationsMiddleware from '@bufferapp/notifications/lib/middleware';
import environmentMiddleware from '@bufferapp/environment/lib/middleware';
import unauthorizedRedirectMiddleware from '@bufferapp/unauthorized-redirect/middleware';
import initialLoadingMiddleware from '@bufferapp/publish-initial-loading/middleware';
import switchPlanModalMiddleware from '@bufferapp/publish-switch-plan-modal/middleware';
import stripeMiddleware from '@bufferapp/stripe/middleware';
import modalsMiddleware from '@bufferapp/publish-modals/middleware';
import manageAppsMiddleware from '@bufferapp/manage-apps-extras/middleware';
import twoFactorAuthMiddleware from '@bufferapp/publish-two-factor-auth/middleware';
import dateTimePreferencesMiddleware from '@bufferapp/date-time-preferences/middleware';
import maintenanceRedirectMiddleware from '@bufferapp/maintenance-redirect/middleware';
import defaultPageMiddleware from '@bufferapp/default-page/middleware';
import instagramDirectPostingModalMiddleware from '@bufferapp/publish-ig-direct-posting-modal/middleware';
import notificationsProviderMiddleware from '@bufferapp/publish-notifications-provider/middleware';
import profilesDisconnectedModalMiddleware from '@bufferapp/publish-profiles-disconnected-modal/middleware';
import accountNotificationsMiddleware from '@bufferapp/publish-account-notifications/middleware';
import publishCTABannerMiddleware from '@bufferapp/publish-cta-banner/middleware';
import thirdpartyMiddleware from '@bufferapp/publish-thirdparty/middleware';
import bookmarkletsMiddleware from '@bufferapp/publish-bookmarklets/middleware';
import trialCompleteModalMiddleware from '@bufferapp/publish-trial-complete-modal/middleware';
import tabsMiddleware from '@bufferapp/publish-tabs/middleware';
import appShellMiddleware from '@bufferapp/publish-app-shell/middleware';
import igFirstCommentProTrialModalMiddleware from '@bufferapp/publish-ig-first-comment-pro-trial-modal/middleware';
import hashtagGroupsMiddleware from '@bufferapp/publish-hashtag-group-manager/middleware';
import trialMiddleware from '@bufferapp/publish-trial/middleware';
import segmentTrackingMiddleware from '@bufferapp/publish-analytics-middleware/middleware';
import onboardingMiddleware from '@bufferapp/publish-onboarding/middleware';
import globalAccountMiddleware from '@bufferapp/global-account/middleware';
import closeComposerModalMiddleware from '@bufferapp/publish-close-composer-confirmation-modal/middleware';
import storyPreviewMiddleware from '@bufferapp/publish-story-preview/middleware';
import storyGroupComposerMiddleware from '@bufferapp/publish-story-group-composer/middleware';

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
      profilesMiddleware,
      productFeatureMiddleware,
      queueMiddleware,
      sentMiddleware,
      gridMiddleware,
      pastRemindersMiddleware,
      postingScheduleSettingsMiddleware,
      generalSettingsMiddleware,
      pusherSyncMiddleware,
      notificationsMiddleware,
      environmentMiddleware,
      unauthorizedRedirectMiddleware,
      appSwitcherMiddleware,
      initialLoadingMiddleware,
      switchPlanModalMiddleware,
      manageAppsMiddleware,
      stripeMiddleware,
      modalsMiddleware,
      twoFactorAuthMiddleware,
      dateTimePreferencesMiddleware,
      defaultPageMiddleware,
      instagramDirectPostingModalMiddleware,
      maintenanceRedirectMiddleware,
      draftsMiddleware,
      notificationsProviderMiddleware,
      profilesDisconnectedModalMiddleware,
      accountNotificationsMiddleware,
      publishCTABannerMiddleware,
      bookmarkletsMiddleware,
      thirdpartyMiddleware,
      trialCompleteModalMiddleware,
      tabsMiddleware,
      appShellMiddleware,
      igFirstCommentProTrialModalMiddleware,
      hashtagGroupsMiddleware,
      trialMiddleware,
      segmentTrackingMiddleware,
      onboardingMiddleware,
      globalAccountMiddleware,
      closeComposerModalMiddleware,
      storiesMiddleware,
      storyPreviewMiddleware,
      storyGroupComposerMiddleware,

      actionsOnlyForAnalyzeMiddleware('reveal'),
      // Dynamic middlware insertion point (for lazy-loaded components)
      reduxDynamicMiddlewares
    )
  );

export default composedMiddlewares;
