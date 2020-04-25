import React from 'react';
import PropTypes from 'prop-types';
import AppActionCreators from '../action-creators/AppActionCreators';
import { SaveButtonTypes, ButtonsQueuingTypesMap } from '../AppConstants';
import Dropdown, { DropdownTrigger, DropdownContent } from './Dropdown';
import DateTimeSlotPicker from './DateTimeSlotPicker';
import Button from './styled/Button';

import styles from './css/UpdateSaver.css';

class UpdateSaverItem extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.keys(SaveButtonTypes)).isRequired,
    children: PropTypes.node.isRequired,
    appState: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    isInlineSchedulerDisplayed: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    timezone: PropTypes.string,
    isMenuItem: PropTypes.bool,
    isSecondaryItem: PropTypes.bool,
    weekStartsMonday: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    disabled: false,
    isMenuItem: false,
    isSecondaryItem: false,
  };

  onButtonClick = e => {
    const { type } = this.props;
    const queuingType = ButtonsQueuingTypesMap.get(type);

    AppActionCreators.saveDrafts(queuingType, {
      shouldSkipEmptyTextAlert: false,
    });

    e.stopPropagation();
  };

  /**
   * DateTimeSlotPicker is displayed within a DropDown component, which takes care
   * of showing/hiding it when necessary. To do that, the DropDown component
   * listens to clicks in the whole document, and when a click happens on a
   * DOM element outside of DropdownContent, it is hidden. That's awesome, but
   * in some situations with DateTimeSlotPicker, users will click on buttons, and
   * the UI will change in such a way that the buttons that were clicked will
   * disappear: when that's the case, the DropDown component will wrongly deduct
   * that the click happened outside of the DropDown, and will proceed to hiding
   * the DateTimeSlotPicker. E.g. http://cl.ly/1R071e0i191e
   * To prevent this, we stop click event bubbling at the DateTimeSlotPicker level :)
   */
  onDateTimeSlotPickerClick = e => e.stopPropagation();

  onDateTimeSlotPickerSubmit = timestamp => {
    const { type } = this.props;
    const queuingType = ButtonsQueuingTypesMap.get(type);

    AppActionCreators.saveDrafts(queuingType, {
      customScheduleTime: timestamp,
      shouldSkipEmptyTextAlert: false,
    });
  };

  render() {
    const {
      type,
      children,
      userData,
      disabled,
      timezone,
      isMenuItem,
      isSecondaryItem,
      weekStartsMonday,
      isInlineSchedulerDisplayed,
      selectedProfiles,
    } = this.props;

    const buttonClassName = isMenuItem
      ? styles.dropdownMenuItem
      : isSecondaryItem
      ? styles.secondaryButton
      : styles.button;

    const schedulishSaveButtonTypes = [
      SaveButtonTypes.SCHEDULE_POST,
      SaveButtonTypes.SCHEDULE_DRAFT,
    ];

    const internalButtonType =
      schedulishSaveButtonTypes.includes(type) && !isInlineSchedulerDisplayed
        ? 'SCHEDULE_POST_DROPDOWN'
        : 'BUTTON';

    switch (internalButtonType) {
      case 'SCHEDULE_POST_DROPDOWN':
        return (
          <Dropdown className={styles.dropdownContainerAsMenuItem}>
            <DropdownTrigger className={styles.dropdownTriggerAsMenuItem}>
              {children}
            </DropdownTrigger>
            <DropdownContent className={styles.dropdownContentAsMenuItem}>
              <DateTimeSlotPicker
                onClick={this.onDateTimeSlotPickerClick}
                onSubmit={this.onDateTimeSlotPickerSubmit}
                shouldUse24hTime={userData.uses24hTime}
                timezone={timezone}
                weekStartsMonday={weekStartsMonday}
                selectedProfiles={selectedProfiles}
              />
            </DropdownContent>
          </Dropdown>
        );

      default:
        return (
          <Button
            type="button"
            className={buttonClassName}
            disabled={disabled}
            onClick={this.onButtonClick}
          >
            {children}
          </Button>
        );
    }
  }
}

export default UpdateSaverItem;
