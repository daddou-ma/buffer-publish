import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory as createHistory } from 'history';
import {
  logTrackingMiddleware,
  bufferMetricsMiddleware,
} from '@bufferapp/publish-data-tracking';
import { middleware as queueMiddleware } from '@bufferapp/publish-queue';
import { middleware as sentMiddleware } from '@bufferapp/publish-sent';
import { middleware as gridMiddleware } from '@bufferapp/publish-grid';
import { middleware as pastRemindersMiddleware } from '@bufferapp/publish-past-reminders';
import { middleware as draftsMiddleware } from '@bufferapp/publish-drafts';
import { middleware as postingScheduleSettingsMiddleware } from '@bufferapp/publish-posting-schedule';
import { middleware as generalSettingsMiddleware } from '@bufferapp/publish-general-settings';
import { middleware as profileSidebarMiddleware } from '@bufferapp/publish-profile-sidebar';
import { middleware as clientAccessMiddleware } from '@bufferapp/client-access';
import { middleware as appSidebarMiddleware } from '@bufferapp/app-sidebar';
import { middleware as productFeatureMiddleware } from '@bufferapp/product-features';
import { middleware as i18nMiddleware } from '@bufferapp/publish-i18n';
import { middleware as asyncDataFetchMiddleware } from '@bufferapp/async-data-fetch';
import { middleware as pusherSyncMiddleware } from '@bufferapp/publish-pusher-sync';
import { middleware as notificationsMiddleware } from '@bufferapp/notifications';
import { middleware as environmentMiddleware } from '@bufferapp/environment';
import { middleware as unauthorizedRedirectMiddleware } from '@bufferapp/unauthorized-redirect';
import { middleware as appSwitcherMiddleware } from '@bufferapp/publish-app-switcher';
import { middleware as betaRedirectMiddleware } from '@bufferapp/publish-beta-redirect';
import { middleware as upgradeModalMiddleware } from '@bufferapp/publish-upgrade-modal';
import { middleware as editEmailMiddlware } from '@bufferapp/edit-email';
import { middleware as stripeMiddleware } from '@bufferapp/stripe';
import { middleware as modalsMiddleware } from '@bufferapp/publish-modals';
import { middleware as manageAppsMiddleware } from '@bufferapp/manage-apps-extras';
import { middleware as twoFactorAuthMiddleware } from '@bufferapp/publish-two-factor-auth';
import { middleware as dateTimePreferencesMiddleware } from '@bufferapp/date-time-preferences';
import { middleware as closeAccountMiddleware } from '@bufferapp/close-account';
import { middleware as maintenanceRedirectMiddleware } from '@bufferapp/maintenance-redirect';
import { middleware as defaultPageMiddleware } from '@bufferapp/default-page';
import { middleware as instagramDirectPostingModalMiddleware } from '@bufferapp/publish-ig-direct-posting-modal';
import { middleware as notificationsProviderMiddleware } from '@bufferapp/publish-notifications-provider';
import { middleware as profilesDisconnectedModalMiddleware } from '@bufferapp/publish-profiles-disconnected-modal';
import { middleware as accountNotificationsMiddleware } from '@bufferapp/publish-account-notifications';
import { middleware as publishCTABannerMiddleware } from '@bufferapp/publish-cta-banner';
import { middleware as thirdpartyMiddleware } from '@bufferapp/publish-thirdparty';
import performanceMiddleware from '@bufferapp/performance-tracking/middleware';
import { middleware as bookmarkletsMiddleware } from '@bufferapp/publish-bookmarklets';
import { middleware as b4bTrialCompleteModalMiddleware } from '@bufferapp/publish-b4b-trial-complete-modal';

// Remove analytics middleware when publish switches to analyze
import { middleware as averageMiddleware } from '@bufferapp/average-table';
import { middleware as compareChartMiddleware } from '@bufferapp/compare-chart';
import { middleware as datePickerMiddleware } from '@bufferapp/analyze-date-picker';
import { middleware as exportPickerMiddleware } from '@bufferapp/analyze-export-picker';
import { middleware as exportToCSVMiddleware } from '@bufferapp/analyze-csv-export';
import { middleware as exportToPNGMiddleware } from '@bufferapp/analyze-png-export';
import { middleware as postsMiddleware } from '@bufferapp/posts-table';
import { middleware as profileSelectorMiddleware } from '@bufferapp/analyze-profile-selector';
import { middleware as summaryTableMiddleware } from '@bufferapp/summary-table';

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
        performanceMiddleware,
        appSidebarMiddleware,
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
        upgradeModalMiddleware,
        manageAppsMiddleware,
        stripeMiddleware,
        modalsMiddleware,
        editEmailMiddlware,
        twoFactorAuthMiddleware,
        dateTimePreferencesMiddleware,
        closeAccountMiddleware,
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
        b4bTrialCompleteModalMiddleware,
        // Analyze
        averageMiddleware,
        compareChartMiddleware,
        datePickerMiddleware,
        postsMiddleware,
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
