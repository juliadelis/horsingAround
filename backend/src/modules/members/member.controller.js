const memberService = require("./member.service");
const {
  requireOrganizationRole,
} = require("../permissions/organizationPermissions");

async function getMembers(req, res) {
  try {
    const { organizationId } = req.params;
    const member = await requireOrganizationRole(req, res);
    if (!member) return;

    const members = await memberService.getMembers(organizationId);

    return res.status(200).json(members);
  } catch (error) {
    console.error("Erro ao buscar membros:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function createMember(req, res) {
  try {
    const { organizationId } = req.params;
    const currentMember = await requireOrganizationRole(req, res, ["admin"]);
    if (!currentMember) return;

    if (!req.body.email) {
      return res.status(400).json({ error: "E-mail do membro é obrigatório." });
    }

    const result = await memberService.createMember(
      organizationId,
      req.user.id,
      req.body,
    );

    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar membro:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function updateMember(req, res) {
  try {
    const { organizationId, memberId } = req.params;
    const currentMember = await requireOrganizationRole(req, res, ["admin"]);
    if (!currentMember) return;

    const member = await memberService.updateMember(
      organizationId,
      memberId,
      req.body,
    );

    return res.status(200).json(member);
  } catch (error) {
    console.error("Erro ao editar membro:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function deleteMember(req, res) {
  try {
    const { organizationId, memberId } = req.params;
    const currentMember = await requireOrganizationRole(req, res, ["admin"]);
    if (!currentMember) return;

    await memberService.deleteMember(organizationId, memberId);

    return res.status(200).json({
      message: "Membro removido com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao remover membro:", error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
};
