const { getDateString, isInThePast } = require('../formatters');

const getStoryAction = ({ scheduledAt, timezone, options }) => {
  const dateString = getDateString(scheduledAt, timezone, options);
  return `You will receive a reminder ${dateString} when it's time to post.`;
};

const parseStories = stories =>
  stories.map(story => {
    story.order = parseInt(story.order, 10);
    return story;
  });

module.exports = storyGroup => {
  const isPastDue = isInThePast(storyGroup.scheduled_at);

  return {
    id: storyGroup.id,
    day: storyGroup.day,
    createdAt: storyGroup.created_at,
    scheduled_at: storyGroup.scheduled_at,
    scheduledAt: storyGroup.scheduled_at,
    // Add to fix issue with missing due_at in queue utils in formatPostLists
    due_at: storyGroup.scheduled_at,
    isPastDue,
    type: 'storyGroup',
    profileId: storyGroup.profile_id,
    profileTimezone: storyGroup.profile_timezone,
    storyDetails: {
      creatorName: storyGroup.user_name,
      avatarUrl: storyGroup.user_avatar,
      dueTime: storyGroup.due_time,
      createdAt: getDateString(
        storyGroup.created_at,
        storyGroup.profile_timezone,
        {
          twentyFourHourTime: storyGroup.twentyfour_hour_time,
        }
      ),
      error: storyGroup.error_message,
      errorLink: storyGroup.error_link,
      status: storyGroup.status,
      stories: parseStories(storyGroup.stories),
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
