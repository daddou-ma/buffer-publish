import React from 'react';
import PropTypes from 'prop-types';
import { PostLists } from '@bufferapp/publish-shared-components';
import PreviewPopover from '@bufferapp/publish-story-preview';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import StoryGroupPopover from '@bufferapp/publish-story-group-composer';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import {
  Loading,
  ComposerStyle,
  EmptyStateStyled,
  TopBarContainerStyle,
} from '../PastRemindersWrapper/style';

const ErrorBoundary = getErrorBoundary(true);

const Composer = ({ showComposer, showStoriesComposer, onSave }) => {
  if (showComposer) {
    return <ComposerPopover onSave={onSave} type="pastReminders" />;
  }

  if (showStoriesComposer) {
    return <StoryGroupPopover type="pastReminders" />;
  }
};

const ComposerWrapper = ({
  editMode,
  showComposer,
  showStoriesComposer,
  onComposerCreateSuccess,
}) => (
  <React.Fragment>
    {(showComposer || showStoriesComposer) && !editMode && (
      <TopBarContainerStyle>
        <ComposerStyle>
          <Composer
            showComposer={showComposer}
            showStoriesComposer={showStoriesComposer}
            onSave={onComposerCreateSuccess}
          />
        </ComposerStyle>
      </TopBarContainerStyle>
    )}
    {(showComposer || showStoriesComposer) && editMode && (
      <Composer
        showComposer={showComposer}
        showStoriesComposer={showStoriesComposer}
        onSave={onComposerCreateSuccess}
      />
    )}
  </React.Fragment>
);

ComposerWrapper.propTypes = {
  editMode: PropTypes.bool,
  showComposer: PropTypes.bool,
  showStoriesComposer: PropTypes.bool,
  onComposerCreateSuccess: PropTypes.func,
};

ComposerWrapper.defaultProps = {
  editMode: false,
  showComposer: false,
  showStoriesComposer: false,
  onComposerCreateSuccess: () => {},
};

const PastRemindersPosts = ({
  total,
  loading,
  userData,
  viewType,
  postLists,
  onEditClick,
  onShareAgainClick,
  onMobileClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onComposerCreateSuccess,
  showComposer,
  editMode,
  isManager,
  isBusinessAccount,
  onPreviewClick,
  showStoryPreview,
  showStoriesComposer,
  onClosePreviewClick,
}) => {
  if (loading) {
    return <Loading />;
  }

  if (total < 1) {
    return <EmptyStateStyled />;
  }

  return (
    <ErrorBoundary>
      {showStoryPreview && (
        <PreviewPopover onCloseClick={onClosePreviewClick} view="queue" />
      )}
      <React.Fragment>
        <ComposerWrapper
          editMode={editMode}
          showComposer={showComposer}
          showStoriesComposer={showStoriesComposer}
          onComposerCreateSuccess={onComposerCreateSuccess}
        />

        <PostLists
          postLists={postLists}
          onEditClick={onEditClick}
          onShareAgainClick={post => onShareAgainClick(post, viewType)}
          onMobileClick={post => onMobileClick(post, viewType)}
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

PastRemindersPosts.propTypes = {
  loading: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      listHeader: PropTypes.string,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
    })
  ),
  total: PropTypes.number,
  showComposer: PropTypes.bool,
  editMode: PropTypes.bool,
  showStoriesComposer: PropTypes.bool,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onEditClick: PropTypes.func,
  onShareAgainClick: PropTypes.func,
  onMobileClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onPreviewClick: PropTypes.func,
  onClosePreviewClick: PropTypes.func,
  viewType: PropTypes.string,
  isManager: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  showStoryPreview: PropTypes.bool,
  userData: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

PastRemindersPosts.defaultProps = {
  loading: true,
  moreToLoad: false,
  page: 1,
  postLists: [],
  total: 0,
  showComposer: false,
  showStoriesComposer: false,
  editMode: false,
  isManager: true,
  isBusinessAccount: false,
  showStoryPreview: false,
  viewType: 'posts',
  userData: {},
  onEditClick: () => {},
  onShareAgainClick: () => {},
  onMobileClick: () => {},
  onImageClick: () => {},
  onImageClickNext: () => {},
  onImageClickPrev: () => {},
  onImageClose: () => {},
  onPreviewClick: () => {},
  onClosePreviewClick: () => {},
};

export default PastRemindersPosts;
