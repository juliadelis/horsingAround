const express = require("express");
const multer = require("multer");
const { storage } = require("../../config/cloudinaryConfig");
const horseController = require("./horse.controller");

const router = express.Router({ mergeParams: true });

const upload = multer({
  storage,
  limits: { fieldSize: 50 * 1024 * 1024 },
});

router.get("/", horseController.getAllHorses);
router.get("/:id", horseController.getHorseById);
router.post("/", upload.single("foto"), horseController.createHorse);
router.put("/:id", upload.single("foto"), horseController.updateHorse);
router.delete("/:id", horseController.deleteHorse);

module.exports = router;
