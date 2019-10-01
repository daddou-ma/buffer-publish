import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import { getReadableDateFormat, getMomentTime } from '../../utils/AddStory';
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
}) => {
  const [scheduledAt, setScheduledAt] = useState(storyGroup ? storyGroup.scheduledAt : null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const storiesLength = storyGroup.stories.length;
  const uploadsCompleted = storyGroup.stories.filter(card => card.processing || card.uploading).length === 0;
  const isScheduleDisabled = storiesLength < 1 || !uploadsCompleted || isScheduleLoading;
  const isPreviewDisabled = storiesLength < 1 || !uploadsCompleted;

  const { stories, storyGroupId } = storyGroup;
  const { id, serviceId } = selectedProfile;

  const onDateTimeSlotPickerSubmit = (timestamp) => {
    setShowDatePicker(false);
    if (editMode) {
      setScheduledAt(timestamp);
    } else {
      onCreateStoryGroup(timestamp);
    }
  };

  const onScheduleClick = () => {
    if (editMode) {
      const { storyGroupId } = storyGroup;
      onUpdateStoryGroup({
        scheduledAt,
        stories,
        storyGroupId,
      });
    } else {
      setShowDatePicker(true);
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
          onClick={onScheduleClick}
          type="primary"
          disabled={isScheduleDisabled}
          label={isScheduleLoading
            ? translations.scheduleLoadingButton
            : translations.scheduleButton}
        />
      </FooterBar>
      {showDatePicker && (
        <DateTimeSlotPickerWrapper
          shouldUse24hTime={uses24hTime}
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
  translations: PropTypes.shape({
    scheduleLoadingButton: PropTypes.string,
    scheduleButton: PropTypes.string,
    previewButton: PropTypes.string,
  }).isRequired,
  storyGroup: PropTypes.shape({
    storyDetails: PropTypes.shape({
      stories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
      })),
    }),
    scheduledAt: PropTypes.number,
  }),
};

AddStoryFooter.defaultProps = {
  storyGroup: {},
};

export default AddStoryFooter;
