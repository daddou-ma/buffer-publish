import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { WithFeatureLoader } from '@bufferapp/product-features';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import {
  PostEmptySlot,
  BufferLoading,
  ComposerInput,
} from '@bufferapp/publish-shared-components';

const ErrorBoundary = getErrorBoundary(true);

const composerStyle = {
  marginBottom: '1.5rem',
  flexGrow: '1',
};

const topBarContainerStyle = {
  display: 'flex',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const containerStyle = {
  marginRight: '0.5rem',
};

const StoriesPosts = ({
  loading,
  editMode,
  storiesPosts,
  isLockedProfile,
  showStoriesComposer,
  onEmptySlotClick,
  onComposerPlaceholderClick,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
      </div>
    );
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  return (
    <ErrorBoundary>
      <div className={containerStyle}>
        <div style={topBarContainerStyle}>
          <div style={composerStyle}>
            {showStoriesComposer && !editMode && (
              <div>New composer!</div>
            )}
            <ComposerInput
              placeholder="What would you like to add to your Story?"
              onPlaceholderClick={onComposerPlaceholderClick}
            />
          </div>
        </div>
        {showStoriesComposer && editMode && (
          <div>New composer!</div>
        )}
        {storiesPosts.length > 0 && (
          <div>Story Groups listed here</div>
        )}
        <PostEmptySlot
          time="Story"
          service="noProfile"
          onClick={() => {}}
        />
      </div>
    </ErrorBoundary>
  );
};
StoriesPosts.propTypes = {
  loading: PropTypes.bool,
  editMode: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  isLockedProfile: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  storiesPosts: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ).isRequired,
  showStoriesComposer: PropTypes.bool,
  onEmptySlotClick: PropTypes.func.isRequired,
  onComposerPlaceholderClick: PropTypes.func,
};

StoriesPosts.defaultProps = {
  page: 1,
  loading: true,
  editMode: false,
  moreToLoad: false,
  isLockedProfile: false,
  showStoriesComposer: false,
  onComposerPlaceholderClick: () => {},
};

export default WithFeatureLoader(StoriesPosts);
