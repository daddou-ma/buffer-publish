const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'addUserTag',
  'add tag to user',
  ({ tag, name }, { session }, res, { PublishAPI }) =>
    PublishAPI.post({
      uri: `1/user/add_tag.json`,
      session,
      params: {
        tag,
        name,
      },
    }).catch(PublishAPI.errorHandler)
);
