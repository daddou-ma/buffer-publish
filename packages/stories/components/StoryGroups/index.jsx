import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import PreviewPopover from '@bufferapp/publish-story-preview';
import StoryGroupPopover from '@bufferapp/publish-story-group-composer';
import {
  QueueItems,
  BufferLoading,
  ComposerInput,
} from '@bufferapp/publish-shared-components';
import { CircleInstReminderIcon } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';

const ErrorBoundary = getErrorBoundary(true);

const ContainerStyle = styled.div`
  margin-right: 0.5rem;
`;

const TopBarContainerStyle = styled.div`
  display: flex;
`;

const LoadingContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 5rem;
`;

const ComposerInputStyle = styled.div`
  margin-bottom: 0.1rem;
  flex-grow: 1;
`;

const ReminderTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ReminderTextStyle = styled(Text)`
  margin-left: 0.5rem;
  font-size: 12px;
`;

const StoryGroups = ({
  loading,
  editMode,
  storyGroups,
  isLockedProfile,
  showStoriesComposer,
  onEmptySlotClick,
  onEditClick,
  onDeleteConfirmClick,
  onComposerPlaceholderClick,
  hasFirstCommentFlip,
  isBusinessAccount,
  onShareNowClick,
  onCalendarClick,
  onPreviewClick,
  onClosePreviewClick,
  showStoryPreview,
  userData,
  translations,
}) => {
  if (loading) {
    return (
      <LoadingContainerStyle>
        <BufferLoading size={64} />
      </LoadingContainerStyle>
    );
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  return (
    <ErrorBoundary>
      {showStoryPreview && (
        <PreviewPopover
          onCloseClick={onClosePreviewClick}
          view="queue"
        />
      )}
      <ContainerStyle>
        <TopBarContainerStyle>
          <ComposerInputStyle>
            {showStoriesComposer && !editMode && (
              <React.Fragment>
                <StoryGroupPopover />
              </React.Fragment>
            )}
            <ComposerInput
              placeholder={translations.inputPlaceholder}
              onPlaceholderClick={onComposerPlaceholderClick}
            />
          </ComposerInputStyle>
        </TopBarContainerStyle>
        {showStoriesComposer && editMode && (
          <React.Fragment>
            <StoryGroupPopover />
          </React.Fragment>
        )}
        <ReminderTextWrapper>
          <CircleInstReminderIcon color="instagram" />
          <ReminderTextStyle type="p">
            {translations.reminderText}
          </ReminderTextStyle>
        </ReminderTextWrapper>
        <QueueItems
          items={storyGroups}
          onCalendarClick={onCalendarClick}
          onDeleteConfirmClick={onDeleteConfirmClick}
          onEditClick={onEditClick}
          onEmptySlotClick={onEmptySlotClick}
          onShareNowClick={onShareNowClick}
          draggable={false}
          type="stories"
          hasFirstCommentFlip={hasFirstCommentFlip}
          isBusinessAccount={isBusinessAccount}
          onPreviewClick={onPreviewClick}
          userData={userData}
        />
      </ContainerStyle>
    </ErrorBoundary>
  );
};
StoryGroups.propTypes = {
  loading: PropTypes.bool,
  editMode: PropTypes.bool,
  isLockedProfile: PropTypes.bool,
  storyGroups: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ),
  showStoriesComposer: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  onEmptySlotClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onCalendarClick: PropTypes.func,
  onComposerPlaceholderClick: PropTypes.func,
  onPreviewClick: PropTypes.func,
  onClosePreviewClick: PropTypes.func,
  showStoryPreview: PropTypes.bool,
  userData: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
  }),
  translations: PropTypes.shape({
    inputPlaceholder: PropTypes.string.isRequired,
    reminderText: PropTypes.string.isRequired,
  }).isRequired,
};

StoryGroups.defaultProps = {
  loading: true,
  editMode: false,
  isLockedProfile: false,
  showStoriesComposer: false,
  hasFirstCommentFlip: false,
  isBusinessAccount: false,
  storyGroups: [],
  showStoryPreview: false,
  onEditClick: () => {},
  onDeleteConfirmClick: () => {},
  onShareNowClick: () => {},
  onCalendarClick: () => {},
  onComposerPlaceholderClick: () => {},
  onPreviewClick: () => {},
  onClosePreviewClick: () => {},
  userData: {},
};

export default WithFeatureLoader(StoryGroups);
