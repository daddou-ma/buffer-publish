import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as tabsReducer } from '@bufferapp/publish-tabs';
import { reducer as queueReducer } from '@bufferapp/publish-queue';
import { reducer as sentReducer } from '@bufferapp/publish-sent';
import { reducer as draftsReducer } from '@bufferapp/publish-drafts';
import { reducer as postingScheduleReducer } from '@bufferapp/publish-posting-schedule';
import { reducer as generalSettingsReducer } from '@bufferapp/publish-general-settings';
import { reducer as i18nReducer } from '@bufferapp/publish-i18n';
import { reducer as profileSidebarReducer } from '@bufferapp/publish-profile-sidebar';
import { reducer as appSidebarReducer } from '@bufferapp/app-sidebar';
import { reducer as productFeaturesReducer } from '@bufferapp/product-features';
import { reducer as asyncDataFetchReducer } from '@bufferapp/async-data-fetch';
import { reducer as notificationsReducer } from '@bufferapp/notifications';
import { reducer as environmentReducer } from '@bufferapp/environment';
import { reducer as appSwitcherReducer } from '@bufferapp/publish-app-switcher';
import { reducer as betaRedirectReducer } from '@bufferapp/publish-beta-redirect';
import { reducer as upgradeModalReducer } from '@bufferapp/publish-upgrade-modal';
import { reducer as stripeReducer } from '@bufferapp/stripe';
import { reducer as editEmailReducer } from '@bufferapp/edit-email';
import { reducer as modalsReducer } from '@bufferapp/publish-modals';
import { reducer as changePasswordReducer } from '@bufferapp/change-password';
import { reducer as manageAppsReducer } from '@bufferapp/manage-apps-extras';
import { reducer as twoFactorAuthReducer } from '@bufferapp/publish-two-factor-auth';
import { reducer as closeAccountReducer } from '@bufferapp/close-account';
// Remove analytics reducers when publish switches to Analyze
import { reducer as averageReducer } from '@bufferapp/average-table';
import { reducer as compareChartReducer } from '@bufferapp/compare-chart';
import { reducer as datePickerReducer } from '@bufferapp/analyze-date-picker';
import { reducer as exportPickerReducer } from '@bufferapp/analyze-export-picker';
import { reducer as exportToCSVReducer } from '@bufferapp/analyze-csv-export';
import { reducer as exportToPNGReducer } from '@bufferapp/analyze-png-export';
import { reducer as profileReducer } from '@bufferapp/analyze-profile-selector';
import { reducer as reportListReducer } from '@bufferapp/report-list';
import { reducer as summaryTableReducer } from '@bufferapp/summary-table';

export default combineReducers({
  form: formReducer,
  router: routerReducer,
  queue: queueReducer,
  sent: sentReducer,
  i18n: i18nReducer,
  tabs: tabsReducer,
  profileSidebar: profileSidebarReducer,
  appSidebar: appSidebarReducer,
  asyncDataFetch: asyncDataFetchReducer,
  notifications: notificationsReducer,
  environment: environmentReducer,
  appSwitcher: appSwitcherReducer,
  betaRedirect: betaRedirectReducer,
  upgradeModal: upgradeModalReducer,
  stripe: stripeReducer,
  editEmail: editEmailReducer,
  modals: modalsReducer,
  changePassword: changePasswordReducer,
  manageAppsExtras: manageAppsReducer,
  twoFactorAuth: twoFactorAuthReducer,
  closeAccount: closeAccountReducer,
  productFeatures: productFeaturesReducer,
  drafts: draftsReducer,
  generalSettings: generalSettingsReducer,
  postingSchedule: postingScheduleReducer,
  average: averageReducer,
  compare: compareChartReducer,
  date: datePickerReducer,
  exportPicker: exportPickerReducer,
  exportToPNG: exportToPNGReducer,
  exportToCSV: exportToCSVReducer,
  profiles: profileReducer,
  reportList: reportListReducer,
  summary: summaryTableReducer,
});
