const express = require("express");
const authRoute = express.Router();
const { login } = require("../controllers/auth.controller");

authRoute.post("/login", login);

module.exports = authRoute;
