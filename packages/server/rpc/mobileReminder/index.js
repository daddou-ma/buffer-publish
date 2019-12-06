const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'mobileReminder',
  'send mobile reminder',
  ({ updateId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/updates/${updateId}/share.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    })
      .then(() => 'OK')
      .catch(err => {
        throw createError({ message: err.message });
      })
);
