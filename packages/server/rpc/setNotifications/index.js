const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'setNotifications',
  'set notifications',
  ({ notifications }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/notifications.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      form: {
        access_token: session.publish.accessToken,
        buffer_empty: !!notifications.bufferEmpty,
        buffer_tips: !!notifications.bufferTips,
        update_failures: !!notifications.updateFailures,
        update_successes: !!notifications.updateSuccesses,
        weekly_digests: !!notifications.weeklyDigests,
        new_contributions: !!notifications.newContributions,
        post_moved_back_to_drafts: !!notifications.postMovedBackToDrafts,
        celebrations: !!notifications.celebrations,
      },
    })
    .then(data => JSON.parse(data))
    .catch((err) => {
      throw createError({ message: err.message });
    }),
);
