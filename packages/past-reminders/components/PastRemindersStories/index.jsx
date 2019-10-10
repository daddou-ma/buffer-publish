import React from 'react';
import PropTypes from 'prop-types';
import {
  PostLists,
} from '@bufferapp/publish-shared-components';
import StoryGroupPopover from '@bufferapp/publish-story-group-composer';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import PreviewPopover from '@bufferapp/publish-story-preview';
import {
  Loading,
  ComposerStyle,
  EmptyStateStyled,
  TopBarContainerStyle,
} from '../PastRemindersWrapper/style';

const ErrorBoundary = getErrorBoundary(true);

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
  userData,
  onPreviewClick,
  showStoryPreview,
  onClosePreviewClick,
}) => {
  if (loading) {
    return (
      <Loading />
    );
  }

  if (total < 1) {
    return (
      <EmptyStateStyled />
    );
  }

  return (
    <ErrorBoundary>
      {showStoryPreview && (
        <PreviewPopover
          onCloseClick={onClosePreviewClick}
          view="queue"
        />
      )}
      <React.Fragment>
        <TopBarContainerStyle>
          {showStoriesComposer && !editMode
            && (
              <ComposerStyle>
                <StoryGroupPopover
                  type="pastReminders"
                />
              </ComposerStyle>
            )}
        </TopBarContainerStyle>
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
          userData={userData}
          onPreviewClick={onPreviewClick}
        />
      </React.Fragment>
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
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onStoryGroupMobileClick: PropTypes.func,
  onPreviewClick: PropTypes.func,
  onClosePreviewClick: PropTypes.func,
  isManager: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  showStoryPreview: PropTypes.bool,
  userData: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
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
  showStoryPreview: false,
  userData: {},
  onEditClick: () => {},
  onShareStoryGroupAgain: () => {},
  onImageClick: () => {},
  onImageClickNext: () => {},
  onImageClickPrev: () => {},
  onImageClose: () => {},
  onStoryGroupMobileClick: () => {},
  onPreviewClick: () => {},
  onClosePreviewClick: () => {},
};

export default PastRemindersStories;
