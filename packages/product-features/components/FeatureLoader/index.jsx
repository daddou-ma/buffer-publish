import React from 'react';
import PropTypes from 'prop-types';
import { isSupportedPlan, isSupportedFeature } from '../../utils';

const FeatureLoader = ({
  productFeatures,
  supportedFeatures,
  children,
  fallback,
  supportedPlans,
}) => {
  const { planName, features } = productFeatures;

  if (!isSupportedPlan(supportedPlans, planName)) {
    return fallback || null;
  }

  if (!isSupportedFeature(supportedFeatures, features)) {
    return fallback || null;
  }

  return children;
};

FeatureLoader.propTypes = {
  supportedFeatures: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  fallback: PropTypes.node,
  productFeatures: PropTypes.shape({
    planName: PropTypes.string,
    features: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  }),
  supportedPlans: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

FeatureLoader.defaultProps = {};

export default FeatureLoader;
