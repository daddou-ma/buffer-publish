const moment = require('moment-timezone');

const parseLastUpdated = updatedAt => {
  const updatedDate = new Date(updatedAt * 1000);
  const diff = moment(updatedDate).fromNow(true);

  return `Last updated ${diff} ago`;
};

const parseDateRange = (startDate, endDate) => {
  // const lastUpdated = moment.tz(date, 'Europe/Madrid'); // .format('MM/DD/YYYY');
  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }
  return null;
};

const parseItem = item => {
  let sentAt = null;
  if (item.sent_at) {
    sentAt = { sentAt: item.sent_at };
  }

  let servicePostId = null;
  if (item.service_post_id) {
    servicePostId = { servicePostId: item.service_post_id };
  }

  const result = {
    dueAt: item.due_at,
    serviceType: item.service_type,
    serviceId: item.service_id,
    channelType: item.channel_type,
    ...sentAt,
    ...servicePostId,
  };

  return result;
};

const parseCampaignItems = items => {
  return items.map(item => {
    return parseItem(item);
  });
};

const parseChannels = channels => {
  return channels.map(channel => {
    return {
      serviceId: channel.service_id,
      serviceType: channel.service_type,
      channelType: channel.channel_type,
    };
  });
};

module.exports = campaign => {
  return {
    _id: campaign._id,
    id: campaign._id,
    globalOrganizationId: campaign.global_organization_id,
    name: campaign.name,
    color: campaign.color,
    lastUpdated: parseLastUpdated(campaign.updated_at),
    updatedAt: campaign.updated_at,
    createdAt: campaign.created_at,
    startDate: campaign.start_date,
    endDate: campaign.end_date,
    dateRange: parseDateRange(campaign.start_date, campaign.end_date), // TODO: date range formatted for Publish UI
    sent: campaign.sent,
    scheduled: campaign.scheduled,
    channels: (campaign.channels && parseChannels(campaign.channels)) ?? null,
    items: (campaign.items && parseCampaignItems(campaign.items)) ?? null,
  };
};
