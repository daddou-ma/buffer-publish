import { postParser } from './../../parsers/src/index';
import { buildPostMap } from './../../formatters/src/index';

const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'draftPosts',
  'fetch posts with status set as draft',
  ({ profileId, page }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/updates/drafts.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        page,
        count: 20,
      },
    })
    .then(result => JSON.parse(result))
    .then((parsedResult) => {
      const drafts = parsedResult.updates.map(postParser);
      const mappedDrafts = buildPostMap(drafts);
      return {
        total: parsedResult.total,
        drafts: mappedDrafts,
      };
    }),
);
