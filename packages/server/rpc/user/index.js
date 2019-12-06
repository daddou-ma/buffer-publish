const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { userParser } = require('./../../parsers/src');

module.exports = method('user', 'fetch user data', (_, { session }) =>
  rp({
    uri: `${process.env.API_ADDR}/1/user.json`,
    method: 'GET',
    strictSSL: !(process.env.NODE_ENV === 'development'),
    qs: {
      access_token: session.publish.accessToken,
      includes: 'avatar',
    },
  }).then(result => {
    const userData = JSON.parse(result);
    return userParser(userData);
  })
);
