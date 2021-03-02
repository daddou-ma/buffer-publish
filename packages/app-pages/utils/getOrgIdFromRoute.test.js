import getOrgIdFromRoute from './getOrgIdFromRoute';

describe('getOrgIdFromRoutes', () => {
  const profiles = [
    { id: 'profile1', organizationId: 'org1' },
    { id: 'profile2', organizationId: 'org2' },
    { id: 'profile4', organizationId: null },
  ];

  it('returns the org id from org route', () => {
    const currentPath = '/org/org1/';
    const orgId = getOrgIdFromRoute({ currentPath, profiles });
    expect(orgId).toEqual('org1');
  });

  it('returns the org id from profile route', () => {
    const currentPath = '/profile/profile2/tab/queue';
    const orgId = getOrgIdFromRoute({ currentPath, profiles });
    expect(orgId).toEqual('org2');
  });

  it('returns undefined when the profile id does not match any profile', () => {
    const currentPath = '/profile/profile3/tab/queue';
    const orgId = getOrgIdFromRoute({ currentPath, profiles });
    expect(orgId).toBeUndefined();
  });

  it('returns null when the profile is not associated with an orgId', () => {
    const currentPath = '/profile/profile4/';
    const orgId = getOrgIdFromRoute({ currentPath, profiles });
    expect(orgId).toBeNull();
  });
});
