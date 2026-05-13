const { db } = require("../../config/db");

async function getMembers(organizationId) {
  return await db`
    SELECT *
    FROM organization_members
    WHERE organization_id = ${organizationId}
    ORDER BY created_at DESC
  `;
}

async function createMember(organizationId, data) {
  const member = await db`
    INSERT INTO organization_members (
      organization_id,
      name,
      email,
      role
    )
    VALUES (
      ${organizationId},
      ${data.name},
      ${data.email},
      ${data.role}
    )
    RETURNING *
  `;

  return member[0];
}

async function updateMember(organizationId, memberId, data) {
  const member = await db`
    UPDATE organization_members
    SET
      name = ${data.name},
      email = ${data.email},
      role = ${data.role}
    WHERE id = ${memberId}
    AND organization_id = ${organizationId}
    RETURNING *
  `;

  return member[0];
}

async function deleteMember(organizationId, memberId) {
  return await db`
    DELETE FROM organization_members
    WHERE id = ${memberId}
    AND organization_id = ${organizationId}
  `;
}

module.exports = {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
};
