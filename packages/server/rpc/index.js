const { rpc } = require('@bufferapp/buffer-rpc');

const profilesMethod = require('./profiles');
const singleProfileMethod = require('./profiles/single');
const clientAccessMethod = require('./profiles/access');
const queuedPostsMethod = require('./queuedPosts');
const sentPostsMethod = require('./sentPosts');
const pastRemindersMethod = require('./pastReminders');
const draftPostsMethod = require('./draftPosts');
const userMethod = require('./user');
const deletePostMethod = require('./deletePost');
const sharePostNowMethod = require('./sharePostNow');
const enabledApplicationModesMethod = require('./enabledApplicationModes');
const composerApiProxyMethod = require('./composerApiProxy');
const environmentMethod = require('./environment');
const updateScheduleMethod = require('./updateSchedule');
const getTimezonesMethod = require('./getTimezones');
const updateTimezoneMethod = require('./updateTimezone');
const reorderPostsMethod = require('./reorderPosts');
const reorderProfilesMethod = require('./reorderProfiles');
const shuffleQueueMethod = require('./shuffleQueue');
const pauseQueueMethod = require('./pauseQueue');
const requeuePost = require('./requeuePost');
const updatePausedSchedules = require('./updatePausedSchedules');
const sendFeedback = require('./sendFeedback');
const savePublishBetaRedirect = require('./savePublishBetaRedirect');
const switchPlan = require('./switchPlan');
const changeDateTimePreferences = require('./changeDateTimePreferences');
const twoFactorUpdate = require('./twoFactorUpdate');
const twoFactorConfirm = require('./twoFactorConfirm');
const twoFactorRecovery = require('./twoFactorRecovery');
const connectedApps = require('./connectedApps');
const revokeConnectedApp = require('./revokeConnectedApp');
const featureMethod = require('./features');
const getLinkShortener = require('./getLinkShortener');
const changeLinkShortener = require('./changeLinkShortener');
const approveDraftMethod = require('./approveDraft');
const changeDraftStatusMethod = require('./changeDraftStatus');
const toggleGoogleAnalytics = require('./toggleGoogleAnalytics');
const checkInstagramBusinessMethod = require('./checkInstagramBusiness');
const saveGATrackingSettings = require('./saveGATrackingSettings');
const getGATrackingSettings = require('./getGATrackingSettings');
const toggleInstagramReminders = require('./toggleInstagramReminders');
const mobileReminder = require('./mobileReminder');
const setNotifications = require('./setNotifications');
const readMessage = require('./readMessage');
const updateRecheck = require('./bookmarklets/updateRecheck');
const profileQuickAnalytics = require('./bookmarklets/profileQuickAnalytics');
const shortenUrl = require('./shortenUrl');
const dropPost = require('./dropPost');
const swapPosts = require('./swapPosts');
const cancelTrial = require('./cancelTrial');
const startTrial = require('./startTrial');
const intercom = require('./intercom');
const v1ToV2UpgradeDetails = require('./v1ToV2UpgradeDetails');
const globalAccount = require('./globalAccount');
const getCounts = require('./getCounts');
const createHashtagGroup = require('./createHashtagGroup');
const deleteHashtagGroup = require('./deleteHashtagGroup');
const getHashtagGroups = require('./getHashtagGroups');
const createSetupIntent = require('./createSetupIntent');
const getStoryGroupsMethod = require('./getStoryGroups');
const getPastRemindersStoriesMethod = require('./getPastRemindersStories');
const createStoryGroupMethod = require('./createStoryGroup');
const updateStoryGroupMethod = require('./updateStoryGroup');
const deleteStoryGroupMethod = require('./deleteStoryGroup');
const shareStoryGroupNowMethod = require('./shareStoryGroupNow');
const getShopGridPostsMethod = require('./shopGrid/getPosts');
const updateShopGridPostLink = require('./shopGrid/updatePostLink');
const updateCustomLinksMethod = require('./shopGrid/customLinks/update');
const updateSingleCustomLinkMethod = require('./shopGrid/customLinks/update/single');
const deleteCustomLinkMethod = require('./shopGrid/customLinks/delete');
const addUserTag = require('./addUserTag');
const removeUserTag = require('./removeUserTag');

// Analytics from Analyze -- Delete when we switch to Analyze
const average = require('./analytics/average');
const compare = require('./analytics/compare');
const getReport = require('./analytics/getReport');
const posts = require('./analytics/posts');
const summaryMethod = require('./analytics/summary');

module.exports = rpc(
  profilesMethod,
  singleProfileMethod,
  clientAccessMethod,
  queuedPostsMethod,
  sentPostsMethod,
  pastRemindersMethod,
  draftPostsMethod,
  userMethod,
  deletePostMethod,
  sharePostNowMethod,
  enabledApplicationModesMethod,
  composerApiProxyMethod,
  environmentMethod,
  updateScheduleMethod,
  getTimezonesMethod,
  updateTimezoneMethod,
  reorderPostsMethod,
  reorderProfilesMethod,
  shuffleQueueMethod,
  pauseQueueMethod,
  requeuePost,
  updatePausedSchedules,
  sendFeedback,
  savePublishBetaRedirect,
  switchPlan,
  changeDateTimePreferences,
  twoFactorUpdate,
  twoFactorConfirm,
  twoFactorRecovery,
  connectedApps,
  revokeConnectedApp,
  featureMethod,
  getLinkShortener,
  changeLinkShortener,
  approveDraftMethod,
  changeDraftStatusMethod,
  toggleGoogleAnalytics,
  saveGATrackingSettings,
  getGATrackingSettings,
  average,
  compare,
  getReport,
  posts,
  summaryMethod,
  checkInstagramBusinessMethod,
  toggleInstagramReminders,
  mobileReminder,
  setNotifications,
  readMessage,
  updateRecheck,
  profileQuickAnalytics,
  shortenUrl,
  dropPost,
  swapPosts,
  cancelTrial,
  startTrial,
  intercom,
  v1ToV2UpgradeDetails,
  globalAccount,
  getCounts,
  createHashtagGroup,
  deleteHashtagGroup,
  getHashtagGroups,
  createSetupIntent,
  getStoryGroupsMethod,
  getPastRemindersStoriesMethod,
  createStoryGroupMethod,
  updateStoryGroupMethod,
  deleteStoryGroupMethod,
  shareStoryGroupNowMethod,
  addUserTag,
  removeUserTag,
  getShopGridPostsMethod,
  updateShopGridPostLink,
  updateCustomLinksMethod,
  updateSingleCustomLinkMethod,
  deleteCustomLinkMethod
);
