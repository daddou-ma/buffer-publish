const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'deleteStoryGroup',
  'fetch stories groups',
  ({ storyGroupId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/story_groups/delete.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        story_group_id: storyGroupId,
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
