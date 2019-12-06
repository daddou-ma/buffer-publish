const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'addUserTag',
  'add tag to user',
  ({ tag, name }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/add_tag.json`,
      method: 'POST',
      strictSSL: !(
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ),
      qs: {
        access_token: session.publish.accessToken,
        tag,
        name,
      },
    })
      .then(result => JSON.parse(result))
      .catch(err => {
        if (err.error) {
          const error = JSON.parse(err.error);
          throw createError({ message: error.message });
        }
      })
);
