import getCtaProperties from '@bufferapp/publish-analytics-middleware/utils/CtaStrings';

export const getCounts = (stories = []) => {
  const imageCount = stories.filter(story => story.type === 'image').length;
  const videoCount = stories.filter(story => story.type === 'video').length;
  const noteCount = stories.filter(story => story.note && story.note.length > 0)
    .length;

  return {
    imageCount,
    videoCount,
    noteCount,
    mediaCount: imageCount + videoCount,
  };
};

export const getSGTrackingData = ({ storyGroup, channel = {}, cta }) => {
  const { stories } = storyGroup.storyDetails;
  const counts = getCounts(stories);
  const ctaProperties = getCtaProperties(cta);
  return {
    storyGroupId: storyGroup.id,
    channel: channel.type,
    channelServiceId: channel.serviceId,
    channelId: storyGroup.profileId,
    scheduledAt: JSON.stringify(storyGroup.scheduledAt),
    clientId: null,
    ...counts,
    ...ctaProperties,
  };
};

export const getNoteTrackingData = ({
  storyGroupId,
  channel = {},
  note = '',
  cta,
}) => {
  const ctaProperties = getCtaProperties(cta);
  return {
    storyGroupId,
    channel: channel.type,
    channelServiceId: channel.serviceId,
    channelId: channel.id,
    noteText: note,
    characterCount: note.length,
    clientId: null,
    ...ctaProperties,
  };
};

export const getStory = ({ stories = [], order }) =>
  stories.find(story => story.order === order);
