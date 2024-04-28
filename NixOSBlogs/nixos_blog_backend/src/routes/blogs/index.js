const express = require("express");
const router = express.Router();
const getBlogs = require("./get.js");

router.get("/", getBlogs);

module.exports = router;
