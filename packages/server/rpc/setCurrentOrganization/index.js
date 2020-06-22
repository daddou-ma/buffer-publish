const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'setCurrentOrganization',
  'set current organization',
  ({ organizationId }, { session }, res, { PublishAPI }) =>
    PublishAPI.post({
      uri: '1/user/set_selected_organization.json',
      session,
      params: {
        organization_id: organizationId,
      },
    })
      .then(response => JSON.parse(response.data))
      .catch(PublishAPI.errorHandler)
);