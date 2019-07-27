import { QueueingTypes } from '../AppConstants';

const getComposerSource = ({ tabId, emptySlotMode }) => {
  let sourceName = null;
  switch (tabId) {
    case 'queue':
      /* emptyslotmode is true when a user opens the composer from an empty slot,
      which allows us to know the source is queue_list */
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

const getPostShareType = (type) => {
  let shareType = null;
  switch (type) {
    case QueueingTypes.QUEUE:
      shareType = 'queue';
      break;
    case QueueingTypes.NEXT:
      shareType = 'share_next';
      break;
    case QueueingTypes.NOW:
      shareType = 'share_now';
      break;
    case QueueingTypes.CUSTOM:
      shareType = 'custom';
      break;
    case QueueingTypes.ADD_DRAFT:
      shareType = 'draft';
      break;
    case QueueingTypes.NEXT_DRAFT:
      shareType = 'draft_share_next';
      break;
    case QueueingTypes.CUSTOM_DRAFT:
      shareType = 'draft_custom';
      break;
    default:
      shareType = type;
      break;
  }
  return shareType;
};

const formatShareDate = (shareDate) => {
  if (shareDate) {
    const jsDate = new Date(shareDate * 1000);
    return jsDate ? jsDate.toISOString() : null;
  }
  return null;
};

const getSegmentMetadata = ({
  post = {},
  profile = {},
  formattedData = {},
  composerSource,
  queueingType,
}) => ({
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
  shareDate: formatShareDate(post.due_at),
  shareType: getPostShareType(queueingType),
});

export { getComposerSource, getSegmentMetadata };
