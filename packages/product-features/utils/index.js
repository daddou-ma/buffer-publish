export const isSupportedPlan = (supportedPlans, planName) => {
  if (typeof supportedPlans !== 'undefined') {
    const currentPlan = planName.toLowerCase();
    const supportedPlanList =
      typeof supportedPlans === 'string' ? [supportedPlans] : supportedPlans;
    if (
      !supportedPlanList
        .map(p => p.toLowerCase())
        .some(plan => plan === currentPlan)
    ) {
      return false;
    }
  }

  return true;
};

export function isSupportedFeature(supportedFeatures, features) {
  if (typeof supportedFeatures !== 'undefined') {
    const supportedFeatureList =
      typeof supportedFeatures === 'string'
        ? [supportedFeatures]
        : supportedFeatures;
    const supportedFeatureNames = supportedFeatureList.map(f =>
      f.toLowerCase()
    );
    const currentFeatures = Object.keys(features)
      .filter(f => features[f])
      .map(f => f.toLowerCase());

    if (
      !supportedFeatureNames.some(
        feature => currentFeatures.indexOf(feature) >= 0
      )
    ) {
      return false;
    }
  }
  return true;
}
