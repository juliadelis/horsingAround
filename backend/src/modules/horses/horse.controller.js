const horseService = require("./horse.service");
const {
  requireOrganizationRole,
} = require("../permissions/organizationPermissions");

const HORSE_CREATE_ROLES = ["admin", "caretaker", "trainer"];
const HORSE_UPDATE_ROLES = ["admin", "caretaker", "trainer", "veterinarian"];

async function getAllHorses(req, res) {
  try {
    const { organizationId } = req.params;
    const member = await requireOrganizationRole(req, res);
    if (!member) return;

    const horses = await horseService.getAllHorses(organizationId);

    return res.status(200).json(horses);
  } catch (error) {
    console.error("Erro ao buscar cavalos:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function getHorseById(req, res) {
  try {
    const { organizationId, id } = req.params;
    const member = await requireOrganizationRole(req, res);
    if (!member) return;

    const horse = await horseService.getHorseById(organizationId, id);

    return res.status(200).json(horse);
  } catch (error) {
    console.error("Erro ao buscar cavalo:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function createHorse(req, res) {
  try {
    const { organizationId } = req.params;
    const member = await requireOrganizationRole(req, res, HORSE_CREATE_ROLES);
    if (!member) return;

    const fotoUrl = req.file?.secure_url || req.file?.path || null;

    const horse = await horseService.createHorse(
      organizationId,
      req.body,
      fotoUrl,
    );

    return res.status(201).json(horse);
  } catch (error) {
    console.error("Erro ao criar cavalo:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function updateHorse(req, res) {
  try {
    const { organizationId, id } = req.params;
    const member = await requireOrganizationRole(req, res, HORSE_UPDATE_ROLES);
    if (!member) return;

    const fotoUrl = req.file?.secure_url || req.file?.path || null;

    const horse = await horseService.updateHorse(
      organizationId,
      id,
      req.body,
      fotoUrl,
      member.role,
    );

    return res.status(200).json(horse);
  } catch (error) {
    console.error("Erro ao editar cavalo:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function deleteHorse(req, res) {
  try {
    const { organizationId, id } = req.params;
    const member = await requireOrganizationRole(req, res, ["admin"]);
    if (!member) return;

    await horseService.deleteHorse(organizationId, id);

    return res.status(200).json({
      message: "Cavalo excluído com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao deletar cavalo:", error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllHorses,
  getHorseById,
  createHorse,
  updateHorse,
  deleteHorse,
};
