const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'analytics_start_date',
  'fetch analytics start date for profiles and pages',
  ({ profileId }, req) =>
    rp({
      uri: `${req.app.get(
        'analyzeApiAddr'
      )}/1/profiles/${profileId}/analytics/gnip_start_date.json`,
      method: 'GET',
      strictSSL: !(
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ),
      qs: {
        access_token: req.session.publish.accessToken,
      },
      json: true,
    }).then(({ response }) => response[0])
);
