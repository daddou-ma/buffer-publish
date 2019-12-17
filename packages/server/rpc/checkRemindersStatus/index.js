const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'checkRemindersStatus',
  'check if profiles have push notifications and reminders in the queue',
  (_, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/get_reminders_data.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    })
      .then(result => JSON.parse(result))
      .catch(err => {
        throw createError({ message: err.message });
      })
);
