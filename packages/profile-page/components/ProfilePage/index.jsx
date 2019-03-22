import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';

import QueuedPosts from '@bufferapp/publish-queue';
import SentPosts from '@bufferapp/publish-sent';
import PastReminders from '@bufferapp/publish-past-reminders';
import DraftList from '@bufferapp/publish-drafts';
import PostingSchedule from '@bufferapp/publish-posting-schedule';
import GeneralSettings from '@bufferapp/publish-general-settings';
import TabNavigation from '@bufferapp/publish-tabs';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';
import Analytics from '@bufferapp/publish-analytics';
import { ScrollableContainer } from '@bufferapp/publish-shared-components';
import { LoadingAnimation } from '@bufferapp/components';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';

const ErrorBoundary = getErrorBoundary(true);

const profilePageStyle = {
  display: 'flex',
  flexGrow: 1,
};

const profileSideBarStyle = {
  flexBasis: '16rem',
  width: '16rem',
  minWidth: '16rem',
  position: 'sticky',
  bottom: 0,
  top: 0,
  height: '100%',
  maxHeight: '100vh',
};

const contentStyle = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '0.5rem',
  marginRight: '1rem',
  minHeight: '100%',
};

const loadingAnimationStyle = {
  textAlign: 'center',
};

const tabContentStyle = {
  maxWidth: '864px',
};

const TabContent = ({ tabId, profileId, childTabId }) => {
  switch (tabId) {
    case 'queue':
      return (
        <QueuedPosts profileId={profileId} />
      );
    case 'pastReminders':
      return (
        <PastReminders
          profileId={profileId}
        />
      );
    case 'drafts':
    case 'awaitingApproval':
    case 'pendingApproval':
      return (
        <DraftList
          profileId={profileId}
          tabId={tabId}
        />
      );
    case 'analytics':
      switch (childTabId) {
        case 'overview':
          return (
            <Analytics />
          );
        case 'posts':
        default:
          return (
            <SentPosts
              profileId={profileId}
            />
          );
      }
    case 'settings':
      switch (childTabId) {
        case 'posting-schedule':
          return (
            <PostingSchedule
              profileId={profileId}
              childTabId={childTabId}
            />
          );
        case 'general-settings':
        default:
          return (
            <ErrorBoundary>
              <GeneralSettings
                profileId={profileId}
                childTabId={childTabId}
              />
            </ErrorBoundary>
          );
      }
    default:
      return (
        <Redirect to="/" />
      );
  }
};

TabContent.propTypes = {
  tabId: PropTypes.string,
  childTabId: PropTypes.string,
  profileId: PropTypes.string.isRequired,
};

TabContent.defaultProps = {
  tabId: '',
  childTabId: '',
};

const ProfilePage = ({
  match: {
    params: {
      profileId,
      tabId,
      childTabId,
    },
  },
  onLoadMore,
  loadingMore,
  moreToLoad,
  page,
}) => {
  const isPostsTab = ['queue', 'drafts', 'awaitingApproval', 'pendingApproval', 'pastReminders'].includes(tabId);
  const handleScroll = (o) => {
    const reachedBottom = o.scrollHeight - o.scrollTop === o.clientHeight;
    if (reachedBottom && moreToLoad && isPostsTab && !loadingMore) {
      onLoadMore({ profileId, page, tabId });
    }
  };
  return (
    <div style={profilePageStyle}>
      <div style={profileSideBarStyle}>
        <ProfileSidebar
          profileId={profileId}
          tabId={tabId}
        />
      </div>
      <div style={contentStyle} onScroll={e => handleScroll(e.target)}>
        <TabNavigation
          profileId={profileId}
          tabId={tabId}
          childTabId={childTabId}
        />
        <ScrollableContainer
          tabId={tabId}
          growthSpace={1}
        >
          <div style={tabContentStyle}>
            <TabContent
              tabId={tabId}
              profileId={profileId}
              childTabId={childTabId}
            />
            {loadingMore &&
              <div style={loadingAnimationStyle}>
                <LoadingAnimation marginTop={'1rem'} />
              </div>
            }
          </div>
        </ScrollableContainer>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tabId: PropTypes.string,
      profileId: PropTypes.string,
      childTabId: PropTypes.string,
    }),
  }).isRequired,
  onLoadMore: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  moreToLoad: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

ProfilePage.defaultProps = {
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  posts: [],
  total: 0,
};

export default ProfilePage;
