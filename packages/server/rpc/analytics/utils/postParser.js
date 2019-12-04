const { getDateString } = require('../utils/date');
const { parseTwitterLinks } = require('./linkParsing');

const getImageUrls = post => {
  if (!(post.media && post.media.picture && post.extra_media)) return [];
  const imageUrls = post.extra_media.map(media => media.photo);

  imageUrls.unshift(post.media.picture);
  return imageUrls;
};

const getPostActionString = ({ post }) => {
  const timestampToConvert = post.sent_at || post.due_at;
  // due_at set to 0 when user has no scheduled posting times
  if (timestampToConvert === 0) {
    return 'NO TIME SET';
  }
  const dateString = getDateString(timestampToConvert, post.profile_timezone, {
    twentyFourHourTime: post.twentyfour_hour_time,
  });
  return `This post ${post.sent_at ? 'was' : 'will be'} sent ${dateString}.`;
};

const getPostDetails = ({ post }) => ({
  postAction: getPostActionString({ post }),
  isRetweet: post.retweet !== undefined,
});

const getRetweetProfileInfo = post => {
  const retweet = post.retweet;
  if (!retweet) {
    return undefined;
  }

  return {
    name: retweet.profile_name,
    handle: `@${retweet.username}`,
    avatarUrl: retweet.avatars.https,
  };
};

const getPostType = ({ post }) => {
  if (!post.media || post.retweet) {
    return 'text';
  } else if (post.media && post.media.picture && !post.extra_media) {
    return 'image';
  } else if (post.media && post.media.picture && post.extra_media) {
    return 'multipleImage';
  } else if (post.media && post.media.video) {
    return 'video';
  } else if (post.media && post.media.link) {
    return 'link';
  }
  return 'text';
};

module.exports = {
  postsMapper: post => {
    const media = post.media || {};
    const isVideo = media.video;
    let retweetComment;
    let text;

    if (post.retweet) {
      text = post.retweet.text;
      retweetComment = post.retweet.comment;
    } else {
      text = post.text;
    }
    return {
      day: post.day,
      id: post.id,
      isConfirmingDelete: post.isDeleting && !post.requestingDraftAction,
      isDeleting: post.isDeleting && post.requestingDraftAction,
      isWorking: !post.isDeleting && post.requestingDraftAction,
      imageSrc: isVideo ? media.thumbnail : media.picture,
      imageUrls: getImageUrls(post),
      links: parseTwitterLinks(text),
      profileTimezone: post.profile_timezone,
      linkAttachment: {
        title: media.title,
        url: media.expanded_link,
        description: media.description,
        thumbnailUrl: media.preview,
      },
      postDetails: getPostDetails({ post }),
      retweetComment,
      retweetCommentLinks: parseTwitterLinks(retweetComment),
      retweetProfile: getRetweetProfileInfo(post),
      sent: post.status === 'sent',
      text,
      type: getPostType({ post }),
    };
  },
};
