import React from 'react';

import PropTypes from 'prop-types';

import { BufferLoading } from '@bufferapp/publish-shared-components';

const EnsurePublishBetaUser = ({ children, loading, hasPublishBeta, hasNewPublish }) => {
  if (loading || (!hasPublishBeta && !hasNewPublish)) {
    return (
      <BufferLoading fullscreen />
    );
  }
  if (hasPublishBeta || hasNewPublish) {
    return children;
  }
};

EnsurePublishBetaUser.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  hasPublishBeta: PropTypes.bool.isRequired,
  hasNewPublish: PropTypes.bool.isRequired,
};

export default EnsurePublishBetaUser;
