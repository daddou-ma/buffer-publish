const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'analytics_start_date',
  'fetch analytics start date for profiles and pages',
  ({ profileId }, { session }) => rp({
    uri: `${process.env.API_ADDR}/1/profiles/${profileId}/analytics/gnip_start_date.json`,
    method: 'GET',
    strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
    qs: {
      access_token: session.analyze.accessToken,
    },
    json: true,
  }).then(({ response }) => response[0]),
);
