const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'organizations',
  'fetch organizations data for current user',
  (_, { session }, res, { PublishAPI, parsers }) =>
    PublishAPI.get({
      uri: `1/user/organizations.json`,
      session,
    })
      .then(({ data }) => data.map(org => parsers.orgParser(org)))
      .catch(PublishAPI.errorHandler)
);
