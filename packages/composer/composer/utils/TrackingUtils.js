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
  channelId: post.profile_id,
  channelNetwork: post.profile_service,
  channelType: profile.serviceType,
  client: post.client ? post.client.website : null,
  composerSource,
  hasFirstComment: !!post.comment_text,
  hasLocation: !!post.service_geolocation_id,
  hasShopGridLink: !!formattedData.link,
  isDraft: !!post.commentText,
  mediaType: post.type,
  postId: post.id,
  product: 'publish',
  shareDate: post.due_at,
});

export { getComposerSource, getSegmentMetadata };
