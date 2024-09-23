const express = require("express");
const authRoute = express.Router();
const { login, verify } = require("../controllers/auth.controller");
const verifyUser = require("../middleware/authMiddleware");

authRoute.post("/login", login);
authRoute.get("/verify", verifyUser, verify);

module.exports = authRoute;
