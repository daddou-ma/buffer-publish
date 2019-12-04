const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'deleteHashtagGroup',
  'delete hashtag group by id',
  ({ organizationId, snippetId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/snippet_groups/delete.json`,
      method: 'POST',
      strictSSL: !(
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ),
      qs: {
        access_token: session.publish.accessToken,
        organization_id: organizationId,
        snippet_id: snippetId,
      },
    })
      .then(result => JSON.parse(result))
      .catch(err => {
        if (err.error) {
          const error = JSON.parse(err.error);
          throw createError({ message: error.message });
        }
      })
);
