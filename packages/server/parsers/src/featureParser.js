module.exports = featureData => {
  const { features } = featureData;

  return {
    features: features || {},
    planName:
      features.business === true
        ? 'business'
        : features.pro === true
        ? 'pro'
        : 'free',
  };
};
