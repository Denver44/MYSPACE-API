// In this We will add all the route which is related to Post.
import express from "express";
const router = express.Router();

import { signIn, signUp, testUser } from "../controller/user.js";

router.get("/test", testUser);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;
