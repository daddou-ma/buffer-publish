import { connect } from 'react-redux';

import TemporaryDashboardBanner from './components/TemporaryDashboardBanner';
import {
  hasAtLeastOneProfileWithRemindersAndNoPushNotifications,
  getUsernamesOfProfilesWithRemindersAndNoPushNotifications,
} from './utils/getRemindersStatus';

export default connect(state => {
  const remindersStatus = state.temporaryBanner.remindersStatusByProfile;
  const displayRemindersBanner =
    (remindersStatus &&
      hasAtLeastOneProfileWithRemindersAndNoPushNotifications(
        remindersStatus
      )) ||
    false;
  const shouldDisplayIGRetirementBanner = state.profileSidebar.profiles?.some(
    profile => profile.service === 'instagram' && !profile.isInstagramBusiness
  );
  let usernamesList = '';
  if (displayRemindersBanner) {
    usernamesList = getUsernamesOfProfilesWithRemindersAndNoPushNotifications(
      remindersStatus
    );
  }
  return {
    enabledApplicationModes: state.temporaryBanner.enabledApplicationModes,
    displayRemindersBanner,
    shouldDisplayIGRetirementBanner,
    usernamesRemindersList: usernamesList,
  };
})(TemporaryDashboardBanner);
