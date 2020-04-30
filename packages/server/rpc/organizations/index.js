const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'organizations',
  'fetch organizationz data',
  (_, { session }, res, { PublishAPI, parsers }) =>
    PublishAPI.get({
      uri: `1/user/organizations.json`,
      session,
    })
      .then(({ organizations }) =>
        organizations.map(org => parsers.orgParser(org))
      )
      .catch(PublishAPI.errorHandler)
);
