const getSource = ({ newPlan, currentPlan }) => {
  let source = null;
  switch (newPlan) {
    case 'pro':
      source = currentPlan === 'free'
        ? 'plans-pro-upgrade'
        : 'plans-pro-downgrade';
      break;
    case 'premium_business':
      source = currentPlan === 'free' || currentPlan === 'pro'
        ? 'plans-premium-upgrade'
        : 'plans-premium-downgrade';
      break;
    case 'small':
      source = currentPlan === 'free' || currentPlan === 'pro' || currentPlan === 'premium_business'
        ? 'plans-small-upgrade'
        : 'plans-small-downgrade';
      break;
    default:
      break;
  }
  return source;
};

export default getSource;
