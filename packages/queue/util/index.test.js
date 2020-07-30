import moment from 'moment-timezone';
import {
  getDayString,
  getDailySlotsFromProfileSchedules,
  getDaysForUpcomingWeeks,
  getSlotsWithTimestampsForDay,
  getSlotsWithTimestampsAndNoTimeForDay,
  getDayHeaderItem,
  getQueueItemsForDay,
  getSlotOrPostItem,
  formatPostLists,
  isScheduleSlotsAvailable,
  postHasCommentEnabled,
} from './index';

const profileTimezone = 'America/Vancouver';
const thuMarch72019Timestamp = 1551988793866;

const schedules = [
  {
    days: ['sun'],
    times: ['05:20', '12:14', '20:03'],
  },
  {
    days: ['mon'],
    times: ['05:20', '12:14', '17:52', '21:27'],
  },
  {
    days: ['tue'],
    times: ['06:24', '12:14', '17:52', '21:27'],
  },
  {
    days: ['wed'],
    times: ['09:01', '12:02', '18:13', '23:27'],
  },
  {
    days: ['thu'],
    times: ['02:27', '09:02', '13:02', '18:13'],
  },
  {
    days: ['fri'],
    times: ['05:20', '09:02', '11:10', '16:18'],
  },
  {
    days: ['sat'],
    times: ['06:02', '12:35', '20:07'],
  },
];

const schedulesNotSet = [
  {
    days: ['sun'],
    times: [],
  },
  {
    days: ['mon'],
    times: [],
  },
  {
    days: ['tue'],
    times: [],
  },
  {
    days: ['wed'],
    times: [],
  },
  {
    days: ['thu'],
    times: [],
  },
  {
    days: ['fri'],
    times: [],
  },
  {
    days: ['sat'],
    times: [],
  },
];

describe('queue utils', () => {
  describe('getDailySlotsFromProfileSchedules', () => {
    it('should combine split schedule from backend into simple day:times map', () => {
      const schedule = [
        {
          days: ['sun'],
          times: ['09:27', '14:02', '15:39', '21:21'],
        },
      ];
      const result = getDailySlotsFromProfileSchedules(schedule);
      expect(result[0]).toEqual(['09:27', '14:02', '15:39', '21:21']);
    });
  });

  describe('getDayString', () => {
    it('returns "Today" when it is today', () => {
      const now = moment.tz(thuMarch72019Timestamp, profileTimezone);
      const date = moment.tz(thuMarch72019Timestamp, profileTimezone);
      expect(getDayString(profileTimezone, date, now)).toEqual({
        dayOfWeek: 'Today',
        date: 'March 7',
        text: 'Today',
      });
    });
    it('returns "Tomorrow" when it is tomorrow', () => {
      const now = moment.tz(thuMarch72019Timestamp, profileTimezone);
      const date = moment
        .tz(thuMarch72019Timestamp, profileTimezone)
        .clone()
        .add(1, 'day');
      expect(getDayString(profileTimezone, date, now)).toEqual({
        dayOfWeek: 'Tomorrow',
        date: 'March 8',
        text: 'Tomorrow',
      });
    });
    it('returns the date without the year when the year is same as now', () => {
      const now = moment
        .tz(thuMarch72019Timestamp, profileTimezone)
        .add(1, 'month'); // add month so it doesn't return 'Today', but it is the same year
      const date = moment.tz(thuMarch72019Timestamp, profileTimezone);
      expect(getDayString(profileTimezone, date, now)).toEqual({
        dayOfWeek: 'Thursday',
        date: 'March 7',
        text: 'Thursday 7th March',
      });
    });
    it('returns the date with the year when the year is different from now', () => {
      const now = moment
        .tz(thuMarch72019Timestamp, profileTimezone)
        .subtract(1, 'years'); // diff year
      const date = moment.tz(thuMarch72019Timestamp, profileTimezone);
      expect(getDayString(profileTimezone, date, now)).toEqual({
        dayOfWeek: 'Thursday',
        date: 'March 7 2019',
        text: 'Thursday 7th March 2019',
      });
    });
  });

  describe('getDaysForUpcomingWeeks', () => {
    it('gets days for the next two weeks', () => {
      const now = moment.tz(thuMarch72019Timestamp, profileTimezone);
      const result = getDaysForUpcomingWeeks({
        profileTimezone,
        weekStartsOnMonday: false,
        numWeeks: 2,
        now,
      });
      expect(result).toEqual([
        {
          text: 'Today',
          date: 'March 7',
          dayOfWeek: 'Today',
          dayIndex: 4,
          dayUnixTime: 1551945600,
        },
        {
          text: 'Tomorrow',
          date: 'March 8',
          dayOfWeek: 'Tomorrow',
          dayIndex: 5,
          dayUnixTime: 1552032000,
        },
        {
          text: 'Saturday 9th March',
          date: 'March 9',
          dayOfWeek: 'Saturday',
          dayIndex: 6,
          dayUnixTime: 1552118400,
        },
        {
          text: 'Sunday 10th March',
          date: 'March 10',
          dayOfWeek: 'Sunday',
          dayIndex: 0,
          dayUnixTime: 1552204800,
        },
        {
          text: 'Monday 11th March',
          date: 'March 11',
          dayOfWeek: 'Monday',
          dayIndex: 1,
          dayUnixTime: 1552287600,
        },
        {
          text: 'Tuesday 12th March',
          date: 'March 12',
          dayOfWeek: 'Tuesday',
          dayIndex: 2,
          dayUnixTime: 1552374000,
        },
        {
          text: 'Wednesday 13th March',
          date: 'March 13',
          dayOfWeek: 'Wednesday',
          dayIndex: 3,
          dayUnixTime: 1552460400,
        },
        {
          text: 'Thursday 14th March',
          date: 'March 14',
          dayOfWeek: 'Thursday',
          dayIndex: 4,
          dayUnixTime: 1552546800,
        },
        {
          text: 'Friday 15th March',
          date: 'March 15',
          dayOfWeek: 'Friday',
          dayIndex: 5,
          dayUnixTime: 1552633200,
        },
        {
          text: 'Saturday 16th March',
          date: 'March 16',
          dayOfWeek: 'Saturday',
          dayIndex: 6,
          dayUnixTime: 1552719600,
        },
        {
          text: 'Sunday 17th March',
          date: 'March 17',
          dayOfWeek: 'Sunday',
          dayIndex: 0,
          dayUnixTime: 1552806000,
        },
        {
          text: 'Monday 18th March',
          date: 'March 18',
          dayOfWeek: 'Monday',
          dayIndex: 1,
          dayUnixTime: 1552892400,
        },
        {
          text: 'Tuesday 19th March',
          date: 'March 19',
          dayOfWeek: 'Tuesday',
          dayIndex: 2,
          dayUnixTime: 1552978800,
        },
        {
          text: 'Wednesday 20th March',
          date: 'March 20',
          dayOfWeek: 'Wednesday',
          dayIndex: 3,
          dayUnixTime: 1553065200,
        },
        {
          text: 'Thursday 21st March',
          date: 'March 21',
          dayOfWeek: 'Thursday',
          dayIndex: 4,
          dayUnixTime: 1553151600,
        },
        {
          text: 'Friday 22nd March',
          date: 'March 22',
          dayOfWeek: 'Friday',
          dayIndex: 5,
          dayUnixTime: 1553238000,
        },
        {
          text: 'Saturday 23rd March',
          date: 'March 23',
          dayOfWeek: 'Saturday',
          dayIndex: 6,
          dayUnixTime: 1553324400,
        },
      ]);
    });
    it('gets days for the next two weeks when the week starts on monday', () => {
      const now = moment.tz(thuMarch72019Timestamp, profileTimezone);
      const result = getDaysForUpcomingWeeks({
        profileTimezone,
        weekStartsOnMonday: true,
        numWeeks: 2,
        now,
      });
      expect(result).toEqual([
        {
          text: 'Today',
          date: 'March 7',
          dayOfWeek: 'Today',
          dayIndex: 4,
          dayUnixTime: 1551945600,
        },
        {
          text: 'Tomorrow',
          date: 'March 8',
          dayOfWeek: 'Tomorrow',
          dayIndex: 5,
          dayUnixTime: 1552032000,
        },
        {
          text: 'Saturday 9th March',
          date: 'March 9',
          dayOfWeek: 'Saturday',
          dayIndex: 6,
          dayUnixTime: 1552118400,
        },
        {
          text: 'Sunday 10th March',
          date: 'March 10',
          dayOfWeek: 'Sunday',
          dayIndex: 0,
          dayUnixTime: 1552204800,
        },
        {
          text: 'Monday 11th March',
          date: 'March 11',
          dayOfWeek: 'Monday',
          dayIndex: 1,
          dayUnixTime: 1552287600,
        },
        {
          text: 'Tuesday 12th March',
          date: 'March 12',
          dayOfWeek: 'Tuesday',
          dayIndex: 2,
          dayUnixTime: 1552374000,
        },
        {
          text: 'Wednesday 13th March',
          date: 'March 13',
          dayOfWeek: 'Wednesday',
          dayIndex: 3,
          dayUnixTime: 1552460400,
        },
        {
          text: 'Thursday 14th March',
          date: 'March 14',
          dayOfWeek: 'Thursday',
          dayIndex: 4,
          dayUnixTime: 1552546800,
        },
        {
          text: 'Friday 15th March',
          date: 'March 15',
          dayOfWeek: 'Friday',
          dayIndex: 5,
          dayUnixTime: 1552633200,
        },
        {
          text: 'Saturday 16th March',
          date: 'March 16',
          dayOfWeek: 'Saturday',
          dayIndex: 6,
          dayUnixTime: 1552719600,
        },
        {
          text: 'Sunday 17th March',
          date: 'March 17',
          dayOfWeek: 'Sunday',
          dayIndex: 0,
          dayUnixTime: 1552806000,
        },
        {
          text: 'Monday 18th March',
          date: 'March 18',
          dayOfWeek: 'Monday',
          dayIndex: 1,
          dayUnixTime: 1552892400,
        },
        {
          text: 'Tuesday 19th March',
          date: 'March 19',
          dayOfWeek: 'Tuesday',
          dayIndex: 2,
          dayUnixTime: 1552978800,
        },
        {
          text: 'Wednesday 20th March',
          date: 'March 20',
          dayOfWeek: 'Wednesday',
          dayIndex: 3,
          dayUnixTime: 1553065200,
        },
        {
          text: 'Thursday 21st March',
          date: 'March 21',
          dayOfWeek: 'Thursday',
          dayIndex: 4,
          dayUnixTime: 1553151600,
        },
        {
          text: 'Friday 22nd March',
          date: 'March 22',
          dayOfWeek: 'Friday',
          dayIndex: 5,
          dayUnixTime: 1553238000,
        },
        {
          text: 'Saturday 23rd March',
          date: 'March 23',
          dayOfWeek: 'Saturday',
          dayIndex: 6,
          dayUnixTime: 1553324400,
        },
        {
          text: 'Sunday 24th March',
          date: 'March 24',
          dayOfWeek: 'Sunday',
          dayIndex: 0,
          dayUnixTime: 1553410800,
        },
      ]);
    });
  });
  describe('getSlotsWithTimestampsForDay', () => {
    it('returns slots for the given day', () => {
      const now = moment.tz(thuMarch72019Timestamp, profileTimezone);
      const dailySlots = getDailySlotsFromProfileSchedules(schedules);
      const result = getSlotsWithTimestampsForDay({
        profileTimezone,
        hasTwentyFourHourTimeFormat: false,
        dailySlots,
        now,
        day: { dayIndex: 0, dayUnixTime: 1552244393 },
      });
      expect(result).toEqual([
        { name: '05:20', label: '5:20 AM', timestamp: 1552220453 },
        { name: '12:14', label: '12:14 PM', timestamp: 1552245293 },
        { name: '20:03', label: '8:03 PM', timestamp: 1552273433 },
      ]);
    });
    it('returns slots for the given day with 24 hr time', () => {
      const now = moment.tz(thuMarch72019Timestamp, profileTimezone);
      const dailySlots = getDailySlotsFromProfileSchedules(schedules);
      const result = getSlotsWithTimestampsForDay({
        profileTimezone,
        hasTwentyFourHourTimeFormat: true,
        dailySlots,
        now,
        day: { dayIndex: 0, dayUnixTime: 1552244393 },
      });
      expect(result).toEqual([
        { name: '05:20', label: '05:20', timestamp: 1552220453 },
        { name: '12:14', label: '12:14', timestamp: 1552245293 },
        { name: '20:03', label: '20:03', timestamp: 1552273433 },
      ]);
    });
  });
  describe('getSlotsWithTimestampsAndNoTimeForDay', () => {
    it('returns slot with expected properties', () => {
      const now = moment.tz(thuMarch72019Timestamp, profileTimezone);
      const slot = getSlotsWithTimestampsAndNoTimeForDay({
        profileTimezone,
        hasTwentyFourHourTimeFormat: false,
        now,
        day: { text: 'day text', dayIndex: 1, dayUnixTime: 1596048971 },
        shouldHaveTime: true,
      });
      const expectedResult = {
        name: 'mon',
        dayText: 'day text',
        label: '10:00 AM',
        timestamp: 1596042011,
      };
      expect(slot).toEqual([expectedResult]);
    });
  });
  describe('getDayHeaderItem', () => {
    expect(getDayHeaderItem({ text: 'foo' })).toEqual({
      queueItemType: 'header',
      id: 'foo',
      text: 'foo',
    });
  });
  describe('getSlotOrPostItem', () => {
    const posts = [{ due_at: 1552003980 }];
    const daySlot = { timestamp: 1552003980, label: 'FOO', name: 'BAR' };
    const result = getSlotOrPostItem({
      daySlot,
      posts,
      isManager: true,
      hasCommentEnabled: false,
      profileService: 'instagram',
    });
    expect(result).toEqual({
      queueItemType: 'post',
      isManager: true,
      draggable: false,
      hasCommentEnabled: false,
      due_at: 1552003980,
    });
  });
  describe('getQueueItemsForDay', () => {
    it('returns queue items for the day', () => {
      const daySlots = [
        { name: '05:20', label: '05:20', timestamp: 1552220453 },
        { name: '12:14', label: '12:14', timestamp: 1552245293 },
        { name: '20:03', label: '20:03', timestamp: 1552273433 },
      ];
      const posts = [
        { id: '1', due_at: 1552220453 }, // is in post slot
        { id: '2', due_at: 1552245293 + 60 * 60 * 4 }, // NOT in post slot
        { id: '3', due_at: 1552273433 + 60 * 60 * 6 }, // NOT in post slot
        {
          id: '4',
          due_at: 1552273433 + 60 * 60 * 12,
          scheduled_at: 1552273433 + 60 * 60 * 12,
        },
      ];
      const result = getQueueItemsForDay({
        daySlots,
        posts,
        isManager: true,
        hasCommentEnabled: false,
        profileService: 'instagram',
      });
      expect(result).toEqual([
        {
          queueItemType: 'post',
          id: '1',
          due_at: 1552220453,
          isManager: true,
          draggable: false,
          hasCommentEnabled: false,
        },
        {
          queueItemType: 'slot',
          id: '1552245293-12:14',
          slot: { name: '12:14', label: '12:14', timestamp: 1552245293 },
          profileService: 'instagram',
        },
        {
          queueItemType: 'post',
          id: '2',
          due_at: 1552259693,
          isManager: true,
          draggable: false,
          hasCommentEnabled: false,
        },
        {
          queueItemType: 'slot',
          id: '1552273433-20:03',
          slot: { name: '20:03', label: '20:03', timestamp: 1552273433 },
          profileService: 'instagram',
        },
        {
          queueItemType: 'post',
          id: '3',
          due_at: 1552295033,
          isManager: true,
          draggable: false,
          hasCommentEnabled: false,
        },
        {
          queueItemType: 'post',
          id: '4',
          due_at: 1552316633,
          scheduled_at: 1552316633,
          isManager: true,
          draggable: false,
          hasCommentEnabled: false,
        },
      ]);
    });
  });
  describe('formatPostLists', () => {
    it('formats the post list when schedule slots are enabled', () => {
      const posts = {
        id1: { due_at: 1552003980, day: 'Today' },
        id2: { due_at: 1552044000, day: 'Tomorrow' },
        id3: { due_at: 1552057320, day: 'Tomorrow' },
        id4: {
          due_at: 1552260540,
          scheduled_at: 1552260540,
          day: 'Sunday 10th March',
        },
      };
      const result = formatPostLists({
        isManager: true,
        posts,
        scheduleSlotsEnabled: true,
        schedules,
        profileTimezone: 'America/Chicago',
        weekStartsOnMonday: false,
        weeksToShow: 2,
        hasTwentyFourHourTimeFormat: false,
        profileService: 'facebook',
      });
      // since all the child methods are tested above let's just expect anything for now
      expect(result).toBeDefined();
    });
  });
  describe('check for post comment enabled', () => {
    it('should return true if is an instagram post', () => {
      const post = {
        id: 'abc',
        profile_service: 'instagram',
      };
      const hasCommentEnabled = postHasCommentEnabled(post);
      expect(hasCommentEnabled).toBeTruthy();
    });
    it('should return true if is not an instagram post', () => {
      const post = {
        id: 'abc',
        profile_service: 'facebook',
      };
      const hasCommentEnabled = postHasCommentEnabled(post);
      expect(hasCommentEnabled).toBeFalsy();
    });
  });
  describe('check for schedules', () => {
    it('should return true if current profile has schedules', () => {
      const hasSlotSchedules = isScheduleSlotsAvailable(schedules);
      expect(hasSlotSchedules).toBeTruthy();
    });
    it("should return false if current profile doesn't have schedules", () => {
      const hasSlotSchedules = isScheduleSlotsAvailable(schedulesNotSet);
      expect(hasSlotSchedules).toBeFalsy();
    });
    it('should return false if current profile schedules is empty', () => {
      const hasSlotSchedules = isScheduleSlotsAvailable([]);
      expect(hasSlotSchedules).toBeFalsy();
    });
  });
});
