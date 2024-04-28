import { Router } from "express";
import getBlogs from "./get.js";
import postBlog from "./post.js";
const router = Router();

router.get("/", getBlogs);
router.post("/", postBlog);

export default router;
