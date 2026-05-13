const express = require("express");
const memberController = require("./member.controller");

const router = express.Router({ mergeParams: true });

router.get("/", memberController.getMembers);
router.post("/", memberController.createMember);
router.patch("/:memberId", memberController.updateMember);
router.delete("/:memberId", memberController.deleteMember);

module.exports = router;
