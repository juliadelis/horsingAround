const { db } = require("../../config/db");
const { supabase } = require("../../config/supabase");

async function getMembers(organizationId) {
  const members = await db`
    SELECT *
    FROM organization_members
    WHERE organization_id = ${organizationId}
    ORDER BY created_at DESC
  `;

  // Buscar dados adicionais do Supabase para cada membro
  const membersWithUserData = await Promise.all(
    members.map(async (member) => {
      if (member.user_id) {
        try {
          const { data: userData, error } = await supabase.auth.admin.getUserById(member.user_id);
          if (!error && userData.user) {
            return {
              ...member,
              phone: userData.user.raw_user_meta_data?.phone || null,
              name: userData.user.raw_user_meta_data?.name || member.name,
            };
          }
        } catch (err) {
          console.log(`Erro ao buscar dados do usuário ${member.user_id}:`, err);
        }
      }
      return member;
    })
  );

  return membersWithUserData;
}

async function createMember(organizationId, creatorId, data) {
  let memberUserId = null;

  if (data.password) {
    const { data: signupData, error } = await supabase.auth.signUp(
      {
        email: data.email,
        password: data.password,
      },
      {
        data: {
          name: data.name || null,
          phone: data.phone || null,
        },
      },
    );

    if (error) {
      throw new Error(error.message);
    }

    memberUserId = signupData.user?.id ?? null;
  }

  const member = await db`
    INSERT INTO organization_members (
      organization_id,
      user_id,
      name,
      email,
      phone,
      role,
      created_by
    )
    VALUES (
      ${organizationId},
      ${memberUserId},
      ${data.name},
      ${data.email},
      ${data.phone || null},
      ${data.role},
      ${creatorId}
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
      phone = ${data.phone || null},
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
