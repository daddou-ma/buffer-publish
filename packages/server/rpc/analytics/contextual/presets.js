/*
 * Contextual Presets configuraton
 */

module.exports = {
  facebook: {
    weekly_engagement: {
      label: 'When is it most effective to post?',
      description:
        'Discover which days your audience engages the most with your content.',
      hideDate: true,
      rewardWording:
        'On {category}, your content earned an average engagement rate of {value}%.',
      type: 'column',
    },
    content_type: {
      label: 'What type of content is working?',
      description:
        'Find out what type of content reasonates well with your audience.',
      hideDate: true,
      showMetricsList: true,
      rewardWording: 'Your {category} posts earned on average:',
      type: 'column',
    },
    frequency_engagement: {
      label: 'How does post frequency affect my engagement rate?',
      description:
        'Learn how your posting frequency encourages users to engage with your content.',
      showUpdatesCount: true,
      rewardWording: 'that earned an average engagement rate of {value}%.',
    },
    followers_posts: {
      label: 'How does post frequency affect my fan count?',
      description:
        'Discover how your posting frequency affects your fan count.',
      showUpdatesCount: true,
      rewardWording: 'and you {gained|lost} {value} [+new] fans.',
    },
    reach_posts: {
      label: 'How does post frequency affect the reach per post?',
      description: 'Discover how your posting frequency affects your reach.',
      showUpdatesCount: true,
      rewardWording: 'that earned an average reach of {value} people.',
    },
  },
  instagram: {
    weekly_engagement: {
      label: 'When is it most effective to post?',
      description:
        'Discover which days your audience engages the most with your content.',
      hideDate: true,
      rewardWording:
        'On {category}, your content earned an average engagement rate of {value}%.',
      type: 'column',
    },
    frequency_engagement: {
      label: 'How does post frequency affect my engagement rate?',
      description:
        'Learn how your posting frequency encourages users to engage with your content.',
      showUpdatesCount: true,
      rewardWording: 'that earned an average engagement rate of {value}%.',
    },
    followers_posts: {
      label: 'How does post frequency affect my fan count?',
      description:
        'Discover how your posting frequency affects your fan count.',
      showUpdatesCount: true,
      rewardWording: 'and you {gained|lost} {value} [+new] fans.',
    },
    reach_posts: {
      label: 'How does post frequency affect the reach per post?',
      description: 'Discover how your posting frequency affects your reach.',
      showUpdatesCount: true,
      rewardWording: 'that earned an average reach of {value} people.',
    },
  },
  twitter: {
    weekly_engagement: {
      label: 'When is it most effective to post?',
      description:
        'Discover which days your audience engages the most with your content.',
      hideDate: true,
      rewardWording:
        'On {category}, your content earned an average engagement rate of {value}%.',
      type: 'column',
    },
    frequency_engagement: {
      label: 'How does post frequency affect my engagement rate?',
      description:
        'Learn how your posting frequency encourages users to engage with your content.',
      showUpdatesCount: true,
      rewardWording: 'that earned an average engagement rate of {value}%.',
    },
    followers_posts: {
      label: 'How does post frequency affect my fan count?',
      description:
        'Discover how your posting frequency affects your fan count.',
      showUpdatesCount: true,
      rewardWording: 'and you {gained|lost} {value} [+new] fans.',
    },
  },
};
