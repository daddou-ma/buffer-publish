export const postLists = [
  {
    queueItemType: 'header',
    text: 'Today',
    id: 'header-1',
    dayOfWeek: 'Today',
    date: 'May 2',
  },
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
      type: 'text',
    },
    postDetails: {
      postAction: 'This post is scheduled for May 2nd',
      isRetweet: false,
      error: '',
    },
    retweetCommentLinks: [],
    sent: false,
    text: 'New thing',
    type: 'text',
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
      type: 'text',
    },
    postDetails: {
      postAction: 'This post is scheduled for May 2nd',
      isRetweet: false,
      error: '',
    },
    retweetCommentLinks: [],
    sent: false,
    text: 'Another thing, that is also new',
    type: 'text',
  },
  {
    queueItemType: 'header',
    text: 'Tuesday May 3rd',
    id: 'header-2',
    dayOfWeek: 'Tuesday',
    date: 'May 3',
  },
  {
    queueItemType: 'post',
    id: '590a365d749c2018007b23c1',
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
      type: 'text',
    },
    postDetails: {
      postAction: 'This post is scheduled for May 3rd',
      isRetweet: false,
      error: '',
    },
    retweetCommentLinks: [],
    sent: false,
    text: 'New thing',
    type: 'text',
  },
  {
    queueItemType: 'post',
    id: '590a3693749c200e007b23c2',
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
      type: 'text',
    },
    postDetails: {
      postAction: 'This post is scheduled for May 3rd',
      isRetweet: false,
      error: '',
    },
    retweetCommentLinks: [],
    sent: false,
    text: 'Another thing, that is also new',
    type: 'text',
  },
];

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

export const postListsNoHeaders = [
  {
    queueItemType: 'post',
    id: '590a365d749c2018007b23c6',
    hasPermission: true,
    isConfirmingDelete: false,
    isDeleting: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    draftDetails,
    retweetCommentLinks: [],
    sent: false,
    postContent: {
      imageUrls: [],
      linkAttachment: {},
      links: [],
      retweetCommentLinks: [],
      text: 'New thing',
      type: 'text',
    },
    text: 'New thing',
    type: 'text',
    view: 'drafts',
  },
  {
    queueItemType: 'post',
    id: '590a3693749c200e007b23c7',
    hasPermission: true,
    isConfirmingDelete: false,
    isDeleting: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    draftDetails,
    retweetCommentLinks: [],
    sent: false,
    postContent: {
      imageUrls: [],
      linkAttachment: {},
      links: [],
      retweetCommentLinks: [],
      text: 'Another thing, that is also new',
      type: 'text',
    },
    text: 'Another thing, that is also new',
    type: 'text',
    view: 'drafts',
  },
  {
    queueItemType: 'post',
    id: '590a365d749c2018007b23c1',
    hasPermission: true,
    isConfirmingDelete: false,
    isDeleting: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    draftDetails,
    retweetCommentLinks: [],
    sent: false,
    postContent: {
      imageUrls: [],
      linkAttachment: {},
      links: [],
      retweetCommentLinks: [],
      text: 'New thing',
      type: 'text',
    },
    text: 'New thing',
    type: 'text',
    view: 'drafts',
  },
  {
    queueItemType: 'post',
    id: '590a3693749c200e007b23c2',
    hasPermission: true,
    isConfirmingDelete: false,
    isDeleting: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    draftDetails,
    retweetCommentLinks: [],
    sent: false,
    postContent: {
      imageUrls: [],
      linkAttachment: {},
      links: [],
      retweetCommentLinks: [],
      text: 'Another thing, that is also new',
      type: 'text',
    },
    text: 'Another thing, that is also new',
    type: 'text',
    view: 'drafts',
  },
];
