import React from 'react';
import PropTypes from 'prop-types';
import { isSupportedPlan } from '../../utils';

const WithFeatureLoader = WrappedComponent => {
  const FeatureLoader = ({ productFeatures, ...other }) => {
    const { planName } = productFeatures;

    const featureChecker = {
      isSupportedPlan: testPlan => isSupportedPlan(testPlan, planName),
      isProUser: () => isSupportedPlan('pro', planName),
      isFreeUser: () => isSupportedPlan('free', planName),
    };

    return <WrappedComponent {...other} features={featureChecker} />;
  };

  FeatureLoader.propTypes = {
    productFeatures: PropTypes.shape({
      planName: PropTypes.string,
    }),
  };

  FeatureLoader.defaultProps = {
    productFeatures: {},
  };

  return FeatureLoader;
};

export default WithFeatureLoader;
