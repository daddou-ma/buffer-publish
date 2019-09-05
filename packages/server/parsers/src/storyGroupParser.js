const { getDateString, isInThePast } = require('../../formatters/src')

module.exports = post => {
  const isPastDue = isInThePast(post.scheduled_at)

  return {
    day: post.day,
    id: post.id,
    createdAt: post.created_at,
    scheduled_at: post.scheduled_at,
    scheduledAt: post.scheduled_at,
    isPastDue,
    type: 'storyGroup',
    storyDetails: {
      creatorName: 'Joel', // TODO: include creator name
      avatarUrl: 'https://pbs.twimg.com/profile_images/988613046510628866/Io1ZQUpy_400x400.jpg', // TODO: include avatarUrl
      createdAt: getDateString(post.created_at, post.profile_timezone, {
        twentyFourHourTime: post.twentyfour_hour_time,
      }),
      status: post.status,
      stories: post.stories,
      twentyfourHourTime: post.twentyfour_hour_time,
      storyAction: `You will receive a reminder on ${post.day} when it's time to post.`,
    }
  };
};
