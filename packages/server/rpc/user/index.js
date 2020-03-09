const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'user',
  'fetch user data',
  (_, { session }, res, { PublishAPI, parsers }) =>
    PublishAPI.get({
      uri: `${process.env.API_ADDR}/1/user.json`,
      session,
      params: {
        access_token: session.publish.accessToken,
        includes: 'avatar',
      },
    }).then(result => {
      const userData = JSON.parse(result);
      return parsers.userParser(userData);
    })
);
