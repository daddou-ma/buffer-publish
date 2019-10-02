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
