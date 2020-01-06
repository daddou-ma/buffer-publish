export const filterProfilesWithRemindersAndNoPushNotifications = profiles => {
  if (profiles) {
    const listProfiles = profiles.filter(
      profile =>
        !profile.has_push_notifications && profile.has_reminders_in_queue
    );
    return listProfiles;
  }
  return [];
};

export const hasAtLeastOneProfileWithRemindersAndNoPushNotifications = profiles => {
  const result = filterProfilesWithRemindersAndNoPushNotifications(profiles);
  return result && result.length > 0;
};

export const getUsernamesOfProfilesWithRemindersAndNoPushNotifications = profiles => {
  const usernamesList = filterProfilesWithRemindersAndNoPushNotifications(
    profiles
  ).map(profile => `@${profile.formatted_username}`);

  return usernamesList.join(', ');
};
