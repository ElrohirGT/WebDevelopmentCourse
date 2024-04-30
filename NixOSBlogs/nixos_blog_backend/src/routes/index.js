import { Router } from "express";
import blogs from "./blogs/index.js";
import login from "./login.js";
import register from "./register.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.use("/blogs", blogs);

export default router;
