const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'changeDraftStatus',
  'request approval or move to drafts',
  ({ updateId, needsApproval }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/drafts/${updateId}/needs_approval_update.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        needs_approval: needsApproval,
      },
    })
      .then(result => JSON.parse(result))
      .catch(err => {
        throw createError({ message: err.message });
      })
);
