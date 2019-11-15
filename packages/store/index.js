import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory as createHistory } from 'history';
import {
  logTrackingMiddleware,
  bufferMetricsMiddleware,
} from '@bufferapp/publish-data-tracking';

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
import productFeatureMiddleware from '@bufferapp/product-features/middleware';
import i18nMiddleware from '@bufferapp/publish-i18n/middleware';
import asyncDataFetchMiddleware from '@bufferapp/async-data-fetch/lib/middleware';
import pusherSyncMiddleware from '@bufferapp/publish-pusher-sync/middleware';
import notificationsMiddleware from '@bufferapp/notifications/lib/middleware';
import environmentMiddleware from '@bufferapp/environment/lib/middleware';
import unauthorizedRedirectMiddleware from '@bufferapp/unauthorized-redirect/middleware';
import appSwitcherMiddleware from '@bufferapp/publish-app-switcher/middleware';
import betaRedirectMiddleware from '@bufferapp/publish-beta-redirect/middleware';
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

// Remove analytics middleware when publish switches to analyze
import averageMiddleware from '@bufferapp/average-table/middleware';
import compareChartMiddleware from '@bufferapp/compare-chart/middleware';
import datePickerMiddleware from '@bufferapp/analyze-date-picker/middleware';
import exportPickerMiddleware from '@bufferapp/analyze-export-picker/middleware';
import exportToCSVMiddleware from '@bufferapp/analyze-csv-export/middleware';
import exportToPNGMiddleware from '@bufferapp/analyze-png-export/middleware';
import postsMiddleware from '@bufferapp/posts-table/middleware';
// import profileLoaderMiddleware from '@bufferapp/profile-loader/middleware';
import profileSelectorMiddleware from '@bufferapp/analyze-profile-selector/middleware';
import summaryTableMiddleware from '@bufferapp/summary-table/middleware';

import reducers from './reducers';

export const history = createHistory();

const createReducer = () =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

const configureStore = initialstate => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return createStore(
    createReducer(),
    initialstate,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        asyncDataFetchMiddleware,
        logTrackingMiddleware,
        bufferMetricsMiddleware,
        i18nMiddleware,
        profileSidebarMiddleware,
        clientAccessMiddleware,
        bootstrapMiddleware,
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
        betaRedirectMiddleware,
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
        // Analyze
        averageMiddleware,
        compareChartMiddleware,
        datePickerMiddleware,
        postsMiddleware,
        // Removing the Analyze profile loader middleware as it was causing a double load to occur
        // profileLoaderMiddleware,
        profileSelectorMiddleware,
        summaryTableMiddleware,
        // These need to be the last middlewares in the chain
        exportToPNGMiddleware,
        exportToCSVMiddleware,
        exportPickerMiddleware,
      ),
    ),
  );
};

export default configureStore;
