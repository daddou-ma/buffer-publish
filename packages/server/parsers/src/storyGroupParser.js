const { getDateString, isInThePast } = require('../../formatters/src');


const getStoryAction = ({ scheduledAt, timezone, options }) => {
  const dateString = getDateString(scheduledAt, timezone, options);
  return `You will receive a reminder ${dateString} when it's time to post.`;
};

module.exports = (storyGroup) => {
  const isPastDue = isInThePast(storyGroup.scheduled_at);

  return {
    id: storyGroup.id,
    day: storyGroup.day,
    createdAt: storyGroup.created_at,
    scheduled_at: storyGroup.scheduled_at,
    scheduledAt: storyGroup.scheduled_at,
    isPastDue,
    type: 'storyGroup',
    profileId: storyGroup.profile_id,
    profileTimezone: storyGroup.profile_timezone,
    storyDetails: {
      creatorName: storyGroup.user_name,
      avatarUrl: storyGroup.user_avatar,
      dueTime: storyGroup.due_time,
      createdAt: getDateString(storyGroup.created_at, storyGroup.profile_timezone, {
        twentyFourHourTime: storyGroup.twentyfour_hour_time,
      }),
      status: storyGroup.status,
      stories: storyGroup.stories,
      twentyfourHourTime: storyGroup.twentyfour_hour_time,
      storyAction: getStoryAction({
        scheduledAt: storyGroup.scheduled_at,
        timezone: storyGroup.profile_timezone,
        options: {
          twentyFourHourTime: storyGroup.twentyfour_hour_time,
          createdAt: storyGroup.created_at,
        },
      }),
    },
  };
};
