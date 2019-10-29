import React from 'react';

import PropTypes from 'prop-types';

import { BufferLoading } from '@bufferapp/publish-shared-components';

const onPaydayPage = window.location.pathname.endsWith('plans');

const EnsurePublishBetaUser = ({ children, loading, hasPublishBeta, hasNewPublish }) => {
  if (loading || (!hasPublishBeta && !hasNewPublish && !onPaydayPage)) {
    return (
      <BufferLoading fullscreen />
    );
  }
  if (hasPublishBeta || hasNewPublish || onPaydayPage) {
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
