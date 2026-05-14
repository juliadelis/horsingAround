const { db } = require("../../config/db");

async function getOrganizationMember(organizationId, user) {
  const members = await db`
    SELECT *
    FROM organization_members
    WHERE organization_id = ${organizationId}
    AND (
      user_id = ${user.id}
      OR lower(email) = lower(${user.email})
    )
    LIMIT 1
  `;

  const member = members[0];

  if (!member) {
    return null;
  }

  if (!member.user_id) {
    const updated = await db`
      UPDATE organization_members
      SET user_id = ${user.id}
      WHERE id = ${member.id}
      RETURNING *
    `;

    return updated[0];
  }

  return member;
}

async function requireOrganizationRole(req, res, allowedRoles) {
  const { organizationId, id } = req.params;
  const targetOrganizationId = organizationId || id;
  const member = await getOrganizationMember(targetOrganizationId, req.user);

  if (!member) {
    res.status(403).json({ error: "Você não tem acesso a esta organização." });
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(member.role)) {
    res.status(403).json({ error: "Você não tem permissão para esta ação." });
    return null;
  }

  return member;
}

module.exports = {
  getOrganizationMember,
  requireOrganizationRole,
};
