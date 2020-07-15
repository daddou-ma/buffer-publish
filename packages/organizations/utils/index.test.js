import {
  getSelectedOrganization,
  mapSelectedOrganization,
  getOrgsAlfabeticalOrder,
} from './index';

describe('organizations utils', () => {
  describe('getSelectedOrganization', () => {
    it('picks the organization with selected attribute if present', () => {
      const organizations = [
        {
          id: '123123123',
          name: 'Org 1',
        },
        {
          id: '234234234234',
          name: 'Org 2',
          selected: true,
        },
      ];
      const result = getSelectedOrganization(organizations);
      expect(result).toEqual(organizations[1]);
    });

    it('picks the first organization if no selected attribute is present', () => {
      const organizations = [
        {
          id: '123123123',
          name: 'Org 1',
        },
        {
          id: '234234234234',
          name: 'Org 2',
        },
      ];
      const result = getSelectedOrganization(organizations);
      expect(result).toEqual(organizations[0]);
    });
  });

  describe('getOrgsAlfabeticalOrder', () => {
    it('sorts orgs by alphabetical order', () => {
      const organizations = [
        {
          id: '123123123',
          name: 'Org A',
        },
        {
          id: '234234234234',
          name: 'Org B',
        },
        {
          id: '234234234235',
          name: 'An Org',
        },
      ];
      const expectedResult = [
        {
          id: '234234234235',
          name: 'An Org',
        },
        {
          id: '123123123',
          name: 'Org A',
        },
        {
          id: '234234234234',
          name: 'Org B',
        },
      ];
      const result = getOrgsAlfabeticalOrder(organizations);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('mapSelectedOrganization', () => {
    it('sets the selected property to true if organization matches', () => {
      const organizations = [
        {
          id: '123123123',
          name: 'Org 1',
        },
        {
          id: '234234234234',
          name: 'Org 2',
        },
      ];
      const result = mapSelectedOrganization({
        id: organizations[1].id,
        organizations,
      });
      expect(result[0].selected).toEqual(false);
      expect(result[1].selected).toEqual(true);
    });

    it('sets the selected property to false if organization does not match', () => {
      const organizations = [
        {
          id: '123123123',
          name: 'Org 1',
        },
        {
          id: '234234234234',
          name: 'Org 2',
        },
      ];
      const result = mapSelectedOrganization({
        id: '123123123123123',
        organizations,
      });
      expect(result[0].selected).toEqual(false);
      expect(result[1].selected).toEqual(false);
    });
  });
});
