import React from 'react';
import PropTypes from 'prop-types';

import { WithFeatureLoader } from '@bufferapp/product-features';
import AppSidebar from '@bufferapp/app-sidebar';

function Sidebar({ features, userFeatures, onReturnToClassicClick, ...props }) {
  const isAbleToReturnToClassicUser =
    userFeatures && userFeatures.indexOf('paid_users_in_new_publish') >= 0;
  return (
    <AppSidebar
      {...props}
      onReturnToClassicClick={onReturnToClassicClick}
      isAbleToReturnToClassicUser={isAbleToReturnToClassicUser}
      isProUpgradeUser={features.isFreeUser()}
    />
  );
}

Sidebar.propTypes = {
  userFeatures: PropTypes.arrayOf(PropTypes.string),
  onReturnToClassicClick: PropTypes.func,
  features: PropTypes.shape({
    isFreeUser: PropTypes.func,
  }).isRequired,
};

Sidebar.defaultProps = {
  userFeatures: [],
  onReturnToClassicClick: () => {},
};

const SidebarWithFeatures = WithFeatureLoader(Sidebar);

export default SidebarWithFeatures;
