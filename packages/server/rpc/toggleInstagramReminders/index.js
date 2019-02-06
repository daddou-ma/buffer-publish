const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'toggleInstagramReminders',
  'toggle instagram reminders',
  ({ profileId, allowDirectPosting }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/update.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      form: {
        access_token: session.publish.accessToken,
        allow_direct_posting: allowDirectPosting,
      },
    })
    .then(data => JSON.parse(data))
    .catch((err) => {
      throw createError({ message: err.message });
    }),
);
