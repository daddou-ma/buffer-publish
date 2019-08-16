const getSource = ({ newPlan, currentPlan }) => {
  let source = null;
  switch (newPlan) {
    case 'pro':
      source = currentPlan === 'free'
        ? 'plans_pro_upgrade'
        : 'plans_pro_downgrade';
      break;
    case 'premium_business':
      source = currentPlan === 'free' || currentPlan === 'pro'
        ? 'plans_premium_upgrade'
        : 'plans_premium_downgrade';
      break;
    case 'small':
      source = currentPlan === 'free' || currentPlan === 'pro' || currentPlan === 'premium_business'
        ? 'plans_small_upgrade'
        : 'plans_small_downgrade';
      break;
    default:
      break;
  }
  return source;
};

export default getSource;
