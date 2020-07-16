import React from 'react';
import PropTypes from 'prop-types';
import { isSupportedPlan } from '../../utils';

const FeatureLoader = ({
  productFeatures,
  children,
  fallback,
  supportedPlans,
}) => {
  const { planName } = productFeatures;

  if (!isSupportedPlan(supportedPlans, planName)) {
    return fallback || null;
  }

  return children;
};

FeatureLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  fallback: PropTypes.node,
  productFeatures: PropTypes.shape({
    planName: PropTypes.string,
  }),
  supportedPlans: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

FeatureLoader.defaultProps = {};

export default FeatureLoader;
