const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { postParser } = require('./../../parsers');
const { buildPostMap } = require('./../../formatters');

module.exports = method(
  'draftPosts',
  'fetch posts with status set as draft',
  ({ profileId, page, needsApproval }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/updates/drafts.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        page,
        count: 20,
        needs_approval: needsApproval,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => {
        const drafts = parsedResult.updates.map(postParser);
        const mappedDrafts = buildPostMap(drafts);
        return {
          total: parsedResult.total,
          drafts: mappedDrafts,
        };
      })
);
