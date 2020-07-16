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
