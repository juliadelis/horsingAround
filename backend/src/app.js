const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const horseRoutes = require("./modules/horses/horse.routes");
const organizationRoutes = require("./modules/organizations/organization.routes");
const memberRoutes = require("./modules/members/member.routes");

const { authMiddleware } = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);

app.use(authMiddleware);

app.use("/organizations", organizationRoutes);
app.use("/organizations/:organizationId/cavalos", horseRoutes);
app.use("/organizations/:organizationId/members", memberRoutes);

module.exports = app;