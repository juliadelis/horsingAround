const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve("images"));
  },
  filename: (req, file, callback) => {
    const id = uuidv4();

    callback(null, `${id}_${file.originalname}`);
  },
});

module.exports = { storage };
