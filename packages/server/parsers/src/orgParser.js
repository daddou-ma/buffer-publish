module.exports = orgData => ({
  id: orgData.id,
  globalOrgId: orgData.global_organization_id,
  locked: orgData.locked,
  name: orgData.name,
  ownerId: orgData.owner_id,
  ownerEmail: orgData.owner_email,
  plan: orgData.plan,
  planCode: orgData.plan_code,
  isAdmin: orgData.is_admin,
  selected: orgData.selected,
});
