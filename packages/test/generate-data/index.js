import { build, fake, sequence } from '@jackfranklin/test-data-bot';

const schedules = [
  {
    days: ['sun'],
    times: ['11:00', '15:30'],
  },
  {
    days: ['mon'],
    times: ['11:00', '15:30'],
  },
  {
    days: ['tue'],
    times: ['11:00', '15:30'],
  },
  {
    days: ['wed'],
    times: ['11:00', '15:30'],
  },
  {
    days: ['thu'],
    times: ['11:00', '15:30'],
  },
  {
    days: ['fri'],
    times: ['11:00', '15:30'],
  },
  {
    days: ['sat'],
    times: ['11:00', '15:30'],
  },
];

const buildUser = build('User', {
  fields: {
    id: sequence(s => `user${s}`),
    name: fake(f => f.lorem.words()),
    email: fake(f => f.internet.email()),
    plan: 'business',
    planCode: 11,
    isBusinessUser: true,
    isFreeUser: false,
    features: [
      'instagram',
      'first_comment',
      'stories_groups',
      'twitter-march-18-changes',
    ],
    loaded: true,
    hasCampaignsFeature: true,
    hasTwentyFourHourTimeFormat: false,
    showBusinessTrialistsOnboarding: false,
    hasUserTagFeature: true,
    canStartProTrial: true,
    canModifyCampaigns: true,
    canSeeCampaignsReport: true,
    week_starts_monday: true,
    skip_empty_text_alert: false,
    profileLimit: 50,
    s3_upload_signature: {
      algorithm: '',
      base64policy: '',
      bucket: '',
      credentials: '',
      date: '',
      expires: '',
      signature: '',
      success_action_status: '',
    },
  },
});

const buildOrganization = build('Organization', {
  fields: {
    id: sequence(s => `organization${s}`),
  },
});

const buildProfile = build('Profile', {
  fields: {
    id: sequence(s => `profile${s}`),
    ownerId: fake(f => f.random.uuid()),
    organizationId: fake(f => f.random.uuid()),
    service: 'twitter',
    type: 'twitter',
    service_type: 'profile',
    handle: 'buffertest',
    serviceUsername: 'buffertest',
    serviceId: '96414483',
    service_username: 'buffertest',
    isManager: true,
    business: true,
    should_post_direct: true,
    formatted_username: '@buffertest',
    pausedSchedules: [],
    schedules,
    subprofiles: [],
    timezone: 'Europe/Madrid',
    avatar_https:
      'https://pbs.twimg.com/profile_images/1134013946929778693/DFqLN6GR_normal.png',
    shouldShowGridPreview: true,
    shouldHideAdvancedAnalytics: false,
    shouldDisplayIGPersonalNotification: false,
  },
});

const igProfileFields = buildProfile({
  overrides: {
    service: 'instagram',
    type: 'instagram',
    handle: 'buffertestig',
    serviceUsername: 'buffertestig',
    service_username: 'buffertestig',
    formatted_username: '@buffertestig',
    serviceId: '96414484',
  },
});

const buildIGProfile = build('IGProfile', {
  fields: {
    ...igProfileFields,
    id: sequence(s => `profile${s}`),
  },
});

const buildEmptyCampaign = build('EmptyCampaign', {
  fields: {
    id: sequence(s => `campaign${s}`),
    globalOrganizationId: sequence(s => `globalorg${s}`),
    name: fake(f => f.lorem.words()),
    color: '#00C8CF',
    lastUpdated: 'Updated 7 hours ago',
    dateRange: null,
    sent: 0,
    scheduled: 0,
    channels: null,
    items: [],
  },
});

const buildCampaignChannel = build('CampaignChannel', {
  fields: {
    serviceId: fake(f => f.random.uuid()),
    serviceType: 'facebook',
    channelType: 'page',
    channelId: fake(f => f.random.uuid()),
    serviceAvatar: 'https://fake-image.url',
    serviceUsername: 'BufferFB',
    isManager: true,
    business: true,
    hasPushNotifications: true,
  },
});

const buildCampaignItem = build('CampaignItem', {
  fields: {
    postContent: {
      imageUrls: [],
      linkAttachment: {},
      links: [],
      retweetCommentLinks: [],
      text: fake(f => f.lorem.words()),
      type: 'text',
    },
    postDetails: {
      error: null,
      errorLink: null,
      isCustomScheduled: false,
      isInstagramReminder: false,
      isRetweet: false,
      postAction: 'This post will be sent June 16th at 10:00 AM (CEST).',
    },
    profileId: fake(f => f.random.uuid()),
    user: buildUser(),
    dueAt: 1590838200,
    isManager: true,
    hasPushNotifications: true,
  },
});

const buildCampaign = build('Campaign', {
  fields: {
    id: sequence(s => `campaign${s}`),
    globalOrganizationId: sequence(s => `globalorg${s}`),
    name: fake(f => f.lorem.words()),
    color: '#00C8CF',
    updatedAt: 1592210436,
    createdAt: 1583163158,
    startDate: 1583582940,
    endDate: 1590746400,
    dateRange: 'Mar 7-7, 2020',
    sent: 0,
    scheduled: 1,
    channels: [buildCampaignChannel()],
    items: [buildCampaignItem()],
  },
});

const buildPost = build('Post', {
  fields: {
    id: sequence(s => `post${s}`),
    profileId: fake(f => f.random.uuid()),
    profile_service: 'twitter',
    createdAt: 1590503972,
    scheduledAt: 1590838200,
    due_at: 1590838200,
    dueTime: '11:00 am',
    day: 'Today',
    type: 'text',
    isFixed: false,
    isPastDue: false,
    isPastReminder: false,
    isSent: false,
    pinned: true,
    links: [],
    postDetails: {
      error: null,
      errorLink: null,
      isCustomScheduled: true,
      isInstagramReminder: false,
      isRetweet: false,
      postAction: 'This post will be sent today at 11:00 AM (BST).',
    },
    text: 'text',
    commentEnabled: false,
    commentText: null,
    postContent: {
      text: fake(f => f.lorem.words()),
      type: 'text',
    },
    media: {},
    imageSrc: null,
    campaignDetails: null,
    statistics: {
      retweets: 10,
      favorites: 29,
      mentions: 0,
      clicks: 1,
      reach: 3,
    },
  },
});

const postFields = buildPost({
  overrides: {
    imageSrc: 'https://fake-image.url',
    media: {
      progress: '100',
      uploaded: 'true',
      picture: 'https://fake-image.url',
      thumbnail: 'https://fake-thumbnail.url',
      alt_text: '',
    },
    postDetails: {
      error: null,
      errorLink: null,
      isCustomScheduled: true,
      isInstagramReminder: false,
      isRetweet: false,
      postAction: 'This post will be sent January 2nd at 11:00 AM (BST).',
    },
  },
});

const buildPostWithImage = build('PostWithImage', {
  fields: {
    ...postFields,
    id: sequence(s => `post${s}`),
    postContent: {
      text: fake(f => f.lorem.words()),
      type: 'image',
    },
  },
});

const buildStoryGroup = build('StoryGroup', {
  fields: {
    id: sequence(s => `story${s}`),
    profileId: fake(f => f.random.uuid()),
    type: 'storyGroup',
    day: 'Thursday 10th October 2019',
    createdAt: 1570632827,
    scheduled_at: 1570729980,
    scheduledAt: 1570729980,
    due_at: 1570729980,
    profileTimezone: 'Europe/Madrid',
    isPastDue: false,
    storyDetails: {
      creatorName: 'buffertestig',
      avatarUrl: 'https://fake-image.url',
      dueTime: '7:53 pm',
      createdAt: 'October 9th at 4:53 PM (CEST)',
      status: 'scheduled',
      stories: [
        {
          _id: fake(f => f.random.uuid()),
          id: fake(f => f.random.uuid()),
          note: fake(f => f.lorem.words()),
          type: 'image',
          order: 1,
          asset_url: 'https://fake-image.url',
          thumbnail_url: 'https://fake-image.url',
          is_video_processing: false,
        },
      ],
      twentyfourHourTime: false,
      storyAction:
        "You will receive a reminder on October 10th when it's time to post.",
    },
  },
});

export {
  buildUser,
  buildProfile,
  buildIGProfile,
  buildCampaign,
  buildCampaignItem,
  buildCampaignChannel,
  buildEmptyCampaign,
  buildPost,
  buildPostWithImage,
  buildOrganization,
  buildStoryGroup,
};
