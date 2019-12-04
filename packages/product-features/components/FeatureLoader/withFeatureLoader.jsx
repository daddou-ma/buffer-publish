import React from 'react';
import PropTypes from 'prop-types';
import { isSupportedFeature, isSupportedPlan } from '../../utils';

const WithFeatureLoader = WrappedComponent => {
  const FeatureLoader = ({ productFeatures, ...other }) => {
    const { planName, features } = productFeatures;

    const featureChecker = {
      isSupportedPlan: testPlan => isSupportedPlan(testPlan, planName),
      isSupportedFeature: testFeature =>
        isSupportedFeature(testFeature, features),
      isProUser: () => isSupportedPlan('pro', planName),
      isFreeUser: () => isSupportedPlan('free', planName),
    };

    return <WrappedComponent {...other} features={featureChecker} />;
  };

  FeatureLoader.propTypes = {
    productFeatures: PropTypes.shape({
      planName: PropTypes.string,
      features: PropTypes.any,
    }),
  };

  FeatureLoader.defaultProps = {
    productFeatures: {},
  };

  return FeatureLoader;
};

export default WithFeatureLoader;
