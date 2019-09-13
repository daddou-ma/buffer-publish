import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import { getReadableDateFormat } from '../../utils/AddStory';
import {
  FooterBar,
  ButtonStyle,
  EditStoryStyle,
  EditTextStyle,
  EditDateStyle,
  StyledEditButton,
} from './style';

const AddStoryFooter = ({
  timezone,
  weekStartsMonday,
  uses24hTime,
  isScheduleLoading,
  translations,
  storyGroup,
  onUpdateStoryGroup,
  onCreateStoryGroup,
  editMode,
}) => {
  const [scheduledAt, setScheduledAt] = useState(storyGroup ? storyGroup.scheduledAt : null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      const { stories, storyGroupId } = storyGroup;
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
                {getReadableDateFormat({ scheduledAt, uses24hTime })}
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
            onClick={() => {}}
          />
        </ButtonStyle>
        <Button
          onClick={onScheduleClick}
          type="primary"
          disabled={isScheduleLoading}
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
