import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Select as UISelect } from '@bufferapp/ui';
import { isInThePast } from '@bufferapp/publish-server/formatters/src';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import { getReadableDateFormat, getMomentTime } from '../../utils/AddStory';
import {
  storyGroupPropTypes,
  translationsPropTypes,
  selectedProfilePropTypes,
} from '../../utils/commonPropTypes';
import {
  FooterBar,
  ButtonStyle,
  EditStoryStyle,
  EditTextStyle,
  EditDateStyle,
  StyledEditButton,
} from './style';

class Select extends UISelect {
  handleSelectOption = (option, event) => {
    this.props.onSelectClick(option, event);
    this.setState({
      isOpen: false,
    });
  };
}

const getInitialDateTime = ({
  editMode,
  sentPost,
  scheduledAt,
  emptySlotData,
  timezone,
}) => {
  if ((editMode && !sentPost) || emptySlotData) {
    const timestamp = editMode ? scheduledAt : emptySlotData.scheduledAt;
    return getMomentTime({ scheduledAt: timestamp, timezone });
  }

  return null;
};

const getIsScheduleDisabled = ({
  editMode,
  storiesLength,
  uploadsCompleted,
  isScheduleLoading,
  isScheduledAtPastDue,
}) =>
  storiesLength < 1 ||
  !uploadsCompleted ||
  isScheduleLoading ||
  (!editMode && isScheduledAtPastDue);

const AddStoryFooter = ({
  timezone,
  weekStartsMonday,
  uses24hTime,
  isScheduleLoading,
  translations,
  storyGroup,
  onUpdateStoryGroup,
  onCreateStoryGroup,
  onPreviewClick,
  editMode,
  emptySlotData,
  selectedProfile,
  isPastDue,
  sentPost,
}) => {
  const [scheduledAt, setScheduledAt] = useState(
    storyGroup && !sentPost ? storyGroup.scheduledAt : null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [forceDatePickerSubmit, setForceDatePickerSubmit] = useState(false);

  /* this covers the case if a story group has a share failure and a user edits it
   without updating the scheduled_at. Now the schedule button will be disabled until
   date is updated. */
  const isScheduledAtPastDue = isPastDue && isInThePast(scheduledAt);

  const storiesLength = storyGroup.stories.length;
  const uploadsCompleted =
    storyGroup.stories.filter(card => card.processing || card.uploading)
      .length === 0;
  const isScheduleDisabled = getIsScheduleDisabled({
    storiesLength,
    uploadsCompleted,
    isScheduleLoading,
    isScheduledAtPastDue,
    editMode,
  });
  const isPreviewDisabled = storiesLength < 1 || !uploadsCompleted;

  const { stories, storyGroupId } = storyGroup;
  const { id, serviceId } = selectedProfile;

  const onDateTimeSlotPickerSubmit = timestamp => {
    setShowDatePicker(false);
    if (editMode) {
      if (forceDatePickerSubmit) {
        setForceDatePickerSubmit(false);
        if (sentPost) {
          onCreateStoryGroup(timestamp);
        } else {
          onUpdateStoryGroup({
            scheduledAt: timestamp,
            stories,
            storyGroupId,
          });
        }
      } else {
        setScheduledAt(timestamp);
      }
    } else {
      onCreateStoryGroup(timestamp);
    }
  };

  const onScheduleClick = () => {
    if (
      !editMode ||
      (editMode && isScheduledAtPastDue) ||
      (editMode && sentPost)
    ) {
      setForceDatePickerSubmit(true);
      setShowDatePicker(true);
    } else {
      onUpdateStoryGroup({
        scheduledAt,
        stories,
        storyGroupId,
      });
    }
  };

  const onShareNowClick = () => {
    if (editMode) {
      if (sentPost) {
        onCreateStoryGroup(null, true);
      } else {
        onUpdateStoryGroup({
          scheduledAt,
          stories,
          storyGroupId,
          shareNow: true,
        });
      }
    } else {
      onCreateStoryGroup(null, true);
    }
  };

  const onFooterClick = () => {
    if (showDatePicker) {
      setShowDatePicker(false);
    }
  };

  return (
    <Fragment>
      <FooterBar onClick={onFooterClick}>
        {editMode && !sentPost && (
          <EditStoryStyle>
            <EditTextStyle>
              <Text type="p">Story Schedule:</Text>
            </EditTextStyle>
            <EditDateStyle>
              <Text>
                {getReadableDateFormat({ uses24hTime, scheduledAt, timezone })}
              </Text>
            </EditDateStyle>
            <StyledEditButton
              label="Edit"
              type="secondary"
              size="small"
              onClick={() => setShowDatePicker(true)}
            />
          </EditStoryStyle>
        )}
        <ButtonStyle>
          <Button
            type="secondary"
            label={translations.previewButton}
            disabled={isPreviewDisabled}
            onClick={() =>
              onPreviewClick({
                stories,
                scheduledAt,
                id: storyGroupId,
                profileId: id,
                serviceId,
              })
            }
          />
        </ButtonStyle>
        <Button
          onClick={onScheduleClick}
          isSplit
          type="primary"
          disabled={isScheduleDisabled}
          label={
            isScheduleLoading
              ? translations.scheduleLoadingButton
              : translations.scheduleButton
          }
        >
          <Select
            onSelectClick={selectedItem => {
              if (typeof selectedItem.selectedItemClick !== 'undefined') {
                selectedItem.selectedItemClick();
              }
              return false;
            }}
            items={[
              {
                title: translations.shareNowButton,
                selectedItemClick: onShareNowClick,
              },
              {
                title: translations.scheduleButton,
                selectedItemClick: onScheduleClick,
              },
            ]}
            type="primary"
            isSplit
            xPosition="right"
            hideSearch
          />
        </Button>
      </FooterBar>
      {showDatePicker && (
        <DateTimeSlotPickerWrapper
          uses24hTime={uses24hTime}
          timezone={timezone}
          weekStartsMonday={weekStartsMonday}
          editMode={editMode}
          onDateTimeSlotPickerSubmit={timestamp =>
            onDateTimeSlotPickerSubmit(timestamp)
          }
          initialDateTime={getInitialDateTime({
            editMode,
            sentPost,
            scheduledAt,
            emptySlotData,
            timezone,
          })}
        />
      )}
    </Fragment>
  );
};

AddStoryFooter.propTypes = {
  ...DateTimeSlotPickerWrapper.propTypes,
  isScheduleLoading: PropTypes.bool.isRequired,
  onUpdateStoryGroup: PropTypes.func.isRequired,
  onCreateStoryGroup: PropTypes.func.isRequired,
  onPreviewClick: PropTypes.func.isRequired,
  translations: translationsPropTypes, // eslint-disable-line react/require-default-props,
  storyGroup: storyGroupPropTypes, // eslint-disable-line react/require-default-props,
  selectedProfile: selectedProfilePropTypes, // eslint-disable-line react/require-default-props,
  isPastDue: PropTypes.bool,
  emptySlotData: PropTypes.shape({
    scheduledAt: PropTypes.string,
  }),
};

AddStoryFooter.defaultProps = {
  storyGroup: {},
  isPastDue: false,
  emptySlotData: {},
};

export default AddStoryFooter;
