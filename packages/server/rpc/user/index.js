const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'user',
  'fetch user data',
  (_, { session }, res, { PublishAPI, parsers }) =>
    PublishAPI.get({
      uri: `1/user.json`,
      session,
      params: {
        access_token: session.publish.accessToken,
        includes: 'avatar',
      },
    }).then(user => {
      return parsers.userParser(user);
    })
);
