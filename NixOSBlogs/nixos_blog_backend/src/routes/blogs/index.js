import { Router } from "express";
import getBlogs from "./get.js";
import postBlog from "./post.js";
import putBlogs from "./update.js";

const router = Router();

router.get("/", getBlogs);
router.post("/", postBlog);
router.put("/", putBlogs);

export default router;
