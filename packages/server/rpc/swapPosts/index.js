const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'swapPosts',
  'handles changing posts time when swapped',
  (
    {
      updateSourceId,
      sourcePinned,
      sourceDueAt,
      updateTargetId,
      targetPinned,
      targetDueAt,
    },
    { session }
  ) =>
    rp({
      uri: `${process.env.API_ADDR}/1/updates/${updateSourceId}/swap_posts.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        sourcePinned,
        sourceDueAt,
        updateTargetId,
        targetPinned,
        targetDueAt,
      },
    })
      .then(() => 'OK')
      .catch(err => {
        throw createError({ message: err.message });
      })
);
