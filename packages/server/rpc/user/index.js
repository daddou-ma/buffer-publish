const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'user',
  'fetch user data',
  (_, { session }, res, { PublishAPI, parsers }) =>
    PublishAPI.get({
      uri: `1/user.json`,
      session,
      params: {
        includes: 'avatar',
      },
    })
      .then(user => parsers.userParser(user))
      .catch(PublishAPI.errorHandler)
);
