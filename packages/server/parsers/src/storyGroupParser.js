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
    storyDetails: {
      creatorName: 'Joel', // TODO: include creator name
      avatarUrl: 'https://pbs.twimg.com/profile_images/988613046510628866/Io1ZQUpy_400x400.jpg', // TODO: include avatarUrl
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
