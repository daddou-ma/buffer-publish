export const posts = [
  {
    id: '590a365d749c2018007b23c6',
    isConfirmingDelete: false,
    isDeleting: false,
    isLightboxOpen: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    postDetails: {
      postAction: 'This post is scheduled for May 3rd',
      isRetweet: false,
      error: '',
    },
    retweetCommentLinks: [],
    sent: false,
    text: 'New thing',
    type: 'text',
    statistics: {
      retweets: 10,
      favorites: 29,
      mentions: 0,
      clicks: 1,
      reach: 3,
    },
  },
  {
    id: '590a3693749c200e007b23c7',
    isConfirmingDelete: false,
    isDeleting: false,
    isLightboxOpen: false,
    isWorking: false,
    imageUrls: [],
    links: [],
    linkAttachment: {},
    postDetails: {
      postAction: 'This post is scheduled for May 3rd',
      isRetweet: false,
      error: '',
    },
    retweetCommentLinks: [],
    sent: false,
    text: 'Another thing, that is also new',
    type: 'text',
    statistics: {
      retweets: 10,
      favorites: 29,
      mentions: 0,
      clicks: 1,
      reach: 3,
    },
  },
];

export const linkPosts = posts.map(post => ({
  ...post,
  links: [
    {
      rawString: 'http://buff.ly/1LTbUqv',
      displayString: 'http://buff.ly/1LTbUqv',
      url:
        'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
      indices: [74, 96],
    },
  ],
  linkAttachment: {
    title: 'What is a Product Designer?',
    description:
      'A brief history at how history and markets influence design titles',
    url:
      'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
    thumbnailUrl:
      'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
  },
  postDetails: {
    postAction: 'This post is scheduled for 9:42pm (GMT)',
    error: '',
  },
  text:
    'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv',
  type: 'link',
}));

export const missingTypePosts = posts.map(post => ({
  ...post,
  type: undefined,
}));

export const sentPosts = posts.map(post => ({
  ...post,
  sent: true,
}));

export const pastRemindersPosts = posts.map(post => ({
  ...post,
  day: 'Today',
  dueTime: '10:13 pm',
}));

export const imagePosts = posts.map(post => ({
  ...post,
  imageSrc:
    'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
  type: 'image',
}));

export const multipleImagePosts = posts.map(post => ({
  ...post,
  imageUrls: [
    'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
    'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
    'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
    'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
  ],
  type: 'multipleImage',
}));

export const videoPosts = posts.map(post => ({
  ...post,
  imageSrc:
    'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
  type: 'video',
}));

export const confirmDeletePosts = posts.map(post => ({
  ...post,
  isConfirmingDelete: true,
}));

export const listHeader = 'List Header';
