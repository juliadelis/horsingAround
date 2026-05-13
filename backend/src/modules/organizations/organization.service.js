const { db } = require("../../config/db");

async function getOrganizations(userId) {
  return await db`
    SELECT o.*,
           COUNT(h.id) as horse_count
    FROM organizations o
    INNER JOIN organization_members om
      ON om.organization_id = o.id
    LEFT JOIN horses h
      ON h.organization_id = o.id
    WHERE om.user_id = ${userId}
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `;
}

async function createOrganization(userId, data) {
  const organization = await db`
    INSERT INTO organizations (
      name,
      slug,
      owner_id
    )
    VALUES (
      ${data.name},
      ${data.slug},
      ${userId}
    )
    RETURNING *
  `;

  await db`
    INSERT INTO organization_members (
      organization_id,
      user_id,
      name,
      email,
      role,
      created_by
    )
    VALUES (
      ${organization[0].id},
      ${userId},
      ${data.name},
      ${data.email},
      'admin',
      ${userId}
    )
  `;

  return organization[0];
}

async function getOrganizationById(id) {
  const organization = await db`
    SELECT *
    FROM organizations
    WHERE id = ${id}
  `;

  return organization[0];
}

module.exports = {
  getOrganizations,
  createOrganization,
  getOrganizationById,
};
