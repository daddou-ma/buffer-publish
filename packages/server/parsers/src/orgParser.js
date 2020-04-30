module.exports = orgData => ({
  id: orgData.id,
  plan: orgData.plan,
  planCode: orgData.plan_code,
  name: orgData.name,
  ownerId: orgData.owner_id,
  locked: orgData.locked,
});
