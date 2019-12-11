import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import PreviewPopover from '@bufferapp/publish-story-preview';
import StoryGroupPopover from '@bufferapp/publish-story-group-composer';
import { blue } from '@bufferapp/ui/style/colors';
import {
  QueueItems,
  BufferLoading,
  ComposerInput,
} from '@bufferapp/publish-shared-components';
import { CircleInstReminderIcon } from '@bufferapp/components';
import WarningIcon from '@bufferapp/ui/Icon/Icons/Warning';
import { Text } from '@bufferapp/ui';
import StoriesExplanation from '../StoriesExplanation';

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

const StyledLink = styled.a`
  color: ${blue};
  text-decoration: none;
`;

/* this color red https://bufferapp.github.io/ui/#/ui/Guides/colors isn't the same
red as the @bufferapp/ui/style/colors */
const StyledWarningIcon = styled(WarningIcon)`
  fill: #e0364f;
`;

const getReminderMessage = ({
  reminderText1,
  reminderLinkText2,
  reminderText3,
}) => (
  <span>
    {reminderText1}
    <StyledLink
      href="https://faq.buffer.com/article/1106-publish-instagram-stories-scheduling"
      target="_blank"
    >
      {reminderLinkText2}
    </StyledLink>
    {reminderText3}
  </span>
);

const renderNotification = ({ IconComponent, message }) => (
  <ReminderTextWrapper>
    {IconComponent}
    <ReminderTextStyle type="p">{message}</ReminderTextStyle>
  </ReminderTextWrapper>
);

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
  hasPushNotifications,
  onSetRemindersClick,
  serviceId,
  translations,
}) => {
  const hasStoriesMobileVersion = userData.tags
    ? userData.tags.includes('has_instagram_stories_mobile')
    : false;

  if (!hasPushNotifications) {
    return (
      <StoriesExplanation
        translations={translations}
        onSetRemindersClick={onSetRemindersClick}
      />
    );
  }

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
        <PreviewPopover onCloseClick={onClosePreviewClick} view="queue" />
      )}
      <ContainerStyle>
        <TopBarContainerStyle>
          <ComposerInputStyle>
            {showStoriesComposer && !editMode && (
              <React.Fragment>
                <StoryGroupPopover type="stories" />
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
            <StoryGroupPopover type="stories" />
          </React.Fragment>
        )}
        {hasStoriesMobileVersion
          ? renderNotification({
              IconComponent: <CircleInstReminderIcon color="instagram" />,
              message: getReminderMessage(translations),
            })
          : renderNotification({
              IconComponent: <StyledWarningIcon />,
              message: translations.mobileTagText,
            })}
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
          serviceId={serviceId}
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
    })
  ),
  showStoriesComposer: PropTypes.bool,
  hasPushNotifications: PropTypes.bool,
  onSetRemindersClick: PropTypes.func.isRequired,
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
  serviceId: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  translations: PropTypes.shape({
    inputPlaceholder: PropTypes.string.isRequired,
    mobileTagText: PropTypes.string,
    reminderText: PropTypes.string,
    composerInputText: PropTypes.string,
  }).isRequired,
};

StoryGroups.defaultProps = {
  loading: true,
  editMode: false,
  hasPushNotifications: true,
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
