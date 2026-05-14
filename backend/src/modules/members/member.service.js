const { db } = require("../../config/db");
const { supabase, supabaseAdmin } = require("../../config/supabase");

const normalizeEmail = (email) => email.trim().toLowerCase();
const normalizePhone = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits || null;
};

const getInviteRedirectUrl = (email, isRegistered) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const url = new URL("/login", frontendUrl);
  url.searchParams.set("email", email);
  url.searchParams.set("mode", isRegistered ? "login" : "register");
  return url.toString();
};

async function findUserByEmail(email) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      throw new Error(error.message);
    }

    const user = data.users.find(
      (authUser) => authUser.email?.toLowerCase() === email,
    );

    if (user || data.users.length < perPage) {
      return user ?? null;
    }

    page += 1;
  }
}

async function sendMemberInvite(email, isRegistered) {
  const emailRedirectTo = getInviteRedirectUrl(email, isRegistered);

  if (isRegistered) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return "login_email_sent";
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return "not_sent_missing_service_role";
  }

  const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    redirectTo: emailRedirectTo,
  });

  if (error) {
    throw new Error(error.message);
  }

  return "invite_sent";
}

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
          const { data: userData, error } =
            await supabaseAdmin.auth.admin.getUserById(member.user_id);
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
  const email = normalizeEmail(data.email);
  const phone = normalizePhone(data.phone);

  const existingMember = await db`
    SELECT *
    FROM organization_members
    WHERE organization_id = ${organizationId}
    AND lower(email) = ${email}
    LIMIT 1
  `;

  if (existingMember.length > 0) {
    return {
      member: existingMember[0],
      invitationStatus: "already_member",
    };
  }

  const existingUser = await findUserByEmail(email);
  const memberUserId = existingUser?.id ?? null;

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
      ${email},
      ${phone},
      ${data.role},
      ${creatorId}
    )
    RETURNING *
  `;

  const invitationStatus = await sendMemberInvite(email, Boolean(existingUser));

  return {
    member: member[0],
    invitationStatus,
  };
}

async function updateMember(organizationId, memberId, data) {
  const email = normalizeEmail(data.email);
  const phone = normalizePhone(data.phone);
  const existingUser = await findUserByEmail(email);

  const member = await db`
    UPDATE organization_members
    SET
      name = ${data.name},
      email = ${email},
      user_id = COALESCE(user_id, ${existingUser?.id ?? null}),
      phone = ${phone},
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
