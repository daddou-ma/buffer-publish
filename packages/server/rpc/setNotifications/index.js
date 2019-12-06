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
        ...notifications,
      },
    })
      .then(data => JSON.parse(data))
      .catch(err => {
        throw createError({ message: err.message });
      })
);
