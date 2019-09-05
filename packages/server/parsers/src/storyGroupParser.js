const { getDateString, isInThePast } = require('../../formatters/src')

module.exports = (storyGroup) => {
  const isPastDue = isInThePast(storyGroup.scheduled_at)

  return {
    day: storyGroup.day,
    id: storyGroup.id,
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
      storyAction: `You will receive a reminder on ${storyGroup.day} when it's time to post.`,
    }
  };
};
