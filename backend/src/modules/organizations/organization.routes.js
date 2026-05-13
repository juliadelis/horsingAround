const express = require("express");
const organizationController = require("./organization.controller");

const router = express.Router();

router.get("/", organizationController.getOrganizations);
router.post("/", organizationController.createOrganization);
router.get("/:id", organizationController.getOrganizationById);

module.exports = router;
