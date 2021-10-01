// In this We will add all the route which is related to Post.
import express from "express";
import requireAuth from "../middleware/auth.js";
const router = express.Router();

import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controller/post.js";

router.get("/", getPost);
router.post("/", requireAuth, createPost);
router.patch("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);
router.patch("/:id/LikePost", requireAuth, likePost);

export default router;
