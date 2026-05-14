const organizationService = require("./organization.service");
const {
  getOrganizationMember,
} = require("../permissions/organizationPermissions");

async function getOrganizations(req, res) {
  try {
    const organizations = await organizationService.getOrganizations(
      req.user.id,
      req.user.email,
    );

    return res.status(200).json(organizations);
  } catch (error) {
    console.error("Erro ao buscar organizações:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function createOrganization(req, res) {
  try {
    const organization = await organizationService.createOrganization(
      req.user.id,
      {
        ...req.body,
        email: req.user.email,
      },
    );

    return res.status(201).json(organization);
  } catch (error) {
    console.error("Erro ao criar organização:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function getOrganizationById(req, res) {
  try {
    const { id } = req.params;

    const organization = await organizationService.getOrganizationById(id);

    return res.status(200).json(organization);
  } catch (error) {
    console.error("Erro ao buscar organização:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
}

async function getCurrentMemberRole(req, res) {
  try {
    const { id } = req.params;
    const member = await getOrganizationMember(id, req.user);

    if (!member) {
      return res.status(403).json({
        error: "Você não tem acesso a esta organização.",
      });
    }

    return res.status(200).json({
      role: member.role,
      member,
    });
  } catch (error) {
    console.error("Erro ao buscar permissão:", error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getOrganizations,
  getOrganizationById,
  getCurrentMemberRole,
  createOrganization,
};
