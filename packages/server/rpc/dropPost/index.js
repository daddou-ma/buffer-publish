const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'dropPost',
  'handles changing a posts time when dropped on a timeslot',
  ({ updateId, timestamp }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/updates/${updateId}/drop.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        timestamp,
      },
    })
      .then(() => 'OK')
      .catch(err => {
        throw createError({ message: err.message });
      })
);
