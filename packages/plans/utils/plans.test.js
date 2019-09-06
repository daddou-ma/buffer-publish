import { PLAN_IDS } from '@bufferapp/publish-constants';
import { getSource, getPlanId } from './plans';

describe('Plans Utils', () => {
  describe('returns correct source', () => {
    it('returns pro upgrade source', () => {
      const source = getSource({ newPlan: 'pro', currentPlan: 'free' });
      expect(source).toEqual('plans_pro_upgrade');
    });
    it('returns pro downgrade source', () => {
      const source = getSource({ newPlan: 'pro', currentPlan: 'small' });
      expect(source).toEqual('plans_pro_downgrade');
    });
    it('returns premium upgrade source', () => {
      const source = getSource({ newPlan: 'premium_business', currentPlan: 'pro' });
      expect(source).toEqual('plans_premium_upgrade');
    });
  });
  describe('returns correct plan id', () => {
    it('returns pro plan id', () => {
      const planId = getPlanId('pro');
      expect(planId).toEqual(PLAN_IDS.PRO_PLAN_ID);
    });
    it('returns premium plan id', () => {
      const planId = getPlanId('premium_business');
      expect(planId).toEqual(PLAN_IDS.PREMIUM_BUSINESS_PLAN_ID);
    });
    it('returns small plan id', () => {
      const planId = getPlanId('small');
      expect(planId).toEqual(PLAN_IDS.SMALL_PLAN_ID);
    });
    it('returns null if plan id isnt valid', () => {
      const planId = getPlanId('hello');
      expect(planId).toEqual(null);
    });
  });
});
