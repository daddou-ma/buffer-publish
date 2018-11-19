const instagramConfig = {
  posts_count: {
    label: 'Posts',
    key: 'posts_count',
    color: '#3A92D3',
  },

  likes: {
    label: 'Likes',
    key: 'likes',
    color: '#FD8F90',
  },

  comments: {
    label: 'Comments',
    key: 'comments',
    color: '#EFDF00',
  },

  followers: {
    label: 'Total Fans',
    key: 'followers',
    color: '#FDA3F3',
  },

  new_followers: {
    label: 'New Fans',
    key: 'new_followers',
    color: '#D7B5FD',
  },
};

module.exports = {
  instagram: {
    config: instagramConfig,
    orderedKeys: [
      'posts_count',
      'likes',
      'comments',
      'followers',
      'new_followers',
    ],
  },
};
