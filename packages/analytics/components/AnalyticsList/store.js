import store from '@bufferapp/publish-store';
import { addMiddleware } from 'redux-dynamic-middlewares';

// Analyze Middleware
import averageMiddleware from '@bufferapp/average-table/middleware';
import compareChartMiddleware from '@bufferapp/compare-chart/middleware';
import datePickerMiddleware from '@bufferapp/publish-analyze-date-picker/middleware';
import exportPickerMiddleware from '@bufferapp/analyze-export-picker/middleware';
import exportToCSVMiddleware from '@bufferapp/analyze-csv-export/middleware';
import exportToPNGMiddleware from '@bufferapp/analyze-png-export/middleware';
import postsMiddleware from '@bufferapp/posts-table/middleware';
// import profileLoaderMiddleware from '@bufferapp/profile-loader/middleware';
import profileSelectorMiddleware from '@bufferapp/analyze-profile-selector/middleware';
import summaryTableMiddleware from '@bufferapp/summary-table/middleware';

// Analyze Reducers
import averageReducer from '@bufferapp/average-table/reducer';
import compareChartReducer from '@bufferapp/compare-chart/reducer';
import datePickerReducer from '@bufferapp/publish-analyze-date-picker/reducer';
import exportPickerReducer from '@bufferapp/analyze-export-picker/reducer';
import exportToCSVReducer from '@bufferapp/analyze-csv-export/reducer';
import exportToPNGReducer from '@bufferapp/analyze-png-export/reducer';
import postsReducer from '@bufferapp/posts-table/reducer';
import profileReducer from '@bufferapp/analyze-profile-selector/reducer';
import reportListReducer from '@bufferapp/report-list/reducer';
import summaryTableReducer from '@bufferapp/summary-table/reducer';
import profileLoaderReducer from '@bufferapp/profile-loader/reducer';

store.injectReducers({
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
});

addMiddleware(
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
  exportPickerMiddleware
);
