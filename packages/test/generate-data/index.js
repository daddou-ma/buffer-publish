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
    plan: 'business',
    planCode: 11,
    is_business_user: true,
    is_free_user: false,
    features: [
      'campaigns',
      'instagram',
      'first_comment',
      'twitter-march-18-changes',
    ],
    hasTwentyFourHourTimeFormat: false,
    isOnProTrial: false,
    isProAndUpOrTeamMember: true,
    uses_24h_time: false,
    hasIGDirectVideoFlip: true,
    canStartProTrial: true,
    week_starts_monday: true,
    has_ig_direct_flip: true,
    skip_empty_text_alert: false,
    has_simplified_free_plan_ux: false,
    hasIGLocationTaggingFeature: true,
    profile_limit: 50,
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

const buildProfile = build('Profile', {
  fields: {
    id: sequence(s => `profile${s}`),
    ownerId: fake(f => f.random.uuid()),
    service: 'twitter',
    service_type: 'profile',
    handle: 'mayauribe',
    serviceUsername: 'mayauribe',
    serviceId: '96414483',
    service_username: 'mayauribe',
    isManager: true,
    business: true,
    should_post_direct: true,
    formatted_username: '@mayauribe',
    pausedSchedules: [],
    schedules,
    subprofiles: [],
    timezone: 'Europe/Madrid',
    avatar_https:
      'https://pbs.twimg.com/profile_images/1134013946929778693/DFqLN6GR_normal.png',
    shouldShowGridPreview: true,
  },
});

const buildCampaign = build('Campaign', {
  fields: {
    id: sequence(s => `campaign${s}`),
    name: fake(f => f.lorem.words()),
    color: '#00C8CF',
  },
});

const buildPost = build('Post', {
  fields: {
    id: sequence(s => `post${s}`),
    profileId: fake(f => f.random.uuid()),
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
    postDetails: {
      error: null,
      errorLink: null,
      isCustomScheduled: true,
      isInstagramReminder: false,
      isRetweet: false,
      postAction: 'This post will be sent today at 11:00 AM (BST).',
    },
    postContent: {
      text: fake(f => f.lorem.words()),
      type: 'text',
    },
    media: {},
    imageSrc: null,
    campaignDetails: null,
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
  fields: postFields,
});

export {
  buildUser,
  buildProfile,
  buildCampaign,
  buildPost,
  buildPostWithImage,
};
