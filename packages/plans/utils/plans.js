import { PLAN_IDS } from '@bufferapp/publish-constants';

const getSource = ({ newPlan, currentPlan }) => {
  let source = null;
  switch (newPlan) {
    case 'pro':
      source =
        currentPlan === 'free' || currentPlan === 'awesome'
          ? 'plans_pro_upgrade'
          : 'plans_pro_downgrade';
      break;
    case 'solo_premium_business':
      source =
        currentPlan === 'free' ||
        currentPlan === 'pro' ||
        currentPlan === 'awesome'
          ? 'plans_solo_premium_upgrade'
          : 'plans_solo_premium_downgrade';
      break;
    case 'premium_business':
      source =
        currentPlan === 'free' ||
        currentPlan === 'awesome' ||
        currentPlan === 'pro' ||
        currentPlan === 'solo_premium_business'
          ? 'plans_premium_upgrade'
          : 'plans_premium_downgrade';
      break;
    case 'small':
      source =
        currentPlan === 'free' ||
        currentPlan === 'awesome' ||
        currentPlan === 'pro' ||
        currentPlan === 'solo_premium_business' ||
        currentPlan === 'premium_business'
          ? 'plans_small_upgrade'
          : 'plans_small_downgrade';
      break;
    default:
      break;
  }
  return source;
};

const getPlanId = (plan) => {
  let planId = null;
  switch (plan) {
    case 'pro':
      planId = PLAN_IDS.PRO_PLAN_ID;
      break;
    case 'solo_premium_business':
      planId = PLAN_IDS.SOLO_PREMIUM_BUSINESS_PLAN_ID;
      break;
    case 'premium_business':
      planId = PLAN_IDS.PREMIUM_BUSINESS_PLAN_ID;
      break;
    case 'small':
      planId = PLAN_IDS.SMALL_PLAN_ID;
      break;
    default:
      break;
  }
  return planId;
};

export { getSource, getPlanId };
