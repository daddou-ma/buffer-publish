import { SEGMENT_NAMES, CLIENT_NAME } from '@bufferapp/publish-constants';
import getCtaProperties from '@bufferapp/publish-analytics-middleware/utils/CtaStrings';

const getStoryGroupCounts = (stories = []) => {
  const imageCount = stories.filter(story => story.type === 'image').length;
  const videoCount = stories.filter(story => story.type === 'video').length;
  const noteCount = stories.filter(story => story.note && story.note.length > 0).length;

  return {
    imageCount,
    videoCount,
    noteCount,
    mediaCount: imageCount + videoCount,
  };
};

export const getCreateSGTrackingData = ({ storyGroup, channel = {} }) => {
  const { stories } = storyGroup.storyDetails;
  const counts = getStoryGroupCounts(stories);
  const ctaProperties = getCtaProperties(SEGMENT_NAMES.STORIES_CREATE_STORY_GROUP);
  return {
    storyGroupId: storyGroup.id,
    channel: channel.type,
    channelServiceId: channel.serviceId,
    channelId: storyGroup.profileId,
    scheduledAt: JSON.stringify(storyGroup.scheduledAt),
    clientId: null,
    clientName: CLIENT_NAME,
    ...counts,
    ...ctaProperties,
  };
};
