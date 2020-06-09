import { filterProfilesByOrg, shouldGoToProfile } from './index';

describe('profile-sidebar utils', () => {
  describe('filterProfilesByOrg', () => {
    const organization1Id = '876956785678';
    const profiles = [
      {
        id: '123123123',
        name: 'Profile 1',
        organizationId: '524343123',
      },
      {
        id: '6786785678',
        name: 'Profile 2',
        organizationId: organization1Id,
      },
    ];

    const organization = {
      id: organization1Id,
    };

    it('returns all profiles if feature not enabled', () => {
      const filteredProfiles = filterProfilesByOrg(
        profiles,
        organization,
        false
      );
      expect(filteredProfiles).toEqual(profiles);
    });

    it('returns only the profiles in the organization if feature is enabled', () => {
      const filteredProfiles = filterProfilesByOrg(
        profiles,
        organization,
        true
      );
      expect(filteredProfiles).toEqual([profiles[1]]);
    });
  });

  describe('shouldGoToProfile', () => {
    it('returns false if profile is null', () => {
      expect(shouldGoToProfile(null, {})).toBeFalsy();
    });

    it('returns false if profile is false', () => {
      expect(shouldGoToProfile(false, {})).toBeFalsy();
    });

    it('returns false if profile is the same that prevProps.profileId', () => {
      const profile1 = {
        id: '1234',
      };
      const prevProps = {
        profileId: '1234',
      };
      expect(shouldGoToProfile(profile1, prevProps)).toBeFalsy();
    });

    it('returns true if profile is different than prevProps.profileId', () => {
      const profile1 = {
        id: '1234',
      };
      const prevProps = {
        profileId: '5678',
      };
      expect(shouldGoToProfile(profile1, prevProps)).toEqual(true);
    });

    it("returns true if we don't have a profile in prevProps", () => {
      const profile1 = {
        id: '1234',
      };
      const prevProps = {
        profileId: null,
      };
      expect(shouldGoToProfile(profile1, prevProps)).toEqual(true);
    });
  });
});
