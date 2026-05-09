const express = require("express");
const cors = require("cors");
const { db } = require("./db.js");
const multer = require("multer");
const { storage } = require("./cloudinaryConfig.js");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const upload = multer({
  storage: storage,
  limits: { fieldSize: 50 * 1024 * 1024 }, // 50MB field size limit
});

// app.use((req, res, next) => {
//   //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   //Quais são os métodos que a conexão pode realizar na API
//   app.use(cors());
//   next();
// });

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.get("/cavalos", async (req, res) => {
  try {
    const horses = await db`SELECT * FROM horses`;
    return res.status(200).json(horses);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

app.post("/cavalos", upload.single("foto"), async (req, res) => {
  try {
    const id = uuidv4();
    const fotoUrl = req.file?.secure_url || req.file?.path || null;
    const medicationTypeValue =
      String(req.body.medication).toLowerCase() === "false"
        ? null
        : req.body.medicationtype || null;

    await db`
      INSERT INTO horses (
        id,
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
        ${req.body.name},
        ${req.body.owner},
        ${req.body.age},
        ${req.body.foodamount},
        ${req.body.gender},
        ${req.body.breed},
        ${req.body.hay},
        ${req.body.medication},
        ${medicationTypeValue},
        ${req.body.lessons},
        ${req.body.fathersname},
        ${req.body.mothersname},
        ${req.body.weight},
        ${fotoUrl}
      )
    `;

    return res
      .status(200)
      .json({ message: "Cavalo has been created.", fotoUrl, id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/cavalos/:id", upload.single("foto"), async (req, res) => {
  try {
    const id = req.params.id;

    const {
      name,
      owner,
      age,
      gender,
      breed,
      hay,
      medication,
      medicationtype,
      lessons,
      foodamount,
      fathersname,
      mothersname,
      weight,
    } = req.body;

    console.log(req.body);

    const fotoUrl = req.file?.secure_url || req.file?.path || null;

    const medicationTypeValue =
      String(medication).toLowerCase() === "false"
        ? null
        : medicationtype || null;

    if (req.file) {
      await db`
        UPDATE horses
        SET
          name=${name},
          owner=${owner},
          age=${age},
          foodamount=${foodamount},
          gender=${gender},
          breed=${breed},
          hay=${Boolean(hay)},
          medication=${Boolean(medication)},
          medicationtype=${medicationTypeValue},
          lessons=${lessons},
          fathersname=${fathersname},
          mothersname=${mothersname},
          weight=${weight},
          pictureurl=${fotoUrl}
        WHERE id=${id}
      `;
    } else {
      await db`
        UPDATE horses
        SET
          name=${name},
          owner=${owner},
          age=${age},
          foodamount=${foodamount},
          gender=${gender},
          breed=${breed},
          hay=${Boolean(hay)},
          medication=${Boolean(medication)},
          medicationtype=${medicationTypeValue},
          lessons=${lessons},
          fathersname=${fathersname},
          mothersname=${mothersname},
          weight=${weight}
        WHERE id=${id}
      `;
    }

    return res
      .status(200)
      .json({ message: "Cavalos has been edited.", fotoUrl });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cavalos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const horseId = await db`SELECT * FROM horses WHERE id = ${id}`;
    return res.status(200).json(horseId);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

app.delete("/cavalos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteHorse = await db`DELETE FROM horses WHERE id = ${id}`;
    return res.status(200).json({
      message: "Cavalo excluido com sucesso",
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

// app.listen(8800, () => {
//   console.log("connected to backend!!");
// });

module.exports = app;
