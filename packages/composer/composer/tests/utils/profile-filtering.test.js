import {
  getProfilesByService,
  getProfilesWhereUserHasRole,
  isManagerOrContributorForAnyProfile,
} from '../../utils/profile-filtering';

const mockProfiles = [
  { service: { name: 'instagram' }, isManager: true },
  { service: { name: 'instagram' } },
  { service: { name: 'twitter' } },
  { service: { name: 'facebook' }, isManager: true },
];

describe('Profile Filtering', () => {
  it('returns profiles by service', () => {
    expect(
      getProfilesByService({ profiles: mockProfiles, service: 'instagram' })
        .length
    ).toBe(2);
  });
  it('returns profiles where user is manager', () => {
    expect(
      getProfilesWhereUserHasRole({ profiles: mockProfiles, role: 'manager' })
        .length
    ).toBe(2);
  });
  it('returns instagram profiles where user is manager', () => {
    expect(
      getProfilesWhereUserHasRole({
        profiles: mockProfiles,
        role: 'manager',
        service: 'instagram',
      }).length
    ).toBe(1);
  });
  it('returns true when user is manager or contributor of at least one profile', () => {
    expect(
      isManagerOrContributorForAnyProfile({ profiles: mockProfiles })
    ).toBe(true);
  });
  it('returns true when user is manager or contributor of at least one instagram profile', () => {
    expect(
      isManagerOrContributorForAnyProfile({
        profiles: mockProfiles,
        service: 'instagram',
      })
    ).toBe(true);
  });
  it('returns false when user is not manager or contributor of any twitter profiles', () => {
    expect(
      isManagerOrContributorForAnyProfile({
        profiles: mockProfiles,
        service: 'twitter',
      })
    ).toBe(false);
  });
});
