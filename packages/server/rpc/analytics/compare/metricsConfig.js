const twitterConfig = {
  posts_count: {
    label: 'Tweets',
    color: '#ced7df',
  },

  impressions: {
    label: 'Impressions',
    color: '#FEC78B',
  },

  engagements: {
    label: 'Engagements',
    color: '#3A92D3',
  },

  retweets: {
    label: 'Retweets',
    color: '#FD8F90',
  },

  favorites: {
    label: 'Likes',
    color: '#8FC6DB',
  },

  url_clicks: {
    label: 'Clicks',
    color: '#98E8B2',
  },

  replies: {
    label: 'Replies',
    color: '#D2C3AB',
  },

  followers: {
    label: 'Total Followers',
    color: '#FDA3F3',
  },
  new_followers: {
    label: 'New Followers',
    color: '#D7B5FD',
  },

  engagement_rate: {
    label: 'Engagement Rate',
    color: '#98E8B2',
  },
};

const facebookConfig = {
  posts_count: {
    label: 'Posts',
    color: '#3A92D3',
  },

  page_engagements: {
    label: 'Engagement',
    color: '#FDA3F3',
  },

  post_impressions: {
    label: 'Post Impressions',
    color: '#8AC6DE',
  },

  post_reach: {
    label: 'Post Reach',
    color: '#57aae5',
  },

  post_clicks: {
    label: 'Link Clicks',
    color: '#98E8B2',
  },

  reactions: {
    label: 'Reactions',
    color: '#FD8F90',
  },

  shares: {
    label: 'Shares',
    color: '#D2C3AB',
  },

  comments: {
    label: 'Comments',
    color: '#EFDF00',
  },

  followers: {
    label: 'Total Fans',
    color: '#FDA3F3',
  },

  new_followers: {
    label: 'New Fans',
    color: '#D7B5FD',
  },

  engagement_rate: {
    label: 'Engagement Rate',
    color: '#98E8B2',
  },
};

const instagramConfig = {
  posts_count: {
    label: 'Posts',
    color: '#3A92D3',
  },

  impressions: {
    label: 'Impressions',
    color: '#8AC6DE',
  },

  reach: {
    label: 'Reach',
    color: '#57AAE5',
  },

  likes: {
    label: 'Likes',
    color: '#FDA3F3',
  },

  comments: {
    label: 'Comments',
    color: '#EFDF00',
  },

  saved: {
    label: 'Post Saves',
    color: '#FD8F90',
  },

  video_views: {
    label: 'Video Views',
    color: '#D2C3AB',
  },

  followers: {
    label: 'Total Fans',
    color: '#FDA3F3',
  },

  new_followers: {
    label: 'New Fans',
    color: '#D7B5FD',
  },

  engagement_rate: {
    label: 'Engagement Rate',
    color: '#98E8B2',
  },
};

module.exports = {
  twitter: {
    config: twitterConfig,
    orderedKeys: [
      'followers',
      'posts_count',
      'impressions',
      'engagements',
      'retweets',
      'favorites',
      'url_clicks',
      'replies',
      'new_followers',
      'engagement_rate',
    ],
  },
  facebook: {
    config: facebookConfig,
    orderedKeys: [
      'followers',
      'posts_count',
      'page_engagements',
      'post_impressions',
      'post_reach',
      'post_clicks',
      'reactions',
      'shares',
      'comments',
      'new_followers',
      'engagement_rate',
    ],
  },
  instagram: {
    config: instagramConfig,
    orderedKeys: [
      'followers',
      'posts_count',
      'impressions',
      'reach',
      'likes',
      'comments',
      'saved',
      'video_views',
      'new_followers',
      'engagement_rate',
    ],
  },
};
