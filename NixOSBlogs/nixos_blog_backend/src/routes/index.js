const express = require("express");
const router = express.Router();
const login = require("./login.js");

router.post("/login", login);

module.exports = router;
