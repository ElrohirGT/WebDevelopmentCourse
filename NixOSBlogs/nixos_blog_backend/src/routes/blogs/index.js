const express = require("express");
const router = express.Router();
const getBlogs = require("./get.js");
const postBlog = require("./post.js");

router.get("/", getBlogs);
router.post("/", postBlog);

module.exports = router;
