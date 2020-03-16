import React from 'react';
import ViewCampaign, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';

describe('ViewCampaign', () => {
  describe('Component', () => {
    it('exports reducer', () => {
      expect(reducer).toBeDefined();
    });

    it('exports actions', () => {
      expect(actions).toBeDefined();
    });

    it('exports actionTypes', () => {
      expect(actionTypes).toBeDefined();
    });

    it('exports middleware', () => {
      expect(middleware).toBeDefined();
    });
  });
});
