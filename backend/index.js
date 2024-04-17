const express = require("express");
const cors = require("cors");
const { db } = require("./db.js");
const multer = require("multer");
const { storage } = require("./cloudinaryConfig.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const upload = multer({ storage: storage });

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //Quais são os métodos que a conexão pode realizar na API
  app.use(cors());
  next();
});
app.use(express.json());

app.post("/cavalos", upload.single("foto"), async (req, res) => {
  try {
    const horse =
      await db`INSERT INTO cavalos (nome ,idade ,racao ,sexo ,raca ,feno ,medicacao ,aulas,nome_pai,nome_mae,peso,foto) VALUES (${
        req.body.nome
      },  ${req.body.idade},
        ${req.body.racao},
        ${req.body.sexo},
        ${req.body.raca},
        ${req.body.feno},
        ${req.body.medicacao},
        ${req.body.aulas},
        ${req.body.nome_pai},
        ${req.body.nome_mae},
        ${req.body.peso},
        ${req.file?.filename ? req.file?.filename : null})`;

    return res.status(200).json("Cavalo has been crated.");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

app.put("/cavalos/:id", upload.single("foto"), async (req, res) => {
  try {
    const id = req.params.id;

    if (req.file) {
      const updateHorse =
        await db`UPDATE cavalos SET nome=${req.body.nome}, idade=${req.body.idade}, racao=${req.body.racao}, sexo=${req.body.sexo}, raca=${req.body.raca}, feno=${req.body.feno}, medicacao=${req.body.medicacao}, aulas=${req.body.aulas}, nome_pai=${req.body.nome_pai}, nome_mae=${req.body.nome_mae}, peso=${req.body.peso}, foto=${req.file.filename} WHERE id=${id}`;

      const values = [
        req.body.nome,
        req.body.idade,
        req.body.racao,
        req.body.sexo,
        req.body.raca,
        req.body.feno,
        req.body.medicacao,
        req.body.aulas,
        req.body.nome_pai,
        req.body.nome_mae,
        req.body.peso,
        req.file.filename,
        id,
      ];

      return res.status(200).json("Cavalos has been edited.");
    } else {
      const updateHorse =
        await db`UPDATE cavalos SET nome=${req.body.nome}, idade=${req.body.idade}, racao=${req.body.racao}, sexo=${req.body.sexo}, raca=${req.body.raca}, feno=${req.body.feno}, medicacao=${req.body.medicacao}, aulas=${req.body.aulas}, nome_pai=${req.body.nome_pai}, nome_mae=${req.body.nome_mae}, peso=${req.body.peso} WHERE id=${id}`;

      const values = [
        req.body.nome,
        req.body.idade,
        req.body.racao,
        req.body.sexo,
        req.body.raca,
        req.body.feno,
        req.body.medicacao,
        req.body.aulas,
        req.body.nome_pai,
        req.body.nome_mae,
        req.body.peso,
        id,
      ];

      return res.status(200).json("Cavalos has been edited.");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cavalos", async (req, res) => {
  try {
    const horses = await db`SELECT * FROM cavalos`;
    return res.status(200).json(horses);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

app.get("/cavalos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const horseId = await db`SELECT * FROM cavalos WHERE id = ${id}`;
    return res.status(200).json(horseId);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

app.delete("/cavalos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteHorse = await db`DELETE FROM cavalos WHERE id = ${id}`;
    return res.status(200).json({
      message: "Cavalo excluido com sucesso",
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

app.listen(8800, () => {
  console.log("connected to backend!!");
});

module.exports = app;
