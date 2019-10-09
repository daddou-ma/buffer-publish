import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import { isInThePast } from '@bufferapp/publish-server/formatters/src';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import { getReadableDateFormat, getMomentTime } from '../../utils/AddStory';
import { storyGroupPropTypes, translationsPropTypes, selectedProfilePropTypes } from '../../utils/commonPropTypes';
import {
  FooterBar,
  ButtonStyle,
  EditStoryStyle,
  EditTextStyle,
  EditDateStyle,
  StyledEditButton,
} from './style';

const getInitialDateTime = ({
  editMode,
  scheduledAt,
  emptySlotData,
  timezone,
}) => {
  if (editMode || emptySlotData) {
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
}) => {
  if (!editMode) {
    if (storiesLength < 1) {
      return true;
    }
    if (!uploadsCompleted) {
      return true;
    }
    if (isScheduleLoading) {
      return true;
    }
    if (isScheduledAtPastDue) {
      return true;
    }
  } else {
    if (storiesLength < 1) {
      return true;
    }
    if (!uploadsCompleted) {
      return true;
    }
    if (isScheduleLoading) {
      return true;
    }
  }
  return false;
};

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
}) => {
  const [scheduledAt, setScheduledAt] = useState(storyGroup ? storyGroup.scheduledAt : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [forceDatePickerSubmit, setForceDatePickerSubmit] = useState(false);

  /* this covers the case if a story group has a share failure and a user edits it
   without updating the scheduled_at. Now the schedule button will be disabled until
   date is updated. */
  const isScheduledAtPastDue = isPastDue && isInThePast(scheduledAt);

  const storiesLength = storyGroup.stories.length;
  const uploadsCompleted = storyGroup.stories.filter(card => card.processing || card.uploading).length === 0;
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

  const onDateTimeSlotPickerSubmit = (timestamp) => {
    setShowDatePicker(false);
    if (editMode) {
      if (forceDatePickerSubmit) {
        setForceDatePickerSubmit(false);
        onUpdateStoryGroup({
          scheduledAt: timestamp,
          stories,
          storyGroupId,
        });
      } else {
        setScheduledAt(timestamp);
      }
    } else {
      onCreateStoryGroup(timestamp);
    }
  };

  const onScheduleClick = () => {
    if (!editMode || (editMode && isScheduledAtPastDue)) {
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
      onUpdateStoryGroup({
        scheduledAt,
        stories,
        storyGroupId,
        shareNow: true,
      });
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
        {editMode && (
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
            onClick={() => onPreviewClick({
              stories, scheduledAt, id: storyGroupId, profileId: id, serviceId,
            })}
          />
        </ButtonStyle>
        <Button
          onSelectClick={(selectedItem) => {
            if (typeof selectedItem.selectedItemClick !== 'undefined') {
              selectedItem.selectedItemClick();
            }
            return false;
          }}
          onClick={onScheduleClick}
          isSplit
          type="primary"
          items={[
            { title: translations.scheduleButton, selectedItemClick: onScheduleClick },
            { title: translations.shareNowButton, selectedItemClick: onShareNowClick },
          ]}
          disabled={isScheduleDisabled}
          label={isScheduleLoading
            ? translations.scheduleLoadingButton
            : translations.scheduleButton}
        />
      </FooterBar>
      {showDatePicker && (
        <DateTimeSlotPickerWrapper
          uses24hTime={uses24hTime}
          timezone={timezone}
          weekStartsMonday={weekStartsMonday}
          editMode={editMode}
          onDateTimeSlotPickerSubmit={timestamp => onDateTimeSlotPickerSubmit(timestamp)}
          initialDateTime={getInitialDateTime({
            editMode,
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
};

AddStoryFooter.defaultProps = {
  storyGroup: {},
  isPastDue: false,
};

export default AddStoryFooter;
