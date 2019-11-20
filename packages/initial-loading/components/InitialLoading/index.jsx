import React from 'react';

import PropTypes from 'prop-types';

import { BufferLoading } from '@bufferapp/publish-shared-components';

const InitialLoading = ({
  children,
  loading,
  hasPublishBeta,
  hasNewPublish,
  onPaydayPage,
}) => {
  if (loading || (!hasPublishBeta && !hasNewPublish && !onPaydayPage)) {
    return <BufferLoading fullscreen />;
  }
  if (hasPublishBeta || hasNewPublish || onPaydayPage) {
    return children;
  }
};

InitialLoading.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  hasPublishBeta: PropTypes.bool.isRequired,
  hasNewPublish: PropTypes.bool.isRequired,
};

export default InitialLoading;
