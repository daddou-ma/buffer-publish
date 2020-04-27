/**
 * Component that handles the multiple Save buttons in the composer.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import moment from 'moment-timezone';
import partition from 'lodash.partition';
import { AppEnvironments } from '@bufferapp/publish-constants';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import {
  QueueingTypes,
  NotificationScopes,
  Services,
  SaveButtonTypes,
  InlineSaveButtonTypes,
} from '../AppConstants';
import Dropdown, { DropdownTrigger, DropdownContent } from './Dropdown';
import DateTimeSlotPicker from './DateTimeSlotPicker';
import UpdateSaverItem from './UpdateSaverItem';
import OmniboxButtons from './OmniboxButtons';
import NotificationContainer from './NotificationContainer';
import TooltipList from './TooltipList';
import styles from './css/UpdateSaver.css';

const getUpdateSaverState = () => ({
  isInlineSchedulerDropdownExpanded: false,
});

class UpdateSaver extends React.Component {
  static propTypes = {
    appState: PropTypes.object.isRequired,
    metaData: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    visibleNotifications: PropTypes.array.isRequired,
    isSlotPickingAvailable: PropTypes.bool.isRequired,
    saveButtons: PropTypes.arrayOf(
      PropTypes.oneOf(Object.keys(SaveButtonTypes))
    ).isRequired,
    timezone: PropTypes.string,
    moreThanOneProfileSelected: PropTypes.bool,
    areAllDraftsSaved: PropTypes.bool,
    whatPreventsSavingMessages: PropTypes.array,
    scheduledAt: PropTypes.number,
    availableSchedulesSlotsForDay: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.shape({
          isSlotFree: PropTypes.bool.isRequired,
          timestamp: PropTypes.number.isRequired,
        })
      ),
    ]),
    isPinnedToSlot: PropTypes.bool,
    sentPost: PropTypes.bool,
  };

  static defaultProps = {
    isPinnedToSlot: null,
    sentPost: false,
  };

  state = getUpdateSaverState();

  getFormattedWhatPreventsSavingMessages = () => {
    const { whatPreventsSavingMessages } = this.props;

    if (whatPreventsSavingMessages.length === 0) {
      return null;
    }

    const messages = whatPreventsSavingMessages.map(what => {
      let message = what.message;
      if (what.composerId) {
        message = message.concat(
          ` for ${Services.get(what.composerId).formattedName}`
        );
      }
      return message;
    });

    return ReactDOMServer.renderToStaticMarkup(
      <TooltipList messages={messages} />
    );
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
   * the DateTimeSlotPicker.
   * To prevent this, we stop click event bubbling at the DateTimeSlotPicker level :)
   */
  onDateTimeSlotPickerClick = e => e.stopPropagation();

  onInlineSchedulerDateTimeSlotPickerChange = (
    selectedDateTime,
    isPinnedToSlot
  ) => {
    const scheduledAt = selectedDateTime.unix();
    ComposerActionCreators.updateDraftsScheduledAt(scheduledAt, isPinnedToSlot);
  };

  collapseInlineSchedulerDropdown = () => {
    this.setState({ isInlineSchedulerDropdownExpanded: false });
  };

  expandInlineSchedulerDropdown = () => {
    this.setState({ isInlineSchedulerDropdownExpanded: true });
  };

  // Determine if it is displayed as "behind" an active composer
  isDisplayedBehind = () => this.props.appState.expandedComposerId !== null;

  getSaveButton = saveButtons => {
    const [inlineSaveButtonTypes, stackedSaveButtonTypes] = partition(
      saveButtons,
      button => InlineSaveButtonTypes.includes(button)
    );
    return [inlineSaveButtonTypes, stackedSaveButtonTypes];
  };

  render() {
    const {
      appState,
      userData,
      metaData,
      visibleNotifications,
      timezone,
      moreThanOneProfileSelected,
      areAllDraftsSaved,
      saveButtons,
      isSlotPickingAvailable,
      availableSchedulesSlotsForDay,
      isPinnedToSlot,
      selectedProfiles,
      sentPost,
    } = this.props;
    let { scheduledAt } = this.props;

    const {
      isSavingPossible,
      isDraftsSavePending,
      draftSaveQueueingType,
      isOmniboxEnabled,
    } = appState;

    const doSelectedProfilesHaveSlots = selectedProfiles.some(
      profile => profile.profileHasPostingSchedule
    );

    const { isInlineSchedulerDropdownExpanded } = this.state;

    if (saveButtons.length === 0) return null;

    const isDisabled = !isSavingPossible;
    const weekStartsMonday = userData.weekStartsMonday;

    const dropdownTriggerClassName = [
      styles.dropdownTrigger,
      'bi bi-arrow-down',
    ].join(' ');

    const inlineButtonsWrapperClassName = [
      isDraftsSavePending
        ? styles.savePendingInlineButtonsWrapper
        : styles.inlineButtonsWrapper,
      'js-disable-dragging',
    ].join(' ');

    const stackedButtonsWrapperClassName = [
      isDraftsSavePending
        ? styles.savePendingStackedButtonsWrapper
        : styles.stackedButtonsWrapper,
      'js-disable-dragging',
    ].join(' ');

    const notificationContainerClassNames = {
      container: styles.notificationContainer,
      notification: styles.notification,
    };

    const saveButtonsCopy = new Map([
      [SaveButtonTypes.ADD_TO_QUEUE, 'Add to Queue'],
      [SaveButtonTypes.SHARE_NEXT, 'Share Next'],
      [SaveButtonTypes.SHARE_NOW, 'Share Now'],
      [
        SaveButtonTypes.SCHEDULE_POST,
        moreThanOneProfileSelected ? 'Schedule Posts' : 'Schedule Post',
      ],
      [SaveButtonTypes.SAVE, 'Save'],
      [SaveButtonTypes.SAVE_AND_APPROVE, 'Save & Approve'],
      [SaveButtonTypes.ADD_TO_DRAFTS, 'Add to Drafts'],
      [SaveButtonTypes.SHARE_NEXT_DRAFT, 'Share Next'],
      [
        SaveButtonTypes.SCHEDULE_DRAFT,
        moreThanOneProfileSelected ? 'Schedule Drafts' : 'Schedule Draft',
      ],
    ]);

    const addingToQueueCopyMap = new Map([
      [QueueingTypes.QUEUE, 'Adding to queue…'],
      [QueueingTypes.NEXT, 'Adding to queue…'],
      [QueueingTypes.NOW, 'Sharing…'],
      [QueueingTypes.CUSTOM, 'Scheduling…'],
      [QueueingTypes.SAVE, 'Saving…'],
      [QueueingTypes.SAVE_AND_APPROVE, 'Saving and approving…'],
      [QueueingTypes.ADD_DRAFT, 'Adding to drafts…'],
      [QueueingTypes.NEXT_DRAFT, 'Adding to drafts…'],
      [QueueingTypes.CUSTOM_DRAFT, 'Scheduling…'],
    ]);

    const addedToQueueCopyMap = new Map([
      [QueueingTypes.QUEUE, 'Added to queue!'],
      [QueueingTypes.NEXT, 'Added to queue!'],
      [QueueingTypes.NOW, 'Shared!'],
      [QueueingTypes.CUSTOM, 'Scheduled!'],
      [QueueingTypes.SAVE, 'Saved!'],
      [QueueingTypes.SAVE_AND_APPROVE, 'Saved and approved!'],
      [QueueingTypes.ADD_DRAFT, 'Added to drafts!'],
      [QueueingTypes.NEXT_DRAFT, 'Added to drafts!'],
      [QueueingTypes.CUSTOM_DRAFT, 'Scheduled!'],
    ]);

    const getActiveSaveButtonCopy = (buttonType, queueingType) =>
      isDraftsSavePending
        ? addingToQueueCopyMap.get(queueingType)
        : areAllDraftsSaved
        ? addedToQueueCopyMap.get(queueingType)
        : saveButtonsCopy.get(buttonType);

    // if the user doesn't have any slots available, then they will
    // only see these two buttons in the composer.
    const shouldUpdateButtons =
      saveButtons &&
      (saveButtons[0] !== SaveButtonTypes.ADD_TO_DRAFTS &&
        saveButtons[0] !== SaveButtonTypes.SAVE &&
        !doSelectedProfilesHaveSlots);
    const buttons = shouldUpdateButtons
      ? ['SHARE_NOW', 'SCHEDULE_POST']
      : saveButtons;

    const [inlineSaveButtonTypes, stackedSaveButtonTypes] = this.getSaveButton(
      buttons
    );

    const displayInlineSaveButtons = inlineSaveButtonTypes.length > 0;
    const displayStackedSaveButtons = stackedSaveButtonTypes.length > 0;
    let firstStackedButtonType;
    let otherStackedButtonsTypes;
    let displaySaveDropdown;
    let firstStackedButtonCopy;

    if (displayStackedSaveButtons) {
      firstStackedButtonType = stackedSaveButtonTypes[0];
      otherStackedButtonsTypes = stackedSaveButtonTypes.slice(1);
      displaySaveDropdown =
        !isDraftsSavePending && otherStackedButtonsTypes.length > 0;
      firstStackedButtonCopy = getActiveSaveButtonCopy(
        firstStackedButtonType,
        draftSaveQueueingType
      );
    }

    if (sentPost) scheduledAt = null;
    const shouldDisplayInlineScheduler = scheduledAt !== null;
    let scheduledAtMoment;
    let humanReadableScheduledAt;

    if (shouldDisplayInlineScheduler) {
      scheduledAtMoment = moment.unix(scheduledAt);
      if (timezone) scheduledAtMoment = scheduledAtMoment.tz(timezone);

      const humanReadableFormat = userData.uses24hTime
        ? 'MMM D, H:mm'
        : 'MMM D, h:mm A';
      humanReadableScheduledAt = scheduledAtMoment.format(humanReadableFormat);
    }
    const isDraft =
      firstStackedButtonCopy ===
      saveButtonsCopy.get(SaveButtonTypes.ADD_TO_DRAFTS);
    const isEditPost = buttons && buttons[0] === SaveButtonTypes.SAVE;
    const shouldDisplayTime =
      isEditPost && !doSelectedProfilesHaveSlots && !isDraft;

    return (
      <section className={styles.section}>
        {isOmniboxEnabled && <OmniboxButtons />}

        {!isOmniboxEnabled &&
          (shouldDisplayInlineScheduler || shouldDisplayTime) && (
            <div className={styles.inlineScheduler}>
              Post Schedule:
              <span className={styles.humanReadableScheduledAt}>
                {' '}
                {shouldDisplayInlineScheduler
                  ? humanReadableScheduledAt
                  : 'No Time Set'}
              </span>
              <Dropdown
                isDropdownExpanded={isInlineSchedulerDropdownExpanded}
                onHide={this.collapseInlineSchedulerDropdown}
                onShow={this.expandInlineSchedulerDropdown}
                className={styles.inlineDropdownContainer}
              >
                <DropdownTrigger className={styles.tertiaryButton}>
                  {shouldDisplayInlineScheduler ? 'Edit' : 'Set Time'}
                </DropdownTrigger>
                <DropdownContent className={styles.rightAlignedDropdownContent}>
                  <DateTimeSlotPicker
                    onClick={this.onDateTimeSlotPickerClick}
                    onChange={this.onInlineSchedulerDateTimeSlotPickerChange}
                    onSubmit={this.collapseInlineSchedulerDropdown}
                    shouldUse24hTime={userData.uses24hTime}
                    timezone={timezone}
                    weekStartsMonday={weekStartsMonday}
                    initialDateTime={scheduledAtMoment}
                    isSlotPickingAvailable={isSlotPickingAvailable}
                    availableSchedulesSlotsForDay={
                      availableSchedulesSlotsForDay
                    }
                    isPinnedToSlot={isPinnedToSlot}
                    metaData={metaData}
                    submitButtonCopy="Done"
                    doSelectedProfilesHaveSlots={doSelectedProfilesHaveSlots}
                  />
                </DropdownContent>
              </Dropdown>
            </div>
          )}

        {!isOmniboxEnabled && displayInlineSaveButtons && (
          <div
            className={inlineButtonsWrapperClassName}
            data-disabled={isDisabled}
            data-tip={this.getFormattedWhatPreventsSavingMessages()}
            data-html
            data-place="left"
          >
            {inlineSaveButtonTypes.map((saveButtonType, i) => (
              <UpdateSaverItem
                key={saveButtonType}
                type={saveButtonType}
                appState={appState}
                userData={userData}
                timezone={timezone}
                weekStartsMonday={weekStartsMonday}
                isInlineSchedulerDisplayed={shouldDisplayInlineScheduler}
                isSecondaryItem={i < inlineSaveButtonTypes.length - 1}
                selectedProfiles={selectedProfiles}
              >
                {draftSaveQueueingType === saveButtonType
                  ? getActiveSaveButtonCopy(
                      saveButtonType,
                      draftSaveQueueingType
                    )
                  : saveButtonsCopy.get(saveButtonType)}
              </UpdateSaverItem>
            ))}
          </div>
        )}

        {!isOmniboxEnabled && displayStackedSaveButtons && (
          <div
            className={stackedButtonsWrapperClassName}
            data-disabled={isDisabled}
            data-tip={this.getFormattedWhatPreventsSavingMessages()}
            data-html
            data-place="left"
          >
            <UpdateSaverItem
              type={firstStackedButtonType}
              disabled={isDisabled}
              appState={appState}
              userData={userData}
              timezone={timezone}
              weekStartsMonday={weekStartsMonday}
              isInlineSchedulerDisplayed={shouldDisplayInlineScheduler}
            >
              {firstStackedButtonCopy}
            </UpdateSaverItem>

            {displaySaveDropdown && (
              <Dropdown disabled={isDisabled}>
                <DropdownTrigger
                  className={dropdownTriggerClassName}
                  aria-label="More Sharing Options"
                />

                <DropdownContent className={styles.dropdownContent}>
                  {otherStackedButtonsTypes.map(saveButtonType => (
                    <UpdateSaverItem
                      key={saveButtonType}
                      type={saveButtonType}
                      appState={appState}
                      userData={userData}
                      timezone={timezone}
                      weekStartsMonday={weekStartsMonday}
                      isInlineSchedulerDisplayed={shouldDisplayInlineScheduler}
                      isMenuItem
                    >
                      {saveButtonsCopy.get(saveButtonType)}
                    </UpdateSaverItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            )}
          </div>
        )}

        {metaData.appEnvironment === AppEnvironments.EXTENSION && (
          <NotificationContainer
            visibleNotifications={visibleNotifications}
            scope={NotificationScopes.UPDATE_SAVING_AGGREGATE}
            classNames={notificationContainerClassNames}
          />
        )}
      </section>
    );
  }
}

export default UpdateSaver;
