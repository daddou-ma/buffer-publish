const lastUpdated = updatedAt => `Last updated ${updatedAt}`;

module.exports = campaign => {
  return {
    _id: campaign._id,
    id: campaign._id,
    globalOrganizationId: campaign.global_organization_id,
    name: campaign.name,
    color: campaign.color,
    updatedAt: campaign.updated_at,
    lastUpdated: lastUpdated(campaign.updated_at),
    createdAt: campaign.created_at,
    startDate: campaign.start_date,
    endDate: campaign.end_date,
    items: campaign.items,
  };
};
