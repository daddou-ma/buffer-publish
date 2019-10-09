import React from 'react';
import PropTypes from 'prop-types';
import {
  PostLists,
  EmptyState,
} from '@bufferapp/publish-shared-components';
import {
  LoadingAnimation,
} from '@bufferapp/components';
import StoryGroupPopover from '@bufferapp/publish-story-group-composer';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';

const ErrorBoundary = getErrorBoundary(true);

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const topBarContainerStyle = {
  display: 'flex',
};

const composerStyle = {
  flexGrow: '1',
};

const PastRemindersStories = ({
  total,
  loading,
  postLists,
  onEditClick,
  onShareStoryGroupAgain,
  onStoryGroupMobileClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  showStoriesComposer,
  editMode,
  isManager,
  isBusinessAccount,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <LoadingAnimation />
      </div>
    );
  }

  if (total < 1) {
    return (
      <EmptyState
        title="You haven’t published any posts with this account in the past 30 days!"
        subtitle="Once a post has gone live via Buffer, you can track its performance here to learn what works best with your audience!"
        heroImg="https://s3.amazonaws.com/buffer-publish/images/empty-sent2x.png"
        heroImgSize={{ width: '270px', height: '150px' }}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div>
        <div style={topBarContainerStyle}>
          {showStoriesComposer && !editMode
            && (
              <div style={composerStyle}>
                <StoryGroupPopover
                  type="pastReminders"
                />
              </div>
            )}
        </div>
        {showStoriesComposer && editMode
          && (
            <StoryGroupPopover
              type="pastReminders"
            />
          )}
        <PostLists
          postLists={postLists}
          onEditClick={onEditClick}
          onShareAgainClick={onShareStoryGroupAgain}
          onMobileClick={onStoryGroupMobileClick}
          onImageClick={onImageClick}
          onImageClickNext={onImageClickNext}
          onImageClickPrev={onImageClickPrev}
          onImageClose={onImageClose}
          isManager={isManager}
          isBusinessAccount={isBusinessAccount}
          isSent={false}
          isPastReminder
        />
      </div>
    </ErrorBoundary>
  );
};

PastRemindersStories.propTypes = {
  loading: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      listHeader: PropTypes.string,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        }),
      ),
    }),
  ),
  total: PropTypes.number,
  showStoriesComposer: PropTypes.bool,
  editMode: PropTypes.bool,
  onEditClick: PropTypes.func,
  onShareStoryGroupAgain: PropTypes.func,
  onMobileClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  isManager: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
};

PastRemindersStories.defaultProps = {
  loading: true,
  moreToLoad: false,
  page: 1,
  postLists: [],
  total: 0,
  showStoriesComposer: false,
  editMode: false,
  isManager: true,
  isBusinessAccount: false,
  onEditClick: () => {},
  onShareStoryGroupAgain: () => {},
  onMobileClick: () => {},
  onImageClick: () => {},
  onImageClickNext: () => {},
  onImageClickPrev: () => {},
  onImageClose: () => {},
};

export default PastRemindersStories;
