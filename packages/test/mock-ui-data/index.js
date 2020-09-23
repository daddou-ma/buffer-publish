const draftDetails = {
  avatarUrl:
    'https://buffer-uploads.s3.amazonaws.com/510521020a19000b6a00001e/a476fed03b1de4e06563d6063d7d3ee0.jpg',
  createdAt: 'on March 2nd at 12:45pm (GMT)',
  email: 'ash@buffer.com',
  isRetweet: false,
  postAction: 'This post will be added to the queue',
  creatorName: 'Ash',
  via: 'web',
};

const postDetails = {
  postAction: 'This post was sent May 2nd',
  isRetweet: false,
};

const queueHeader = {
  queueItemType: 'header',
  text: 'Today',
  id: 'header-1',
  dayOfWeek: 'Today',
  date: 'May 2',
};

const storyDetails = {
  avatarUrl:
    'https://secure.gravatar.com/avatar/03cd143dc214b358e032de8a136a6027?s=40&d=mm',
  createdAt: 'today at 10:57 AM (BST)',
  creatorName: 'mayita.uribe',
  dueTime: '10:00 am',
  status: 'scheduled',
  storyAction:
    "You will receive a reminder September 17th at 10:00 AM (BST) when it's time to post.",
  stories: [
    {
      _id: '5d8365258943cc4bc52d94cd',
      id: '5d8365258943cc4bc52d94cd',
      note: 'Puchi happy',
      type: 'image',
      order: 1,
      asset_url:
        'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9477869bb3305737a3f2/dd3a25447a6e5c305ae40e08388e5bc2.original.jpg',
      thumbnail_url:
        'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9477869bb3305737a3f2/dd3a25447a6e5c305ae40e08388e5bc2.original.jpg',
    },
    {
      _id: '5d83653d8943cc4bc52d94ce',
      id: '5d83653d8943cc4bc52d94ce',
      note: 'Note',
      type: 'image',
      order: 2,
      asset_url:
        'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9c64869bb331a32f5552/7f6dd5f725507d760a782527adacb055.original.jpg',
      thumbnail_url:
        'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9c64869bb331a32f5552/7f6dd5f725507d760a782527adacb055.original.jpg',
    },
    {
      _id: '5d8365528943cc4bc52d94cf',
      id: '5d8365528943cc4bc52d94cf',
      note: 'Puchi note',
      type: 'image',
      order: 3,
      asset_url:
        'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d4982176826f315ed1e79ba/f458295a6daad1c702af20c0b013defd.original.jpg',
      thumbnail_url:
        'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d4982176826f315ed1e79ba/f458295a6daad1c702af20c0b013defd.original.jpg',
    },
  ],
};

const queueItems = ({ isSent, isPastReminder, isDraft, isStory }) => [
  ...(isDraft ? [] : [queueHeader]),
  {
    queueItemType: 'post',
    id: '590a365d749c2018007b23c6',
    isConfirmingDelete: false,
    isDeleting: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    postContent: {
      imageUrls: [],
      linkAttachment: {},
      links: [],
      retweetCommentLinks: [],
      text: 'New thing',
      type: isStory ? 'storyGroup' : 'text',
    },
    draftDetails: isDraft ? draftDetails : undefined,
    postDetails: isDraft || isStory ? undefined : postDetails,
    storyDetails: isStory ? storyDetails : undefined,
    retweetCommentLinks: [],
    sent: isSent,
    isPastReminder,
    text: 'New thing',
    type: isStory ? 'storyGroup' : 'text',
    statistics: {
      retweets: 10,
      favorites: 29,
      mentions: 0,
      clicks: 1,
      reach: 3,
    },
    day: 'Tuesday 12th February',
    dueTime: '9:02 am',
  },
  {
    queueItemType: 'post',
    id: '590a3693749c200e007b23c7',
    isConfirmingDelete: false,
    isDeleting: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    postContent: {
      imageUrls: [],
      linkAttachment: {},
      links: [],
      retweetCommentLinks: [],
      text: 'Another thing, that is also new',
      type: isStory ? 'storyGroup' : 'text',
    },
    draftDetails: isDraft ? draftDetails : undefined,
    postDetails: isDraft || isStory ? undefined : postDetails,
    storyDetails: isStory ? storyDetails : undefined,
    retweetCommentLinks: [],
    sent: isSent,
    isPastReminder,
    text: 'Another thing, that is also new',
    type: isStory ? 'storyGroup' : 'text',
    statistics: {
      retweets: 10,
      favorites: 29,
      mentions: 0,
      clicks: 1,
      reach: 3,
    },
    day: 'Tuesday 12th February',
    dueTime: '9:02 am',
  },
  ...(isDraft ? [] : [queueHeader]),
  {
    queueItemType: 'post',
    id: '590a365d749c2018007b23c8',
    isConfirmingDelete: false,
    isDeleting: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    postContent: {
      imageUrls: [],
      linkAttachment: {},
      links: [],
      retweetCommentLinks: [],
      text: 'New thing',
      type: isStory ? 'storyGroup' : 'text',
    },
    draftDetails: isDraft ? draftDetails : undefined,
    postDetails: isDraft || isStory ? undefined : postDetails,
    storyDetails: isStory ? storyDetails : undefined,
    retweetCommentLinks: [],
    sent: isSent,
    isPastReminder,
    text: 'New thing',
    type: isStory ? 'storyGroup' : 'text',
    statistics: {
      retweets: 10,
      favorites: 29,
      mentions: 0,
      clicks: 1,
      reach: 3,
    },
    day: 'Tuesday 12th February',
    dueTime: '9:02 am',
  },
  {
    queueItemType: 'post',
    id: '590a3693749c200e007b239',
    isConfirmingDelete: false,
    isDeleting: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    postContent: {
      imageUrls: [],
      linkAttachment: {},
      links: [],
      retweetCommentLinks: [],
      text: 'Another thing, that is also new',
      type: isStory ? 'storyGroup' : 'text',
    },
    draftDetails: isDraft ? draftDetails : undefined,
    postDetails: isDraft || isStory ? undefined : postDetails,
    storyDetails: isStory ? storyDetails : undefined,
    retweetCommentLinks: [],
    sent: isSent,
    isPastReminder,
    text: 'Another thing, that is also new',
    type: isStory ? 'storyGroup' : 'text',
    statistics: {
      retweets: 10,
      favorites: 29,
      mentions: 0,
      clicks: 1,
      reach: 3,
    },
    day: 'Tuesday 12th February',
    dueTime: '9:02 am',
  },
];

const gridItems = [
  {
    id: '5c829d3e38da0900fe311142',
    thumbnail:
      'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5c829d3838da0900d16ee5e4/3a9dd6c260165524ba20b2fd174a0873.original.jpg',
    sent_at: 1552569720,
    scheduled: false,
    link: null,
  },
  {
    id: '5c8284f138da0900470d81a2',
    thumbnail:
      'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5c827fa938da09002100e972/7d8cce873bd0da0d10a4aeb683f99149.original.jpg',
    due_at: 1553276340,
    scheduled: true,
    link: 'https://www.page.com',
  },
];

export { queueItems, gridItems };
