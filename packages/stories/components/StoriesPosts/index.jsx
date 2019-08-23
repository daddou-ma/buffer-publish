import React from 'react';
import PropTypes from 'prop-types';
import { WithFeatureLoader } from '@bufferapp/product-features';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import {
  QueueItems,
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
  onEditClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onComposerPlaceholderClick,
  hasFirstCommentFlip,
  isBusinessAccount,
  onShareNowClick,
  onCalendarClick,
  onCancelConfirmClick,
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
        <QueueItems
          items={storiesPosts}
          onCancelConfirmClick={onCancelConfirmClick}
          onCalendarClick={onCalendarClick}
          onDeleteClick={onDeleteClick}
          onDeleteConfirmClick={onDeleteConfirmClick}
          onEditClick={onEditClick}
          onEmptySlotClick={onEmptySlotClick}
          onShareNowClick={onShareNowClick}
          draggable={false}
          type="stories"
          hasFirstCommentFlip={hasFirstCommentFlip}
          isBusinessAccount={isBusinessAccount}
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
  ),
  showStoriesComposer: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  onEmptySlotClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onCalendarClick: PropTypes.func,
  onCancelConfirmClick: PropTypes.func,
  onComposerPlaceholderClick: PropTypes.func,
};

StoriesPosts.defaultProps = {
  page: 1,
  loading: true,
  editMode: false,
  moreToLoad: false,
  isLockedProfile: false,
  showStoriesComposer: false,
  hasFirstCommentFlip: false,
  isBusinessAccount: false,
  storiesPosts: [],
  onEditClick: () => {},
  onDeleteClick: () => {},
  onDeleteConfirmClick: () => {},
  onShareNowClick: () => {},
  onCalendarClick: () => {},
  onCancelConfirmClick: () => {},
  onComposerPlaceholderClick: () => {},
};

export default WithFeatureLoader(StoriesPosts);
