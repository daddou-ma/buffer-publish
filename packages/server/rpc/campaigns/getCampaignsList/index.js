/* eslint-disable no-unused-vars */
const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'getCampaignsList',
  'gets a list of campaigns, given the global organization id',
  (__, { session }, res, { PublishAPI, parsers }) =>
    PublishAPI.get({
      uri: `/1/campaigns.json`,
      session,
      params: {},
    })
      .then(response => response.data.map(parsers.campaignParser))
      .catch(PublishAPI.errorHandler)
);
