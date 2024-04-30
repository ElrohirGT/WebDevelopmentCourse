import { Router } from "express";
import getBlogs from "./get.js";
import postBlog from "./post.js";
import putBlogs from "./update.js";
import deleteBlogs from "./delete.js";
// TODO: Add delete endpoint

const router = Router();

router.get("/", getBlogs);
router.post("/", postBlog);
router.put("/", putBlogs);
router.delete("/", deleteBlogs);

export default router;
