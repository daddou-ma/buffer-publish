// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { getProfilePageParams } from '@bufferapp/publish-routes';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import ProfilePage from './components/ProfilePage';

// default export = container
export default hot(module)(connect(
  (state, ownProps) => {
    const { tabId, profileId, childTabId } =
      getProfilePageParams({ path: ownProps.history.location.pathname }) || {};
    // With analytics, the reducer state name doesnt match the tabId
    const reducerName = (tabId === 'analytics' && (!childTabId || childTabId === 'posts')) ?
      'sent' : tabId;
    if (state[reducerName] && state[reducerName].byProfileId && state[reducerName].byProfileId[profileId]) {
      return ({
        loading: state[reducerName].byProfileId[profileId].loading,
        loadingMore: state[reducerName].byProfileId[profileId].loadingMore,
        moreToLoad: state[reducerName].byProfileId[profileId].moreToLoad,
        page: state[reducerName].byProfileId[profileId].page,
        posts: state[reducerName].byProfileId[profileId].posts,
        total: state[reducerName].byProfileId[profileId].total,
        translations: state.i18n.translations.example,
        view: state[reducerName].byProfileId[profileId].tabId || null,
        isBusinessAccount: state.profileSidebar.selectedProfile.business,
      });
    }
    return {};
  },
  dispatch => ({
    onLoadMore: ({ profileId, page, tabId }) => {
      let requestName;
      switch (tabId) {
        case 'queue':
          requestName = 'queued';
          break;
        case 'drafts':
        case 'awaitingApproval':
        case 'pendingApproval':
          requestName = 'draft';
          break;
        case 'analytics':
          requestName = 'sent';
          break;
        case 'pastReminders':
          requestName = 'pastReminders';
          break;
        default:
          requestName = 'queued';
      }
      dispatch(
        dataFetchActions.fetch({
          name: `${requestName}Posts`,
          args: {
            profileId,
            page,
            isFetchingMore: true,
          },
        }),
      );
    },
  }),
)(ProfilePage));
