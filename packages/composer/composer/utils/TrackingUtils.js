const getComposerSource = ({ tabId, emptySlotMode }) => {
  let sourceName = null;
  switch (tabId) {
    case 'queue':
      sourceName = emptySlotMode ? 'queue_list' : 'queue';
      break;
    case 'awaitingApproval':
      sourceName = 'awaiting_approval';
      break;
    case 'drafts':
      sourceName = 'drafts';
      break;
    case 'analytics':
      sourceName = 'share_again';
      break;
    default:
      sourceName = tabId;
      break;
  }
  return sourceName;
};

const getSegmentMetadata = ({ post = {}, profile = {}, formattedData = {}, composerSource }) => ({
  channel: post.profile_service,
  channelId: post.profile_id,
  channelServiceId: profile.serviceId,
  channelType: profile.serviceType,
  client: post.client ? post.client.name : null,
  composerSource,
  hasFirstComment: !!formattedData.comment_text,
  hasLocation: !!formattedData.service_geolocation_id,
  hasShopGridLink: !!formattedData.link,
  isDraft: !!post.draft,
  mediaType: post.type,
  postId: post.id,
  product: 'publish',
  shareDate: post.due_at,
});

export { getComposerSource, getSegmentMetadata };
