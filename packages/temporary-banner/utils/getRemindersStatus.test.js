import {
  hasAtLeastOneProfileWithRemindersAndNoPushNotifications,
  getUsernamesOfProfilesWithRemindersAndNoPushNotifications,
  filterProfilesWithRemindersAndNoPushNotifications,
} from './getRemindersStatus';

describe('getRemindersStatus', () => {
  const emptyProfiles = [];
  const profilesNoNotificationsNoReminders = [
    {
      _id: 'id1',
      has_push_notifications: false,
      has_reminders_in_queue: false,
      formatted_username: 'account1',
    },
  ];
  const profilesOneWithRemindersAndNoNotifications = [
    {
      _id: 'id1',
      has_push_notifications: false,
      has_reminders_in_queue: true,
      formatted_username: 'account1',
    },
    {
      _id: 'id2',
      has_push_notifications: true,
      has_reminders_in_queue: false,
      formatted_username: 'account2',
    },
  ];
  const profilesTwoWithRemindersAndNoNotifications = [
    {
      _id: 'id1',
      has_push_notifications: false,
      has_reminders_in_queue: true,
      formatted_username: 'account1',
    },
    {
      _id: 'id2',
      has_push_notifications: false,
      has_reminders_in_queue: true,
      formatted_username: 'account2',
    },
  ];

  describe('filterProfiles', () => {
    it('returns empty array if no profiles', () => {
      expect(
        filterProfilesWithRemindersAndNoPushNotifications(emptyProfiles)
      ).toEqual([]);
    });

    it('returns empty array if no profiles without notifications and with reminders', () => {
      expect(
        filterProfilesWithRemindersAndNoPushNotifications(
          profilesNoNotificationsNoReminders
        )
      ).toEqual([]);
    });

    it('returns array of object if one profile without notifications and with reminders', () => {
      const expectedResult = [
        {
          _id: 'id1',
          has_push_notifications: false,
          has_reminders_in_queue: true,
          formatted_username: 'account1',
        },
      ];

      expect(
        filterProfilesWithRemindersAndNoPushNotifications(
          profilesOneWithRemindersAndNoNotifications
        )
      ).toEqual(expectedResult);
    });

    it('returns array of objects if one profile without notifications and with reminders', () => {
      const expectedResult = [
        {
          _id: 'id1',
          has_push_notifications: false,
          has_reminders_in_queue: true,
          formatted_username: 'account1',
        },
        {
          _id: 'id2',
          has_push_notifications: false,
          has_reminders_in_queue: true,
          formatted_username: 'account2',
        },
      ];

      expect(
        filterProfilesWithRemindersAndNoPushNotifications(
          profilesTwoWithRemindersAndNoNotifications
        )
      ).toEqual(expectedResult);
    });
  });

  describe('hasAtLeastOneProfileWithRemindersAndNoPushNotifications', () => {
    it('returns false if listProfiles is an empty array', () => {
      expect(
        hasAtLeastOneProfileWithRemindersAndNoPushNotifications(emptyProfiles)
      ).toEqual(false);
    });

    it('returns true if listProfiles is an array with elements', () => {
      expect(
        hasAtLeastOneProfileWithRemindersAndNoPushNotifications(
          profilesTwoWithRemindersAndNoNotifications
        )
      ).toEqual(true);
    });
  });

  describe('getUsernamesOfProfilesWithRemindersAndNoPushNotifications', () => {
    it('returns empty string if profiles is an empty array', () => {
      expect(
        getUsernamesOfProfilesWithRemindersAndNoPushNotifications(emptyProfiles)
      ).toEqual('');
    });

    it('returns message if listProfiles is an array with one element', () => {
      expect(
        getUsernamesOfProfilesWithRemindersAndNoPushNotifications(
          profilesOneWithRemindersAndNoNotifications
        )
      ).toEqual('@account1');
    });

    it('returns message if listProfiles is an array with elements', () => {
      expect(
        getUsernamesOfProfilesWithRemindersAndNoPushNotifications(
          profilesTwoWithRemindersAndNoNotifications
        )
      ).toEqual('@account1, @account2');
    });
  });
});
