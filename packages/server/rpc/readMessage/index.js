const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'readMessage',
  'mark a message as read for the current user',
  ({ message }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/set_message_read.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      form: {
        access_token: session.publish.accessToken,
        message,
      },
    })
      .then(data => JSON.parse(data))
      .catch(err => {
        throw createError({ message: err.message });
      })
);
