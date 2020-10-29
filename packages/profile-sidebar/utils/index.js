function isADifferentProfile(profile, prevProps) {
  return profile.id !== prevProps.profileId;
}

export const shouldGoToProfile = (profile, prevProps) => {
  return (
    profile &&
    (isADifferentProfile(profile, prevProps) || prevProps.profileId === null)
  );
};

export const filterProfilesByOrg = (profiles, organization) => {
  if (!organization) {
    return profiles;
  }
  return profiles?.filter(
    profile => profile.organizationId === organization.id
  );
};
