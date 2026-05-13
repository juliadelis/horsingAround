const { v4: uuidv4 } = require("uuid");
const { db } = require("../../config/db");

async function getAllHorses(organizationId) {
  return await db`
    SELECT *
    FROM horses
    WHERE organization_id = ${organizationId}
    ORDER BY created_at DESC
  `;
}

async function getHorseById(organizationId, id) {
  const horse = await db`
    SELECT *
    FROM horses
    WHERE id = ${id}
    AND organization_id = ${organizationId}
  `;

  return horse[0];
}

async function createHorse(organizationId, data, fotoUrl) {
  const id = uuidv4();

  const medicationTypeValue =
    String(data.medication).toLowerCase() === "false"
      ? null
      : data.medicationtype || null;

  const horse = await db`
    INSERT INTO horses (
      id,
      organization_id,
      name,
      owner,
      age,
      foodamount,
      gender,
      breed,
      hay,
      medication,
      medicationtype,
      lessons,
      fathersname,
      mothersname,
      weight,
      pictureurl
    )
    VALUES (
      ${id},
      ${organizationId},
      ${data.name},
      ${data.owner},
      ${data.age},
      ${data.foodamount},
      ${data.gender},
      ${data.breed},
      ${data.hay},
      ${data.medication},
      ${medicationTypeValue},
      ${data.lessons},
      ${data.fathersname},
      ${data.mothersname},
      ${data.weight},
      ${fotoUrl}
    )
    RETURNING *
  `;

  return horse[0];
}

async function updateHorse(organizationId, id, data, fotoUrl) {
  const medicationTypeValue =
    String(data.medication).toLowerCase() === "false"
      ? null
      : data.medicationtype || null;

  let horse;

  if (fotoUrl) {
    horse = await db`
      UPDATE horses
      SET
        name = ${data.name},
        owner = ${data.owner},
        age = ${data.age},
        foodamount = ${data.foodamount},
        gender = ${data.gender},
        breed = ${data.breed},
        hay = ${data.hay},
        medication = ${data.medication},
        medicationtype = ${medicationTypeValue},
        lessons = ${data.lessons},
        fathersname = ${data.fathersname},
        mothersname = ${data.mothersname},
        weight = ${data.weight},
        pictureurl = ${fotoUrl},
        updated_at = now()
      WHERE id = ${id}
      AND organization_id = ${organizationId}
      RETURNING *
    `;
  } else {
    horse = await db`
      UPDATE horses
      SET
        name = ${data.name},
        owner = ${data.owner},
        age = ${data.age},
        foodamount = ${data.foodamount},
        gender = ${data.gender},
        breed = ${data.breed},
        hay = ${data.hay},
        medication = ${data.medication},
        medicationtype = ${medicationTypeValue},
        lessons = ${data.lessons},
        fathersname = ${data.fathersname},
        mothersname = ${data.mothersname},
        weight = ${data.weight},
        updated_at = now()
      WHERE id = ${id}
      AND organization_id = ${organizationId}
      RETURNING *
    `;
  }

  return horse[0];
}

async function deleteHorse(organizationId, id) {
  return await db`
    DELETE FROM horses
    WHERE id = ${id}
    AND organization_id = ${organizationId}
  `;
}

module.exports = {
  getAllHorses,
  getHorseById,
  createHorse,
  updateHorse,
  deleteHorse,
};
