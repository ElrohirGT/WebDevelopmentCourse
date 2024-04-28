const express = require("express");
const router = express.Router();
const register = require("./register.js");
const login = require("./login.js");
const blogs = require("./blogs/index.js");

router.post("/register", register);
router.post("/login", login);
router.use("/blogs", blogs);

module.exports = router;
