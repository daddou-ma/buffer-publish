import React from 'react';
import PropTypes from 'prop-types';
import EmptyState from './EmptyState';

const ListCampaigns = ({
  translations,
  campaigns,
  onOpenCampaign,
  onOpenCreateCampaignClick,
}) => {
  if (campaigns.length === 0) {
    return (
      <EmptyState
        translations={translations.emptyState}
        onOpenCreateCampaignClick={onOpenCreateCampaignClick}
      />
    );
  }

  return (
    <React.Fragment>
      <h1>List Campaigns</h1>
    </React.Fragment>
  );
};

ListCampaigns.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  onOpenCreateCampaignClick: PropTypes.func,
  onEditCampaignClick: PropTypes.func,
  onDeleteCampaignClick: PropTypes.func,
  onViewCampaignClick: PropTypes.func,
};

ListCampaigns.defaultProps = {
  onOpenCreateCampaignClick: () => {},
  onEditCampaignClick: () => {},
  onDeleteCampaignClick: () => {},
  onViewCampaignClick: () => {},
};

export default ListCampaigns;
