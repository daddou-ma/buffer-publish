const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { userParser } = require('./../../parsers/src');
const authenticationService = require('../../services/authenticationService');

// module.exports = method(
//   'user',
//   'fetch user data',
//   (_, { session }) =>
const getPublishUser = ({ session }) => {
  rp({
    uri: `${process.env.API_ADDR}/1/user.json`,
    method: 'GET',
    strictSSL: !(process.env.NODE_ENV === 'development'),
    qs: {
      access_token: session.publish.accessToken,
      includes: 'avatar',
    },
  })
  .then((result) => {
    console.log('session!', session);
    const userData = JSON.parse(result);
    return userParser(userData);
  });
};

const getGlobalUser = accountId =>
  authenticationService.getAccount({ accountId });

module.exports = method(
  'user',
  'fetch user data',
  async (_, req) => {
    if (!req.session.publish.foreignKey) {
      return getPublishUser(req);
    }
    return getGlobalUser(req.session.global.accountId);
  },
);

// const getPublishUser = (req) =>
//   rp({
//     uri: `${req.app.get('apiAddr')}/1/user.json`,
//     method: 'GET',
//     strictSSL: !(process.env.NODE_ENV === 'development'),
//     qs: {
//       access_token: req.session.analyze.accessToken,
//       includes: 'avatar',
//     },
//   })
//   .then((result) => {
//     const userData = JSON.parse(result);
//     return parseUser(userData, req.session);
//   });
